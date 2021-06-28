﻿using Microsoft.AspNetCore.Http;
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
            string query = @"select EmployeeId, EmployeeName, Department, 
        convert(varchar(10),DateOfJoining,120) as DateOfJoining, PhotoFileName
            from dbo.Employee";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Property property)
        {
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            var conn = new SqlConnection(sqlDataSource);
            conn.Open();

            SqlCommand cmd = new SqlCommand();

            using (cmd = new SqlCommand("Employees_AddEmployee", conn))
            {
                // 2. identificamos el tipo de ejecución, en este caso un SP
                cmd.CommandType = CommandType.StoredProcedure;

                // 3. en caso de que los lleve se ponen los parametros del SP
                cmd.Parameters.Add(new SqlParameter("@EmployeeName", employee.EmployeeName));
                cmd.Parameters.Add(new SqlParameter("@Department", employee.Department));
                cmd.Parameters.Add(new SqlParameter("@DateOfJoining", employee.DateOfJoining));
                cmd.Parameters.Add(new SqlParameter("@PhotoFileName", employee.PhotoFileName));
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
        /*
        public JsonResult Post(Employee employee)
        {
            string query = @" insert into dbo.Employee 
            (EmployeeName,Department, DateOfJoining, PhotoFileName) values
        (
            '" + employee.EmployeeName + @"'
            ,'" + employee.Department + @"'
            ,'" + employee.DateOfJoining + @"'
            ,'" + employee.PhotoFileName + @"'

        )";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        } */

        [HttpPut]
        public JsonResult Put(Employee employee)
        {
            string query = @" update dbo.Employee set 
            EmployeeName = '" + employee.EmployeeName + @"'
            ,Department = '" + employee.Department + @"'
            ,DateOfJoining = '" + employee.DateOfJoining + @"'
             where EmployeeId = " + employee.EmployeeId + @" ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @" delete from dbo.Employee
                where EmployeeId = " + id + @"
                ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
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
                var physicalPath = _env.ContentRootPath + "/Photos/" + fileName;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(fileName);
            }
            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }

        [Route("GetAllDepartmentNames")]
        public JsonResult GetAllDepartmentNames()
        {
            string query = @"select DepartmentName from dbo.Department";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [Route("Id")]
        [HttpGet("{id}")]

        public JsonResult GetEmployeeById(int id)
        {
            string query = @"select EmployeeName, Department, 
        convert(varchar(10),DateOfJoining,120) as DateOfJoining, PhotoFileName
            from dbo.Employee where EmployeeId = " + id;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

    }
}

    }
}
