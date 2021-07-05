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
using Newtonsoft.Json;

namespace RealEstateWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public UserController(IConfiguration configuration, IWebHostEnvironment env)
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

                SqlCommand cmd = new SqlCommand("User_GetUsers", conn)
                {
                    CommandType = CommandType.StoredProcedure
                };

                using (SqlDataReader oReader = cmd.ExecuteReader())
                {
                    table.Load(oReader);

                    conn.Close();

                    JsonResult json = new JsonResult(table);
                    return json;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult Post(User user)
        {
            string sqlDataSource = _configuration.GetConnectionString("RealEstateAppCon");
            var conn = new SqlConnection(sqlDataSource);
            conn.Open();

            SqlCommand cmd = new SqlCommand();

            using (cmd = new SqlCommand("User_SignUp", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@name", user.name));
                cmd.Parameters.Add(new SqlParameter("@last_name", user.last_name));
                cmd.Parameters.Add(new SqlParameter("@username", user.username));
                cmd.Parameters.Add(new SqlParameter("@password", user.password));
                cmd.Parameters.Add(new SqlParameter("@is_admin", user.is_admin));
                
                int rtnInsert = Convert.ToInt32(cmd.ExecuteNonQuery());

                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                if (rtnInsert > 0)
                {
                    return new JsonResult("Registered Successfully");
                }
                else
                {
                    return new JsonResult("Error");
                }
            }
        }

        [HttpPut]
        public JsonResult Put(User user)
        {
           
            string sqlDataSource = _configuration.GetConnectionString("RealEstateAppCon");
             DataTable table = new DataTable();
             try
             {
                 var conn = new SqlConnection(sqlDataSource);
                 conn.Open();
                 SqlCommand cmd = new SqlCommand();
                 using (cmd = new SqlCommand("User_UpdateUser", conn))
                 {
                     cmd.CommandType = CommandType.StoredProcedure;
                     cmd.Parameters.Add(new SqlParameter("@user_id", user.user_id));
                     cmd.Parameters.Add(new SqlParameter("@name", user.name));
                     cmd.Parameters.Add(new SqlParameter("@last_name", user.last_name));
                     cmd.Parameters.Add(new SqlParameter("@username", user.username));
                     cmd.Parameters.Add(new SqlParameter("@password", user.password));
                     cmd.Parameters.Add(new SqlParameter("@is_admin", user.is_admin));

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
            return new JsonResult("Updated Successfully");
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
                using (cmd = new SqlCommand("User_DeleteUser", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@user_id", id));
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
        
        [HttpPost("login")]
        
        public IActionResult SignIn(UserSignIn userSignIn)
        {
            string sqlDataSource = _configuration.GetConnectionString("RealEstateAppCon");
            var conn = new SqlConnection(sqlDataSource);
            conn.Open();
            SqlCommand cmd = new SqlCommand();
            UserSignInResult result = new UserSignInResult();
            
            using (cmd = new SqlCommand("User_SignIn", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@username", userSignIn.username));
                cmd.Parameters.Add(new SqlParameter("@password", userSignIn.password));

                using (SqlDataReader oReader = cmd.ExecuteReader())
                {

                    while (oReader.Read())
                    {

                        result.user_id = int.Parse(oReader["user_id"].ToString());
                        result.is_admin = oReader["is_admin"].ToString();
                    }
                }
                if (conn.State == ConnectionState.Open)
                {
                    conn.Close();
                }
                
                return Ok(result);
            }
        }
        

        [HttpGet("Username/{username}")]

        public IActionResult userExists(string username)
        {
            DataTable table = new DataTable();
            try
            {
                string sqlDataSource = _configuration.GetConnectionString("RealEstateAppCon");
                var conn = new SqlConnection(sqlDataSource);
                conn.Open();

                SqlCommand cmd = new SqlCommand();
                using (cmd = new SqlCommand("User_UsernameExists", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@username", username));

                    

                    var returnValue = cmd.Parameters.Add("@userExists", SqlDbType.Int);
                    returnValue.Direction = ParameterDirection.ReturnValue;
                    cmd.ExecuteNonQuery();

                    int exists = (int)returnValue.Value;


                    if (exists != 0)
                    {
                        exists = 1;
                    }

                    conn.Close();

                    return Ok(exists);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpGet("admin/{id}")]
        public JsonResult GetUserById(int id)
        {
            DataTable table = new DataTable();
            try
            {
                string sqlDataSource = _configuration.GetConnectionString("RealEstateAppCon");
                var conn = new SqlConnection(sqlDataSource);
                conn.Open();

                SqlCommand cmd = new SqlCommand();
                using (cmd = new SqlCommand("User_GetUserById", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@user_id", id));
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
