using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using RealEstateWebApi.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace RealEstateWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public PropertyController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            try
            {
                string sqlDataSource = _configuration.GetConnectionString("RealEstateAppCon");
                var conn = new SqlConnection(sqlDataSource);
                conn.Open();

                SqlCommand cmd = new SqlCommand("Property_GetProperties", conn)
                {
                    CommandType = CommandType.StoredProcedure
                };

                using (SqlDataReader oReader = cmd.ExecuteReader())
                {
                        /*Property category = new Property
                        {
                            property_id = int.Parse(oReader["property_id"].ToString()),
                            property_type = oReader["property_type"].ToString(),
                            description = oReader["description"].ToString(),
                            city = oReader["city"].ToString(),
                            address = oReader["address"].ToString(),
                            total_bedrooms = oReader["total_bedrooms"].ToString(),
                            total_area_m2 = oReader["total_area_m2"].ToString(),
                            photo_file_name = oReader["photo_file_name"].ToString(),
                            price = int.Parse(oReader["price"].ToString())
                        };
                        */
                        table.Load(oReader);
                    
                    conn.Close();

                    return new JsonResult(table);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult Post(Property property)
        {
            if (property.photo_file_name == null)
            {
                property.photo_file_name = "noImage.jpg";
            }

            string sqlDataSource = _configuration.GetConnectionString("RealEstateAppCon");
            var conn = new SqlConnection(sqlDataSource);
            conn.Open();

            SqlCommand cmd = new SqlCommand();

            using (cmd = new SqlCommand("Property_AddProperty", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@property_type", property.property_type));
                cmd.Parameters.Add(new SqlParameter("@description", property.description));
                cmd.Parameters.Add(new SqlParameter("@city", property.city));
                cmd.Parameters.Add(new SqlParameter("@address", property.address));
                cmd.Parameters.Add(new SqlParameter("@total_bedrooms", property.total_bedrooms));
                cmd.Parameters.Add(new SqlParameter("@total_area_m2", property.total_area_m2));
                cmd.Parameters.Add(new SqlParameter("@photo_file_name", property.photo_file_name));
                cmd.Parameters.Add(new SqlParameter("@price", property.price));

                int rtnInsert = Convert.ToInt32(cmd.ExecuteNonQuery());

                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                if (rtnInsert > 0)
                {
                    return new JsonResult("Added Successfully");
                }
                else
                {
                    return new JsonResult("Error");
                }
            }
        }

        [HttpPut]
        public JsonResult Put(Property property)
        {
            string sqlDataSource = _configuration.GetConnectionString("RealEstateAppCon");
            DataTable table = new DataTable();
            try
            {
                var conn = new SqlConnection(sqlDataSource);
                conn.Open();
                SqlCommand cmd = new SqlCommand();
                using (cmd = new SqlCommand("Property_UpdateProperty", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@property_id", property.property_id));
                    cmd.Parameters.Add(new SqlParameter("@property_type", property.property_type));
                    cmd.Parameters.Add(new SqlParameter("@description", property.description));
                    cmd.Parameters.Add(new SqlParameter("@city", property.city));
                    cmd.Parameters.Add(new SqlParameter("@address", property.address));
                    cmd.Parameters.Add(new SqlParameter("@total_bedrooms", property.total_bedrooms));
                    cmd.Parameters.Add(new SqlParameter("@total_area_m2", property.total_area_m2));
                    cmd.Parameters.Add(new SqlParameter("@photo_file_name", property.photo_file_name));
                    cmd.Parameters.Add(new SqlParameter("@price", property.price));

                    cmd.ExecuteNonQuery();

                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                }
                    return new JsonResult("Updated Successfully");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string sqlDataSource = _configuration.GetConnectionString("RealEstateAppCon");
            DataTable table = new DataTable();
            try
            {
                var conn = new SqlConnection(sqlDataSource);
                conn.Open();
                SqlCommand cmd = new SqlCommand();
                using (cmd = new SqlCommand("Property_DeleteProperty", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@property_id", id));
                    cmd.ExecuteNonQuery();

                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                    }
                }
                return new JsonResult("Deleted Successfully");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("SaveFile")]
        [HttpPost]

        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/ImagesUpload/" + fileName;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(fileName);
            }
            catch (Exception)
            {
                return new JsonResult("noImage.jpg");
            }
        }

        [Route("Id")]
        [HttpGet("{id}")]

        public JsonResult GetPropertyById(int id)
        {
            DataTable table = new DataTable();
            try
            {
                string sqlDataSource = _configuration.GetConnectionString("RealEstateAppCon");
                var conn = new SqlConnection(sqlDataSource);
                conn.Open();

                SqlCommand cmd = new SqlCommand();
                using (cmd = new SqlCommand("Property_GetPropertyById", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@property_id", id));
                    cmd.ExecuteNonQuery();

                    using (SqlDataReader oReader = cmd.ExecuteReader())
                    {
                        table.Load(oReader);

                        conn.Close();

                        return new JsonResult(table);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}