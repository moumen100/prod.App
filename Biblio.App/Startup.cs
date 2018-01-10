using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Biblio.App.Startup))]
namespace Biblio.App
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
