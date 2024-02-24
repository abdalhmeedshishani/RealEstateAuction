using Microsoft.AspNetCore.SignalR;
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
        public async Task NewNotification(string notification) =>
            await Clients.All.SendAsync("notificationReceived", _currentUser.UserName, notification);
    }
}
