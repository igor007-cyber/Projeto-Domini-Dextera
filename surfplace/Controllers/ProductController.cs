using LinqKit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Models.Filters;
using Models;
using Newtonsoft.Json;
using System.IO;
using System.Linq.Expressions;
using System.Linq;
using System.Security.Claims;
using System;
using UnitOfWork;
using Microsoft.Extensions.Configuration;
using Repositorys;
using System.Drawing;
using ClosedXML.Excel;

namespace surfplace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IWebHostEnvironment _hostEnvironment;
        private IConfiguration _configuration;
        private IProductRepository _productRepository;

        public ProductController(
           IWebHostEnvironment environment,
           IConfiguration Configuration,
           IProductRepository productRepository
           )
        {
            _hostEnvironment = environment;
            _configuration = Configuration;
            this._productRepository = productRepository;
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
            Expression<Func<Product, bool>> p1, p2;
            var predicate = PredicateBuilder.New<Product>();
            p2 = p => p.CompanyId == companyId;
            predicate = predicate.And(p2);
            if (filter.Name != null)
            {
                p1 = p => p.Description.Contains(filter.Name);
                predicate = predicate.And(p1);
            }
            return new JsonResult(_productRepository.Where(predicate).ToList());
        }

        [HttpPost()]
        [Route("save")]
        [Authorize()]
        public IActionResult Save()
        {
            try
            {
                var product = JsonConvert.DeserializeObject<Product>(Convert.ToString(Request.Form["product"]));
                var pathToSave = string.Concat(_hostEnvironment.ContentRootPath, _configuration["pathFileProduct"]);
                var fileDelete = pathToSave;
                var files = Request.Form.Files;
                ClaimsPrincipal currentUser = this.User;
                var id = currentUser.Claims.FirstOrDefault(z => z.Type.Contains("primarysid")).Value;
                var companyId = Convert.ToInt32(currentUser.Claims.FirstOrDefault(z => z.Type.Contains("sid")).Value);
                if ((id != null) || (product != null))
                {
                    if (product.Id == decimal.Zero)
                    {
                        product.CompanyId= companyId;
                        if (Request.Form.Files.Count() > decimal.Zero)
                        {
                            for (var counter = 0; counter < files.Count; counter++)
                            {
                                var extension = Path.GetExtension(Request.Form.Files[0].FileName);
                                var fileName = string.Concat(Guid.NewGuid().ToString(), extension);
                                var fullPath = Path.Combine(pathToSave, fileName);
                                using (var stream = new FileStream(fullPath, FileMode.Create))
                                {
                                    files[counter].CopyTo(stream);
                                }
                                product.ImageName = fileName;
                            };

                            product.CreateDate = DateTime.Now;
                            product.Active = true;
                            _productRepository.Insert(product);
                        }
                    }
                    else
                    {
                        var productBase = _productRepository.Get(product.Id);
                        if (Request.Form.Files.Count() > decimal.Zero)
                        {
                            for (var counter = 0; counter < files.Count; counter++)
                            {
                                var extension = Path.GetExtension(Request.Form.Files[0].FileName);
                                var fileName = string.Concat(Guid.NewGuid().ToString(), extension);
                                var fullPath = Path.Combine(pathToSave, fileName);
                                using (var stream = new FileStream(fullPath, FileMode.Create))
                                {
                                    files[counter].CopyTo(stream);
                                }
                                product.ImageName = fileName;
                            };
                            fileDelete = string.Concat(fileDelete, productBase.ImageName);
                        }
                        product.UpdateDate = DateTime.Now;
                        _productRepository.Update(product);
                        if (System.IO.File.Exists(fileDelete))
                        {
                            System.IO.File.Delete(fileDelete);
                        }

                    }

                }

                return new OkResult();

            }
            catch (Exception ex)
            {
                return BadRequest(string.Concat("Falha na tentativa: ", ex.Message));
            }

        }

        [HttpGet("{id}")]
        [Authorize()]
        public IActionResult Get(int id)
        {
            try
            {
                return new JsonResult(_productRepository.Get(id));
            }
            catch (Exception ex)
            {
                return BadRequest("Arquivo não encontrado!" + ex.Message);
            }
        }

        [HttpPost()]
        [Route("active")]
        [Authorize()]
        public IActionResult Active(Product product)
        {
            try
            {
                _productRepository.Active(product.Id);
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
                _productRepository.Delete(id);
                return new OkResult();
            }
            catch (Exception ex)
            {
                if (ex.InnerException.Message.Contains("The DELETE statement conflicted with the REFERENCE constraint"))
                {
                    return BadRequest("O produto não pode ser excluído. Já existe movimentação no produto. Considere desativar!");
                }
                return BadRequest(string.Concat("Falha na exclusão do produto: ", ex.Message));
            }


        }

        [HttpPost()]
        [Route("rel")]
        [Authorize()]
        public IActionResult Rel(FilterDefault filter)
        {
            ClaimsPrincipal currentUser = this.User;
            var id = currentUser.Claims.FirstOrDefault(z => z.Type.Contains("primarysid")).Value;
            var empresaId = Convert.ToInt32(currentUser.Claims.FirstOrDefault(z => z.Type.Contains("sid")).Value);
            if (id == null)
            {
                return BadRequest("Identificação do usuário não encontrada.");
            }
            var product = _productRepository.Rel(filter.Id);
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("movimentacao_produto");
                worksheet.SetShowGridLines(false);
                worksheet.Column("A").Width = 20;
                worksheet.Column("B").Width = 20;
                worksheet.Column("C").Width = 20;
                var currentRow = 1;
                worksheet.Cell(currentRow, 1).Value = "Relatório de movimentação de estoque do produto";
                worksheet.Cell(currentRow, 1).Style.Font.Bold = true;
                worksheet.Cell(currentRow, 1).Style.Font.SetFontSize(14);
                worksheet.Range("A1:C3").Row(1).Merge();
                currentRow++;
                worksheet.Cell(currentRow, 1).Value = string.Concat("Empresa: ", product.Company.Name);
                worksheet.Range("A2:C3").Row(1).Merge();
                currentRow++;
                worksheet.Cell(currentRow, 1).Value = string.Concat("Produto: ", product.Description);
                worksheet.Range("A3:C3").Row(1).Merge();
                currentRow++;
                currentRow++;

                if (product.CheckIns.Count() > decimal.Zero) {
                    IXLRange range = worksheet.Range(worksheet.Cell(currentRow, 1).Address, worksheet.Cell(currentRow + 1, 2).Address);
                    range.Style.Border.BottomBorder = XLBorderStyleValues.Thick;
                    range.Style.Border.LeftBorder = XLBorderStyleValues.Thick;
                    range.Style.Border.RightBorder = XLBorderStyleValues.Thick;
                    range.Style.Border.TopBorder = XLBorderStyleValues.Thick;
                    range.Style.Fill.SetBackgroundColor(XLColor.LightGray);
                    range.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                    worksheet.Cell(currentRow, 1).Value = "Movimentação de Entrada";
                    worksheet.Range(worksheet.Cell(currentRow, 1).Address, worksheet.Cell(currentRow + 1, 2).Address).Row(1).Merge();
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = "Data da movimentação";
                    worksheet.Cell(currentRow, 2).Value = "Quantidade";
                    currentRow++;
                    product.CheckIns.ForEach(checkin =>
                    {
                        worksheet.Cell(currentRow, 1).Value = checkin.CheckInDate.ToString("dd/MM/yyyy");
                        worksheet.Cell(currentRow, 2).Value = checkin.Quantity;
                        worksheet.Cell(currentRow, 2).Style.NumberFormat.Format = "#,###.00";
                        currentRow++;
                    });
                }


                if (product.CheckOuts.Count() > decimal.Zero)
                {
                    currentRow++;
                    IXLRange range = worksheet.Range(worksheet.Cell(currentRow, 1).Address, worksheet.Cell(currentRow + 1, 2).Address);
                    range.Style.Border.BottomBorder = XLBorderStyleValues.Thick;
                    range.Style.Border.LeftBorder = XLBorderStyleValues.Thick;
                    range.Style.Border.RightBorder = XLBorderStyleValues.Thick;
                    range.Style.Border.TopBorder = XLBorderStyleValues.Thick;
                    range.Style.Fill.SetBackgroundColor(XLColor.LightGray);
                    range.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                    worksheet.Cell(currentRow, 1).Value = "Movimentação de Saída";
                    worksheet.Range(worksheet.Cell(currentRow, 1).Address, worksheet.Cell(currentRow + 1, 2).Address).Row(1).Merge();
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = "Data da movimentação";
                    worksheet.Cell(currentRow, 2).Value = "Quantidade";
                    currentRow++;
                    product.CheckOuts.ForEach(checkout =>
                    {
                        worksheet.Cell(currentRow, 1).Value = checkout.CheckOutDate.ToString("dd/MM/yyyy");
                        worksheet.Cell(currentRow, 2).Value = checkout.Quantity;
                        worksheet.Cell(currentRow, 2).Style.NumberFormat.Format = "#,###.00";
                        currentRow++;
                    });
                }



                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();

                    return File(
                        content,
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "rel.xlsx");
                }
            }
        }
    }
}
