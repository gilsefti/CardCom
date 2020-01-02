using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Module
{
   public class ClientContext : DbContext
    {
       
        
            public ClientContext() : base("Clients")
            {
                Database.SetInitializer<ClientContext>(new DropCreateDatabaseIfModelChanges<ClientContext>());
            }

            public DbSet<Client> Clients { get; set; }
         
        }
    
}
