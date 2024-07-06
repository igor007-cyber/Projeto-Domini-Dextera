using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("AspNetUsersCompany")]
    public class AspNetUsersCompany : BaseEntity
    {
        public string ApplicationUserId { get; set; }
        public int CompanyId { get; set; }

        [NotMapped]
        public ApplicationUser ApplicationUser { get; set; }
        [NotMapped]
        public virtual Company Company { get; set; }
    }
}
