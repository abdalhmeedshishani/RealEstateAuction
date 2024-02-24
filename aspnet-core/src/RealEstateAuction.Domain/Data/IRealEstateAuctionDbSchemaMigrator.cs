using System.Threading.Tasks;

namespace RealEstateAuction.Data;

public interface IRealEstateAuctionDbSchemaMigrator
{
    Task MigrateAsync();
}
