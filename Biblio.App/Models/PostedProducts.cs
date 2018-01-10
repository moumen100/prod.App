using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Biblio.App.Models
{
    public class PostedProducts
    {
        public string ProductName { get; set; }
        public string UnitPrice { get; set; }
        public string Package { get; set; }
        public bool IsDiscontinued { get; set; }
        public string ProductId { get; set; }
    }
}