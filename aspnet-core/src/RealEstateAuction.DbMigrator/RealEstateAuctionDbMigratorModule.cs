using RealEstateAuction.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace RealEstateAuction.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(RealEstateAuctionEntityFrameworkCoreModule),
    typeof(RealEstateAuctionApplicationContractsModule)
    )]
public class RealEstateAuctionDbMigratorModule : AbpModule
{
}
