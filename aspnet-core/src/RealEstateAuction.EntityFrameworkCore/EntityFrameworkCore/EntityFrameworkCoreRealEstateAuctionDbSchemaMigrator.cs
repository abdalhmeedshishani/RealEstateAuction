using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RealEstateAuction.Data;
using Volo.Abp.DependencyInjection;

namespace RealEstateAuction.EntityFrameworkCore;

public class EntityFrameworkCoreRealEstateAuctionDbSchemaMigrator
    : IRealEstateAuctionDbSchemaMigrator, ITransientDependency
{
    private readonly IServiceProvider _serviceProvider;

    public EntityFrameworkCoreRealEstateAuctionDbSchemaMigrator(
        IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task MigrateAsync()
    {
        /* We intentionally resolve the RealEstateAuctionDbContext
         * from IServiceProvider (instead of directly injecting it)
         * to properly get the connection string of the current tenant in the
         * current scope.
         */

        await _serviceProvider
            .GetRequiredService<RealEstateAuctionDbContext>()
            .Database
            .MigrateAsync();
    }
}
