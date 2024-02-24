using RealEstateAuction.Samples;
using Xunit;

namespace RealEstateAuction.EntityFrameworkCore.Domains;

[Collection(RealEstateAuctionTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<RealEstateAuctionEntityFrameworkCoreTestModule>
{

}
