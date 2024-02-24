using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace RealEstateAuction.EntityFrameworkCore;

/* This class is needed for EF Core console commands
 * (like Add-Migration and Update-Database commands) */
public class RealEstateAuctionDbContextFactory : IDesignTimeDbContextFactory<RealEstateAuctionDbContext>
{
    public RealEstateAuctionDbContext CreateDbContext(string[] args)
    {
        RealEstateAuctionEfCoreEntityExtensionMappings.Configure();

        var configuration = BuildConfiguration();

        var builder = new DbContextOptionsBuilder<RealEstateAuctionDbContext>()
            .UseSqlServer(configuration.GetConnectionString("Default"));

        return new RealEstateAuctionDbContext(builder.Options);
    }

    private static IConfigurationRoot BuildConfiguration()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../RealEstateAuction.DbMigrator/"))
            .AddJsonFile("appsettings.json", optional: false);

        return builder.Build();
    }
}
