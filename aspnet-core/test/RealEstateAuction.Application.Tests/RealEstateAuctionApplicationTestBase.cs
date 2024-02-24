using Volo.Abp.Modularity;

namespace RealEstateAuction;

public abstract class RealEstateAuctionApplicationTestBase<TStartupModule> : RealEstateAuctionTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
