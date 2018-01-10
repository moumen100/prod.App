using Biblio.BLL;
using Biblio.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Biblio.App.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {

            return View();
        }
        public JsonResult GetCustomers()
        {
            BiblioDataManager bll = new BiblioDataManager();

            var resultat = Json(bll.GetCustomers(),JsonRequestBehavior.AllowGet);
            
            return resultat;
        }

        //section Suplier space
        public ActionResult Products()
        {
            //var resultat = Json(bll.GetCustomers(), JsonRequestBehavior.AllowGet);
            ViewBag.Message = "Manage your products here.";

            return View();
        }


        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Customers()
        {
            ViewBag.Message = "Liste des consomateurs";
            return View();
        }

    }
}