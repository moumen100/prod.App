using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Biblio.BLL
{
    public class ComptabiliteHelper
    {
        public double CalculTVA(double montantFacture)
        {
            return (montantFacture * 19.7 )/ 100;
        }
    }
}
