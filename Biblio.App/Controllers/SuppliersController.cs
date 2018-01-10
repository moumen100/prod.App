using Biblio.App.Models;
using Biblio.BLL;
using Biblio.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;



namespace Biblio.App.Controllers
{

    public class SuppliersController : Controller
    {
        // GET: Suppliers
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetProducts()
        {
            BiblioDataManager bll = new BiblioDataManager();

            var resultat = Json(bll.GetProducts(), JsonRequestBehavior.AllowGet);

            return resultat;
        }
        public ActionResult Products()
        {
            //var resultat = Json(bll.GetCustomers(), JsonRequestBehavior.AllowGet);
            ViewBag.Message = "Manage your products here.";

            return View();
        }

        [HttpPost]
        public void Products(PostedProducts p)
        {
             
            Entities remove = new Entities();
            remove.RemoveProduct(Convert.ToInt32(p.ProductId), 1);
        }
        
        public ActionResult AddProduct()
        {
           
            ViewBag.Message = "Add your products here.";
            return View();
        }
        [HttpPost]
        public void AddProduct(PostedProducts p )
        {
            Entities context = new Entities();
            Product prod = new Product  { ProductName = p.ProductName, SupplierId = 1, UnitPrice = System.Convert.ToDecimal(p.UnitPrice), Package = p.Package, IsDiscontinued = p.IsDiscontinued };
            context.Product.Add(prod);
            context.SaveChanges();
            return;
        }
        /*[HttpPost]
        public JsonResult RemoveProducts (string ProdId)
        {
            
            var Resultat = Json(ProdId.ToList(), JsonRequestBehavior.AllowGet);
            return Resultat;
        }*/

        public ActionResult EditProduct()
        {

            ViewBag.Message = "Edit your products here.";
            return View();
        }
        [HttpPost]
        public void EditProduct(PostedProducts p)
        {
            return;
            
        }
        [HttpPost]
        public JsonResult GetNewProduct (PostedProducts p)
        {
            var x = new List<PostedProducts>();
            x.Add(p);
            var y = Json(x, JsonRequestBehavior.AllowGet);
            return y;
        }

    }
}
