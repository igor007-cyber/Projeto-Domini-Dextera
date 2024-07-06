using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;

namespace Models
{
    [Table("Product")]
    public class Product : BaseEntity
    {
        public string Description { get; set; }
        public string Code { get; set; }
        public string ImageName { get; set; }
        public decimal ValueMinimum { get; set; }
        public decimal Value { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int CompanyId { get; set; }
        public int BrandId { get; set; }
        public bool Active { get; set; }

        [NotMapped]
        public Company Company { get; set; }
        [NotMapped]
        public Brand Brand { get; set; }
        [NotMapped]
        public virtual List<CheckIn> CheckIns { get; set; }
        [NotMapped]
        public virtual List<CheckOut> CheckOuts { get; set; }




    }
}
