using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace Models
{
     [Table("Company")]
    public class Company : BaseEntity
    {
        public string Name { get; set; }
        public bool Active { get; set; }
        public string Cnpj { get; set; }

        [NotMapped]
        public string Email { get; set; }

        [NotMapped]
        public List<IdentityRole> Modules;
        public Company()
        {
            Modules = new List<IdentityRole>();
        }
    }
}
