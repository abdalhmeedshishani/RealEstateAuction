using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Security.Principal;
using System.Threading.Tasks;
using Volo.Abp.Users;

namespace RealEstateAuction.Hubs
{

    public class NotificationHub : Hub
    {

        /*    public async Task NewNotification(Guid id,string userName,string notification) =>
                await Clients.User(id.ToString()).SendAsync("notificationReceived", userName, notification);*/

        /*public async Task NewNotification(Guid userId, string notification) {
            var ls = Context.ConnectionId;
            await Clients.User(ls).SendAsync("notificationReceived", userId, notification);
          
           
            Console.WriteLine(ls);
        }*/

        /*public async Task NewNotification(string userId, string notification) {
            var l = Context.ConnectionId;

            await Clients.Client(userId).SendAsync("notificationReceived", notification);
        }*/

        #region Connection
        /// <summary>
        /// Use ConcurrentDictionary to save connected users's id and connectionId
        /// </summary>
        private static ConcurrentDictionary<string, List<string>>? ConnectedUsers = new ConcurrentDictionary<string, List<string>>();

        /// <summary>
        ///  OnConnectedAsync method
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        /// 
/*        public override async Task OnConnectedAsync()
        {

            string? userid = Context.User?.Identity?.Name;

            if (userid == null || userid.Equals(string.Empty))
            {
                Trace.TraceInformation("user not loged in, can't connect signalr service");
                return;
            }
            Trace.TraceInformation(userid + "connected");
            // save connection
            List<string>? existUserConnectionIds = null;
            ConnectedUsers?.TryGetValue(userid, out existUserConnectionIds);
            if (existUserConnectionIds == null)
            {
                existUserConnectionIds = new List<string>();
            }
            existUserConnectionIds.Add(Context.ConnectionId);
            ConnectedUsers?.TryAdd(userid, existUserConnectionIds);
            await base.OnConnectedAsync();
        }*/

        /// <summary>
        /// OnDisconnectedAsync
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        /*public override async Task OnDisconnectedAsync(Exception? exception)
        {
            string? userid = Context.User?.Identity?.Name;
            // save connection
            List<string>? existUserConnectionIds = new List<string>();

            ConnectedUsers?.TryGetValue(userid, out existUserConnectionIds);

            existUserConnectionIds?.Remove(Context.ConnectionId);

            if (existUserConnectionIds?.Count == 0)
            {
                List<string> garbage;
                ConnectedUsers?.TryRemove(userid, out garbage);
            }

            await base.OnDisconnectedAsync(exception);
        }*/
        #endregion

        #region Message

        public async Task NewNotification(string userid, string message)
        {
            List<string>? existUserConnectionIds = null;

            ConnectedUsers?.TryGetValue(userid, out existUserConnectionIds);

            if (existUserConnectionIds == null)
            {
                existUserConnectionIds = new List<string>();
            }
            existUserConnectionIds.Add(Context.ConnectionId);
            ConnectedUsers?.TryAdd(userid, existUserConnectionIds);
            

           var l =  Context.User?.Identity?.IsAuthenticated;
            l = true;
            string? fromUser = Context.User?.Identity?.Name;

            string? ToUser = userid;
            await Clients.Clients(existUserConnectionIds).SendAsync("ReceiveMessage_SpecificUser", ConnectedUsers[userid], ConnectedUsers[userid], message);
        }
        #endregion

    public async Task BidPrice(Guid id,decimal bidPrice) =>
            await Clients.All.SendAsync("bidPriceReceived", id , bidPrice);

        public async Task TestBidPrice(BidOffer bidOffer) =>
            await Clients.All.SendAsync("testBidPriceReceived", bidOffer.Id, bidOffer.BidPrice);
    }

    public class BidOffer
    {
        public Guid Id { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public List<decimal> BidPrice { get; set; }
    }
}
