using System;
using System.Threading.Tasks;
using Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Models;
using UnitOfWork;
using System.Linq;
using System.Collections.Generic;
using System.Security.Claims;
using System.Net.Mail;
using Models.Filters;
using System.Linq.Expressions;
using LinqKit;
using System.ComponentModel.Design;

namespace surfplace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private IConfiguration configuration;
        private readonly RoleManager<IdentityRole> roleManager;
        private ICompanyRepository _companyRepository;
        private IAspNetUsersCompanyRepository _aspNetUsersCompanyRepository;


        public AccountController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
                        RoleManager<IdentityRole> roleManager,
                        ICompanyRepository companyRepository,
                        IAspNetUsersCompanyRepository aspNetUsersCompanyRepository,
            IConfiguration Configuration)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = Configuration;
            this.roleManager = roleManager;
            this._companyRepository = companyRepository;
            this._aspNetUsersCompanyRepository = aspNetUsersCompanyRepository;
        }

        [HttpPost()]
        [AllowAnonymous]
        [Route("loginClient")]
        public async Task<IActionResult> LoginClient(LoginUser loginUser)
        {
            try
            {
                var user = await userManager.FindByEmailAsync(loginUser.Email);
                if (user == null)
                {
                    return BadRequest("Acesso negado! Usuário não existe!");
                }
                var result = await signInManager.PasswordSignInAsync(user.UserName, loginUser.Secret, false, false);
                if (!result.Succeeded)
                {
                    return BadRequest("Acesso negado! Login inválido!");
                }
                var claimsPrincipal = await signInManager.CreateUserPrincipalAsync(user);
                var claims = claimsPrincipal.Claims.ToList();
                var permission = claims.Where(c => c.Type.Contains("role")).Select(c => c.Value).FirstOrDefault();
                if (!permission.Equals("Gerente") && !permission.Equals("Colaborador"))
                {
                    return BadRequest("Acesso negado! Usuário não tem permissão!");
                }
                var applicationUser = new ApplicationUser();
                applicationUser.Id = user.Id;
                var applicationUserDTO = new ApplicationUserDTO();
                var empresa = _aspNetUsersCompanyRepository.GetByUser(user.Id);
                if (empresa == null)
                {
                    return BadRequest("Acesso negado! Usuário sem empresa!");
                }
                applicationUserDTO.Token = TokenService.GenerateToken(applicationUser, configuration, permission, empresa.CompanyId);
                applicationUserDTO.Email = user.Email;
                applicationUserDTO.UserName = user.UserName;
                applicationUserDTO.Role = permission;
                return new JsonResult(applicationUserDTO);
            }
            catch (Exception ex)
            {
                return BadRequest("Falha no login! " + ex.Message);
            }

        }

        [HttpPost()]
        [Route("filter")]
        [Authorize()]
        public IActionResult GetByFilter(FilterDefault filter)
        {
            try
            {
                ClaimsPrincipal currentUser = this.User;
                var id = currentUser.Claims.FirstOrDefault(z => z.Type.Contains("primarysid")).Value;
                var companyId = Convert.ToInt32(currentUser.Claims.FirstOrDefault(z => z.Type.Contains("sid")).Value);
                if ((id == null) || (companyId == 0))
                {
                    return BadRequest("Identificação do usuário não encontrada.");
                }
                Expression<Func<AspNetUsersCompany, bool>> p1;
                var predicate = PredicateBuilder.New<AspNetUsersCompany>();
                p1 = p => p.CompanyId == companyId;
                predicate = predicate.And(p1);
                return new JsonResult(_aspNetUsersCompanyRepository.Where(predicate).ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(string.Concat("Falha no carregamento dos usuários: ", ex.Message));
            }
        }

        [HttpPost()]
        [Route("filterMaster")]
        [Authorize()]
        public IActionResult GetByFilterMaster(FilterDefault filter)
        {
            try
            {
                Claim claim = new Claim("http://schemas.microsoft.com/ws/2008/06/identity/claims/role", "Client");
                var users = userManager.GetUsersForClaimAsync(claim).Result.ToList();
                return new JsonResult(users);
            }
            catch (Exception ex)
            {
                return BadRequest(string.Concat("Falha no carregamento dos usuários: ", ex.Message));
            }
        }

        [HttpPost()]
        [AllowAnonymous]
        [Route("registerMaster")]
        public async Task<IActionResult> RegisterMaster(LoginUser loginUser)
        {
            try
            {
                var user = new ApplicationUser
                {
                    UserName = loginUser.Email,
                    Email = loginUser.Email
                };
                var result = await userManager.CreateAsync(user, loginUser.Secret);
                if (result.Succeeded)
                {
                    List<Claim> claims = new List<Claim>();
                    claims.Add(new Claim(ClaimTypes.Role, "Master"));
                    await userManager.AddClaimsAsync(user, claims);
                }
                else
                {
                    return BadRequest(result.Errors.FirstOrDefault().Description);
                }
                return new JsonResult(user);
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }

        }

        [HttpPost()]
        [Route("registerCollaborator")]
        [Authorize()]
        public async Task<IActionResult> RegisterCollaborator(LoginUser loginUser)
        {
            try
            {
                ClaimsPrincipal currentUser = this.User;
                var id = currentUser.Claims.FirstOrDefault(z => z.Type.Contains("primarysid")).Value;
                var companyId = Convert.ToInt32(currentUser.Claims.FirstOrDefault(z => z.Type.Contains("sid")).Value);
                if ((id == null) || (companyId == 0))
                {
                    return BadRequest("Identificação do usuário não encontrada.");
                }

                var applicationUser = this.userManager.FindByEmailAsync(loginUser.Email);
                if (applicationUser.Result != null)
                {
                    if (applicationUser.Result.EmailConfirmed)
                    {
                        return BadRequest("Usuário já registrado e confirmado!");
                    }
                }

                var user = new ApplicationUser()
                {
                    UserName = loginUser.UserName,
                    Email = loginUser.Email,
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnabled = true,
                    AccessFailedCount = Convert.ToInt32(decimal.Zero)
                };

                IdentityResult addUserResult = await userManager.CreateAsync(user, "&stoque2022");
                if (addUserResult.Succeeded)
                {
                    List<Claim> claims = new List<Claim>();
                    claims.Add(new Claim(ClaimTypes.Role, "Colaborador"));
                    await userManager.AddClaimsAsync(user, claims);
                    var empresaAspNetUsers = new AspNetUsersCompany()
                    {
                        CompanyId = companyId,
                        ApplicationUserId = user.Id
                    };
                    _aspNetUsersCompanyRepository.Insert(empresaAspNetUsers);
                    SendEmail(user, "&stoque2022");
                }
                else
                {
                    if (addUserResult.Errors.FirstOrDefault().Code.Equals("PasswordTooShort")) { return BadRequest("A senha deve ter no mínimo 6 caracteres"); }
                    if (addUserResult.Errors.FirstOrDefault().Code.Equals("InvalidEmail")) { return BadRequest("E-mail inválido!"); }
                    if (addUserResult.Errors.FirstOrDefault().Code.Equals("InvalidUserName")) { return BadRequest("Nome do usuário inválido. Use apenas letras e números."); }
                    return BadRequest(addUserResult.Errors.FirstOrDefault().ToString());
                }

                return new JsonResult("Usuário registrado com sucesso! Verifique a caixa de email para ter acesso.");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException);
            }

        }

        [HttpPost()]
        [Route("registerClient")]
        [Authorize()]
        public async Task<IActionResult> RegisterClient(LoginUser loginUser)
        {
            try
            {
                ClaimsPrincipal currentUser = this.User;
                var id = currentUser.Claims.FirstOrDefault(z => z.Type.Contains("primarysid")).Value;
                if (id == null)
                {
                    return BadRequest("Identificação do usuário não encontrada.");
                }

                var applicationUser = this.userManager.FindByEmailAsync(loginUser.Email);
                if (applicationUser.Result != null)
                {
                    if (applicationUser.Result.EmailConfirmed)
                    {
                        return BadRequest("Usuário já registrado e confirmado!");
                    }
                }

                var user = new ApplicationUser()
                {
                    UserName = loginUser.UserName,
                    Email = loginUser.Email,
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = false,
                    TwoFactorEnabled = false,
                    LockoutEnabled = true,
                    AccessFailedCount = Convert.ToInt32(decimal.Zero)
                };

                IdentityResult addUserResult = await userManager.CreateAsync(user, "&stoque2022");
                if (addUserResult.Succeeded)
                {
                    List<Claim> claims = new List<Claim>();
                    claims.Add(new Claim(ClaimTypes.Role, "Gerente"));
                    await userManager.AddClaimsAsync(user, claims);
                    var empresaAspNetUsers = new AspNetUsersCompany()
                    {
                        CompanyId = loginUser.CompanyId,
                        ApplicationUserId = user.Id
                    };
                    _aspNetUsersCompanyRepository.Insert(empresaAspNetUsers);
                    SendEmail(user, "&stoque2022");
                }
                else
                {
                    if (addUserResult.Errors.FirstOrDefault().Code.Equals("PasswordTooShort")) { return BadRequest("A senha deve ter no mínimo 6 caracteres"); }
                    if (addUserResult.Errors.FirstOrDefault().Code.Equals("InvalidEmail")) { return BadRequest("E-mail inválido!"); }
                    if (addUserResult.Errors.FirstOrDefault().Code.Equals("InvalidUserName")) { return BadRequest("Nome do usuário inválido. Use apenas letras e números."); }
                    return BadRequest(addUserResult.Errors.FirstOrDefault().ToString());
                }

                return new JsonResult("Usuário registrado com sucesso! Verifique sua caixa de email e confirme o cadastro.");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException);
            }

        }

        private void SendEmail(IdentityUser user, string secret)
        {
            try
            {
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(configuration["FromEmail"].ToString());
                mail.To.Add(user.Email);
                mail.Subject = "Seu cadastrado foi efetuado com sucesso.";
                mail.Body = "" +
                    "<div> Sr. " + user.UserName + "</div>" +
                    "<div></div>" +
                    "<div>Seu cadastro foi efetuado com sucesso na plataforma Domini Dextera.</div>" +
                     "<div>Login: " + user.Email + "</div>" +
                     "<div>Senha: " + secret + "</div>";
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient(configuration["STMPEmail"].ToString(), Convert.ToInt32(configuration["PortEmail"].ToString()));
                smtp.Credentials = new System.Net.NetworkCredential(configuration["UserEmail"].ToString(), configuration["PassEmail"].ToString());
                smtp.Send(mail);
            }
            catch (SmtpFailedRecipientException ex)
            {
                throw ex;
            }
            catch (SmtpException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost()]
        [Route("recoverPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> RecoverPassword(LoginUser loginUser)
        {
            try
            {
                if ((loginUser == null) || (loginUser.Email == null))
                {
                    return BadRequest("E-mail inválido.");
                }
                var user = await userManager.FindByEmailAsync(loginUser.Email);
                if (user == null)
                {
                    return BadRequest("E-mail não encontrado.");
                }
                user.PasswordHash = userManager.PasswordHasher.HashPassword(user, "&stoque2022");
                var result = await userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    SendEmail(user, "&stoque2022");
                }
                else
                {
                    return BadRequest("Não foi possível recuperar a senha.");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }

        }

        [HttpPost()]
        [AllowAnonymous]
        [Route("loginMaster")]
        public async Task<IActionResult> LoginMaster(LoginUser loginUser)
        {
            try
            {
                var user = await userManager.FindByEmailAsync(loginUser.Email);
                if (user == null)
                {
                    return BadRequest("Acesso negado! Usuário não existe!");
                }
                var result = await signInManager.PasswordSignInAsync(user.UserName, loginUser.Secret, false, false);
                if (!result.Succeeded)
                {
                    return BadRequest("Acesso negado! Login inválido!");
                }
                var claimsPrincipal = await signInManager.CreateUserPrincipalAsync(user);
                var claims = claimsPrincipal.Claims.ToList();
                var permission = claims.Where(c => c.Type.Contains("role")).Select(c => c.Value).FirstOrDefault();
                if (!permission.Equals("Master"))
                {
                    return BadRequest("Acesso negado! Usuário não é Master!");
                }
                var applicationUser = new ApplicationUser();
                applicationUser.Id = user.Id;
                var applicationUserDTO = new ApplicationUserDTO();
                applicationUserDTO.Token = TokenService.GenerateToken(applicationUser, configuration, permission, 0);
                applicationUserDTO.Email = user.Email;
                applicationUserDTO.UserName = user.UserName;
                applicationUserDTO.Role = permission;
                return new JsonResult(applicationUserDTO);
            }
            catch (Exception ex)
            {
                return BadRequest("Falha no login! " + ex.Message);
            }

        }

        [HttpPost()]
        [Route("changePassword")]
        [Authorize()]
        public async Task<IActionResult> ChangePassword(LoginUser loginUser)
        {
            ClaimsPrincipal currentUser = this.User;
            var id = currentUser.Claims.FirstOrDefault(z => z.Type.Contains("primarysid")).Value;
            if (id == null)
            {
                return BadRequest("Identificação do usuário não encontrada.");
            }
            var user = await userManager.FindByIdAsync(id);
            user.PasswordHash = userManager.PasswordHasher.HashPassword(user, loginUser.Secret);
            var result = await userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest("Não foi possível alterar a senha.");
            }
            return Ok();
        }
                
        [HttpGet()]
        [Route("getClients")]
        [Authorize()]
        public IActionResult GetClients()
        {
            try
            {
                Claim claim = new Claim("http://schemas.microsoft.com/ws/2008/06/identity/claims/role", "Gerente");
                var users = userManager.GetUsersForClaimAsync(claim).Result.ToList();
                users.ForEach(u =>
                {
                    Expression<Func<AspNetUsersCompany, bool>> p1;
                    var predicate = PredicateBuilder.New<AspNetUsersCompany>();
                    p1 = p => p.ApplicationUserId == u.Id;
                    predicate = predicate.And(p1);
                    u.Company = _aspNetUsersCompanyRepository.Where(predicate).FirstOrDefault().Company;
                });
                return new JsonResult(users);
            }
            catch (Exception ex)
            {
                return BadRequest(string.Concat("Falha no carregamento dos usuários: ", ex.Message));
            }
        }

    }
}
