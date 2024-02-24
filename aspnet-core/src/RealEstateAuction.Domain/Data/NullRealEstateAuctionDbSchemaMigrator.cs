using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace RealEstateAuction.Data;

/* This is used if database provider does't define
 * IRealEstateAuctionDbSchemaMigrator implementation.
 */
public class NullRealEstateAuctionDbSchemaMigrator : IRealEstateAuctionDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
