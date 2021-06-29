using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealEstateWebApi.Models
{
    public class User
    {
        public int user_id { get; set; }
        public int name { get; set; }
        public string last_name { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string date_of_joining { get; set; }
        public string is_admin { get; set; }

    }
}
