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
    public class CheckOutController : ControllerBase
    {
        private ICheckOutRepository _CheckOutRepository;

        public CheckOutController(
             ICheckOutRepository CheckOutRepository)
        {
            this._CheckOutRepository = CheckOutRepository;
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
            Expression<Func<CheckOut, bool>> p1, p2;
            var predicate = PredicateBuilder.New<CheckOut>();
            p2 = p => p.CompanyId == companyId;
            predicate = predicate.And(p2);
            if (filter.Id > 0)
            {
                p1 = p => p.ProductId == filter.Id;
                predicate = predicate.And(p1);
            }
            return new JsonResult(_CheckOutRepository.Where(predicate).ToList());
        }

        [HttpPost()]
        [Route("save")]
        [Authorize()]
        public IActionResult Save(CheckOut checkout)
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
                checkout.CreateDate= DateTime.Now;
                checkout.CompanyId = companyId;
                _CheckOutRepository.Insert(checkout);
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
                _CheckOutRepository.Delete(id);
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
                return new JsonResult(_CheckOutRepository.Get(id));
            }
            catch (Exception ex)
            {
                return BadRequest("Arquivo não encontrado!" + ex.Message);
            }
        }


    }
}
