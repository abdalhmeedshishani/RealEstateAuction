using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;
using Volo.Abp.Users;

namespace RealEstateAuction.Hubs
{
    public class NotificationHub : Hub
    {

        private readonly ICurrentUser _currentUser;

        public NotificationHub(ICurrentUser currentUser)
        {
            _currentUser = currentUser;
        }
        /*    public async Task NewNotification(Guid id,string userName,string notification) =>
                await Clients.User(id.ToString()).SendAsync("notificationReceived", userName, notification);*/

        public async Task NewNotification(string notification) =>
            await Clients.All.SendAsync("notificationReceived", _currentUser.UserName, notification);

       /* public async Task BidPrice(decimal bidPrice) =>
            await Clients.All.SendAsync("bidPriceReceived", bidPrice);*/

        public async Task TestBidPrice(BidOffer bidOffer) =>
            await Clients.All.SendAsync("testBidPriceReceived", bidOffer.Id, bidOffer.BidPrice);
    }

    public class BidOffer
    {
        public Guid Id { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public List<decimal> BidPrice { get; set; }
    }

    public class Test
    {
        public void Car()
        {
          Car car = new Car();

          car.Id = 1;
          car.Name = "Test";

            
            Console.WriteLine(car.Name);
        }
        
    }

    public class Car
    {
        public Car()
        {
            Id = 1;
            Name = "Test";
        }

        public int Id { get; set; }
        public string Name { get; set; }

    }
}
