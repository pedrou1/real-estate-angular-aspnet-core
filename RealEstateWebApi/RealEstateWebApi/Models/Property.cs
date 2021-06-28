using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealEstateWebApi.Models
{
    public class Property
    {
        public int property_id { get; set; }
        public string property_type { get; set; }
        public string description { get; set; }
        public string city { get; set; }
        public string address { get; set; }
        public string total_bedrooms { get; set; }
        public string total_area_m2 { get; set; }
        public string photo_file_name { get; set; }
        public int price { get; set; }



    }
}
