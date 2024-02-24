using Xunit;

namespace RealEstateAuction.EntityFrameworkCore;

[CollectionDefinition(RealEstateAuctionTestConsts.CollectionDefinitionName)]
public class RealEstateAuctionEntityFrameworkCoreCollection : ICollectionFixture<RealEstateAuctionEntityFrameworkCoreFixture>
{

}
