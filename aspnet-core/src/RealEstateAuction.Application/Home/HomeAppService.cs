using RealEstateAuction.Houses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Linq;

namespace RealEstateAuction.Home
{
    public class HomeAppService : RealEstateAuctionAppService
    {
        private readonly IRepository<House, Guid> _houseRepository;
        private readonly IAsyncQueryableExecuter _asyncQueryableExecuter;

        public HomeAppService(IRepository<House, Guid> houseRepository, IAsyncQueryableExecuter asyncQueryableExecuter)
        {
            _houseRepository = houseRepository;
            _asyncQueryableExecuter = asyncQueryableExecuter;
        }

        public async Task<List<House>> GetTop3HighestBidRealEstate()
        {
            var houseQuery = await _houseRepository.GetQueryableAsync();

            var top3BidPrices = houseQuery.OrderByDescending(d => d.Price).Take(3);
            //GetTop3Prices(1,null,null,null);
            
            return await _asyncQueryableExecuter.ToListAsync(top3BidPrices);
        }

        private static List<int?> GetTop3Prices(int? landPrice, int? housePrice, int? restaurantPrice, int? coffeeshopPrice)
        {
            // Validate input prices
            if (landPrice < 0 || housePrice < 0 || restaurantPrice < 0 || coffeeshopPrice < 0)
            {
                throw new ArgumentException("Prices must be non-negative.");
            }

            // Store prices in a list
            var prices = new List<int?> { landPrice, housePrice, restaurantPrice, coffeeshopPrice };

            // Sort prices in descending order
            var sortedPrices = prices.OrderByDescending(price => price).ToList();

            // Get the top 3 prices
            var top3Prices = sortedPrices.Take(3).ToList();

            // Check if landPrice is the 4th highest
            if (sortedPrices.Count > 3 && sortedPrices[3] == landPrice)
            {
                // Find the lowest price in the top 3
                var minTop3Price = top3Prices.Min();

                // Replace the lowest price in the top 3 with landPrice if landPrice is higher
                if (landPrice > minTop3Price)
                {
                    top3Prices.Remove(minTop3Price);
                    top3Prices.Add(landPrice);
                }
            }

            // Sort the final top 3 prices in descending order again if necessary
            top3Prices = top3Prices.OrderByDescending(price => price).ToList();

            return top3Prices;
        }
    }
}

