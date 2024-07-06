using System.ComponentModel.DataAnnotations.Schema;
namespace Models
{
     [Table("Brand")]
    public class Brand : BaseEntity
    {
        public string Description { get; set; }
        public int CompanyId { get; set; }
        public bool Active { get; set; }

        [NotMapped]
        public virtual Company Company { get; set; }
        public Brand()
        {

        }
    }
}
