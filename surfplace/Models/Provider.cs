using System.ComponentModel.DataAnnotations.Schema;
namespace Models
{
     [Table("Provider")]
    public class Provider : BaseEntity
    {
        public string Description { get; set; }
        public int CompanyId { get; set; }
        public bool Active { get; set; }

        [NotMapped]
        public virtual Company Company { get; set; }
        public Provider()
        {

        }
    }
}
