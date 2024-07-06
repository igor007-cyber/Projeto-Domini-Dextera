using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace Models
{
    [Table("Checkout")]
    public class CheckOut : BaseEntity
    {
        public decimal Quantity { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public int ProductId { get; set; }
        public int CompanyId { get; set; }

        [NotMapped]
        public Product Product { get; set; }

    }
}
