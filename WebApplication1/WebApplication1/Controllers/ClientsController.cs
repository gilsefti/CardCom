using Module;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApplication1.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ClientsController : ApiController
    {

        // GET api/values
        public IEnumerable<Client> Get()
        {
            ClientContext clientContext = new ClientContext();
            List<Client> clients = clientContext.Clients.ToList();
            // return new string[] { "value1", "value2" };
            return clients;
        }
        public HttpResponseMessage Post([FromBody]object value)
        {
            try
            {


                ClientContext clientContext = new ClientContext();
                JObject jObject = JObject.Parse(value.ToString());
                JToken jUser = jObject["client"];
                var userId = jUser["ID"];
                Client clientToDb;
                if (userId == null)
                {
                    clientToDb = new Client();
                    clientContext.Clients.Add(clientToDb);
                }
                else
                {
                    int id = (int)jUser["ID"];
                    clientToDb = clientContext.Clients.SingleOrDefault(mClient => mClient.ID == id);
                }

                clientToDb.IDC = (string)jUser["IDC"];
                if (!isNumber(clientToDb.IDC))
                    return Request.CreateResponse<string>(HttpStatusCode.BadRequest,"ID is number");
                clientToDb.Name = (string)jUser["Name"];
                clientToDb.Email = (string)jUser["Email"];
                if (clientToDb.Email != null && clientToDb.Email.ToString() != "")
                    if (!IsValidEmail(clientToDb.Email))
                        return Request.CreateResponse<string>(HttpStatusCode.BadRequest, "Wrong email"); ;

                clientToDb.BirthDate = (DateTime)jUser["BirthDate"];
                clientToDb.Gender = (string)jUser["Gender"];
                clientToDb.Phone = (string)jUser["Phone"];
                if (!isNumber(clientToDb.Phone))
                    return Request.CreateResponse<string>(HttpStatusCode.BadRequest, "Phone is  number"); 
                clientContext.SaveChanges();
                return Request.CreateResponse<string>(HttpStatusCode.OK, "save succeded");
            }
            catch (Exception ex)
            {
                return Request.CreateResponse<string>(HttpStatusCode.BadRequest, "Proccessing error");
            }
        }
        bool isNumber(string str) {
            try
            {
                if (str!= null && str != "")
                    Convert.ToInt32(str.ToString());
                return true;
            }
            catch (Exception)
            {
                return false;
            }
          
        }
        bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return true;
            }
            catch
            {
                return false;
            }
        }
        // DELETE api/values/5
        public void Delete(int id)
        {
            ClientContext clientContext = new ClientContext();
            Client clientToDelete = clientContext.Clients.SingleOrDefault(mClient => mClient.ID == id);
            clientContext.Clients.Remove(clientToDelete);
            clientContext.SaveChanges();
        }
    }
}
