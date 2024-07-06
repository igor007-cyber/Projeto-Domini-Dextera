using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace Models
{
    [Table("Checkin")]
    public class CheckIn : BaseEntity
    {
        public decimal Quantity { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime CheckInDate { get; set; }
        public int ProductId { get; set; }
        public int? ProviderId { get; set; }
        public int CompanyId { get; set; }

        [NotMapped]
        public Product Product { get; set; }
        [NotMapped]
        public Provider Provider { get; set; }

    }
}
