using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealEstateWebApi.Models
{
    public class UserSignInResult
    {
        public int user_id { get; set; }
        public string is_admin { get; set; } 
    }
}
