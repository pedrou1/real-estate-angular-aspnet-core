using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealEstateWebApi.Models
{
    public enum OperationResult
    {
        Error = 0,
        Success = 1,
        UsernameAlreadyExist = 2
    }
}
