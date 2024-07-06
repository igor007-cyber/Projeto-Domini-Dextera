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
using Repositorys;

namespace surfplace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProviderController : ControllerBase
    {
        private IProviderRepository _ProviderRepository;

        public ProviderController(
             IProviderRepository ProviderRepository)
        {
            this._ProviderRepository = ProviderRepository;
        }

        [HttpPost()]
        [Route("filter")]
        [Authorize()]
        public IActionResult GetByFilter(FilterDefault filter)
        {
            ClaimsPrincipal currentUser = this.User;
            var id = currentUser.Claims.FirstOrDefault(z => z.Type.Contains("primarysid")).Value;
            var companyId = Convert.ToInt32(currentUser.Claims.FirstOrDefault(z => z.Type.Contains("sid")).Value);
            if (id == null)
            {
                return BadRequest("Identificação do usuário não encontrada.");
            }
            Expression<Func<Provider, bool>> p1,p2;
            var predicate = PredicateBuilder.New<Provider>();
            p2 = p => p.CompanyId == companyId;
            predicate = predicate.And(p2);
            if (filter.Name != null)
            {
                p1 = p => p.Description.Contains(filter.Name);
                predicate = predicate.And(p1);
                
            }
            return new JsonResult(_ProviderRepository.Where(predicate).ToList());
        }

        [HttpPost()]
        [Route("save")]
        [Authorize()]
        public IActionResult Save(Provider provider)
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
                if (provider.Id > decimal.Zero)
                    {
                        _ProviderRepository.Update(provider);
                    }
                    else
                    {
                    provider.Active = true;
                    provider.CompanyId = companyId;
                        _ProviderRepository.Insert(provider);
                    }
                    return new OkResult();
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
                _ProviderRepository.Delete(id);
                return new OkResult();
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("The DELETE statement conflicted with the REFERENCE constraint"))
                {
                    return BadRequest("A tecnologia / construção não pode ser excluída. Está relacionada com um pedido. Considere desativar!");
                }
                return BadRequest(string.Concat("Falha na exclusão da construção: ", ex.Message));
            }


        }

        [HttpGet("{id}")]
        [Authorize()]
        public IActionResult Get(int id)
        {
            try
            {
                return new JsonResult(_ProviderRepository.Get(id));
            }
            catch (Exception ex)
            {
                return BadRequest("Arquivo não encontrado!" + ex.Message);
            }
        }

        [HttpPost()]
        [Route("active")]
        [Authorize()]
        public IActionResult Active(Provider brand)
        {
            try
            {
                _ProviderRepository.Active(brand.Id);
                return new OkResult();
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }
        }

    }
}
