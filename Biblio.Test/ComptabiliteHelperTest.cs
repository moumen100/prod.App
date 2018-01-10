using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Biblio.DataModel;
using System.Linq;
using Biblio.BLL;
using System.Collections.Generic;
using System.Xml.Linq;
using System.Xml.Serialization;
using System.IO;
using System.Xml;

namespace Biblio.Test
{
    [TestClass]
    public class ComptabiliteHelperTest
    {
        [TestMethod]
        public void GetAllCustomesNames()
        {
            Entities dbcontext = new Entities();
            var x = dbcontext.GetAllCustomesNames().Select(p => new NameCountry {  FullUpperName = p.FullName,Country=p.Country  }).ToList();

            XmlSerializer xsSubmit = new XmlSerializer(typeof(List<NameCountry>));
            var xml = "";
            using (var sww = new StringWriter())
            {
                using (XmlWriter writer = XmlWriter.Create(sww))
                {
                    xsSubmit.Serialize(writer, x);
                    xml = sww.ToString(); // Your XML
                }
            }

            NameCountry acustomer = new NameCountry();
            acustomer.FullUpperName = "kjjkhfs";
            var uppername = acustomer.FullUpperName;
            var lowername = acustomer.FullLowerName;

            Assert.IsTrue(x.Count() > 0);
        }

        [TestMethod]
        public void CalculTVA()
        {
            ComptabiliteHelper helper = new ComptabiliteHelper();
            var tva = helper.CalculTVA(100);
            Assert.AreEqual(tva, 19.7);
        }
    }
    public class NameCountry
    {
        private string fullName;
        private string country;
        public string FullUpperName
        {
            get
            {
                return fullName.ToUpper();
            }
            set
            {
                fullName = value;
            }

        }
      [XmlIgnore]
        public string FullLowerName
        {
            get
            {
                return fullName.ToLower();
            }
            set
            {
                fullName = value;
            }
        }

        public string Country { get => country; set => country = value; }
    }
}
