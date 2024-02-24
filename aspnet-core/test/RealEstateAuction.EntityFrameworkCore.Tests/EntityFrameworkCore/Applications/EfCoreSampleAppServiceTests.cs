using RealEstateAuction.Samples;
using Xunit;

namespace RealEstateAuction.EntityFrameworkCore.Applications;

[Collection(RealEstateAuctionTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<RealEstateAuctionEntityFrameworkCoreTestModule>
{

}
