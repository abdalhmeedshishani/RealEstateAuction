using Volo.Abp.Modularity;

namespace RealEstateAuction;

[DependsOn(
    typeof(RealEstateAuctionDomainModule),
    typeof(RealEstateAuctionTestBaseModule)
)]
public class RealEstateAuctionDomainTestModule : AbpModule
{

}
