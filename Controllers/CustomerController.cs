using AngualrJSWebAPIApp.Models;
using AutoMapper;
using Raven.Client;
using Raven.Client.Document;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngualrJSWebAPIApp
{
    public class CustomerController : ApiController
    {
        private readonly IDocumentStore ravenDB;

        public CustomerController()
        {
             ravenDB = new DocumentStore {
                 ConnectionStringName = "Raven"
            };
            ravenDB.Initialize();
        }

        // GET api/<controller>
        public IEnumerable<Customer> Get()
        {
            using (var session = ravenDB.OpenSession())
            {
                return session.Query<Customer>();
            }
        }

       // POST api/<controller>
        public void Post([FromBody]Customer customer)
        {
            using (var session = ravenDB.OpenSession())
            {
                session.Store(customer, "Customers/" + customer.id);
                session.SaveChanges();
            }
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]Customer customer)
        {
            using (var session = ravenDB.OpenSession())
            {
                var doc = session.Load<Customer>("Customers/" + customer.id);
                Mapper.CreateMap<Customer, Customer>(); //must be done once in app?
                Mapper.Map<Customer, Customer>(customer, doc); //raven will pick up changes
                session.SaveChanges();
               
            }
        }

        // DELETE api/<controller>/5
        public void Delete(string id)
        {
            using (var session = ravenDB.OpenSession())
            {
                var doc = session.Load<Customer>("Customers/" + id);
                session.Delete<Customer>(doc);
                session.SaveChanges();

            }
        }
    }
}