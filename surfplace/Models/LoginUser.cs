﻿
namespace Models
{
    public class LoginUser
    {
        public string Email { get; set; }
        public string Secret { get; set; }
        public string UserName { get; set; }
        public string Code { get; set; }

        public int CompanyId { get; set; }

        public string ApplicationUserId { get; set; }
    }
}
