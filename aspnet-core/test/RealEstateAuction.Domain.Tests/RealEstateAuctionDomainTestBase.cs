using Volo.Abp.Modularity;

namespace RealEstateAuction;

/* Inherit from this class for your domain layer tests. */
public abstract class RealEstateAuctionDomainTestBase<TStartupModule> : RealEstateAuctionTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
