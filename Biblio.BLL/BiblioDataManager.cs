using Biblio.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Biblio.BLL
{
    public class BiblioDataManager
    {
        public List<VM_NameCountry> GetCustomers()
        {
            Entities dbcontext = new Entities();
            var x = dbcontext.GetAllCustomesNames().Select(p => new VM_NameCountry { FullUpperName = p.FullName, Country = p.Country }).ToList();
            
            return x;
        }
        public List<Order> GetCustomerOrders(int customerId)
        {
            Entities dbcontext = new Entities();
            var x = dbcontext.Order.Where(p => p.CustomerId == customerId).ToList();
            var y = dbcontext.Customer.Find(customerId);
            return y.Order.ToList();
           
           
        }

        // Get all product6s
        public List<GetProducts_Result> GetProducts()
        {
            Entities dbcontext = new Entities();
            var x = dbcontext.GetProducts(1).ToList();
            return x;
        }
    }
}
