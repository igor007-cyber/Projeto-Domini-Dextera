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
using System.ComponentModel.Design;

namespace surfplace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private IBrandRepository _BrandRepository;

        public BrandController(
             IBrandRepository BrandRepository)
        {
            this._BrandRepository = BrandRepository;
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
            Expression<Func<Brand, bool>> p1,p2;
            var predicate = PredicateBuilder.New<Brand>();
            p2 = p => p.CompanyId == companyId;
            predicate = predicate.And(p2);
            if (filter.Name != null)
            {
                p1 = p => p.Description.Contains(filter.Name);
                predicate = predicate.And(p1);
            }
            return new JsonResult(_BrandRepository.Where(predicate).ToList());
        }

        [HttpPost()]
        [Route("save")]
        [Authorize()]
        public IActionResult Save(Brand brand)
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
                if (brand.Id > decimal.Zero)
                    {
                        _BrandRepository.Update(brand);
                    }
                    else
                    {
                        brand.Active = true;
                    brand.CompanyId = companyId;
                        _BrandRepository.Insert(brand);
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
                _BrandRepository.Delete(id);
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
                return new JsonResult(_BrandRepository.Get(id));
            }
            catch (Exception ex)
            {
                return BadRequest("Arquivo não encontrado!" + ex.Message);
            }
        }

        [HttpPost()]
        [Route("active")]
        [Authorize()]
        public IActionResult Active(Brand brand)
        {
            try
            {
                _BrandRepository.Active(brand.Id);
                return new OkResult();
            }
            catch (Exception ex)
            {
                return new JsonResult(ex);
            }
        }

    }
}
