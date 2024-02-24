using Volo.Abp.Modularity;

namespace RealEstateAuction;

[DependsOn(
    typeof(RealEstateAuctionApplicationModule),
    typeof(RealEstateAuctionDomainTestModule)
)]
public class RealEstateAuctionApplicationTestModule : AbpModule
{

}
