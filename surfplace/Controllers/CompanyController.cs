using System;
using System.Linq;
using System.Security.Claims;
using Models;
using UnitOfWork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using LinqKit;
using Models.Filters;

namespace surfplace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private ICompanyRepository companyRepository;

        public CompanyController(
             ICompanyRepository companyRepository)
        {
            this.companyRepository = companyRepository;
        }

        [HttpPost()]
        [Route("filter")]
        [Authorize()]
        public IActionResult GetByFilter(FilterDefault filter)
        {
            ClaimsPrincipal currentUser = this.User;
            var id = currentUser.Claims.FirstOrDefault(z => z.Type.Contains("primarysid")).Value;
            if (id == null)
            {
                return BadRequest("Identificação do usuário não encontrada.");
            }
            Expression<Func<Company, bool>> p1,p2;
            var predicate = PredicateBuilder.New<Company>();
            if (filter.Name != null)
            {
                p1 = p => p.Name.Contains(filter.Name);
                predicate = predicate.And(p1);
                return new JsonResult(companyRepository.Where(predicate).ToList());
            }

            return new JsonResult(companyRepository.GetAll());
        }

        [HttpPost()]
        [Route("save")]
        [Authorize()]
        public IActionResult Save(Company company)
        {
            try
            {
                try
                {
                    if (company.Id > decimal.Zero)
                    {
                        companyRepository.Update(company);
                    }
                    else
                    {
                        company.Active = true;
                        companyRepository.Insert(company);
                    }
                    return new OkResult();
                }
                catch (Exception ex)
                {
                    return new JsonResult(ex);
                }
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }
        }

        [HttpDelete("{id}")]
        [Authorize()]
        public IActionResult Delete(int id)
        {
            try
            {
                companyRepository.Delete(id);
                return new OkResult();
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("The DELETE statement conflicted with the REFERENCE constraint"))
                {
                    return BadRequest("A Empresa não pode ser excluída. Está relacionada com um usuário. Considere desativar!");
                }
                return BadRequest(string.Concat("Falha na exclusão da Empresa: ", ex.Message));
            }


        }

        [HttpGet("{id}")]
        [Authorize()]
        public IActionResult Get(int id)
        {
            try
            {
                return new JsonResult(companyRepository.Get(id));
            }
            catch (Exception ex)
            {
                return BadRequest("Arquivo não encontrado!" + ex.Message);
            }
        }

        [HttpPost()]
        [Route("active")]
        [Authorize()]
        public IActionResult Active(Company company)
        {
            try
            {
                companyRepository.Active(company.Id);
                return new OkResult();
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }
        }

    }
}
