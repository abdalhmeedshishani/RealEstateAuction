using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace RealEstateAuction;

[Dependency(ReplaceServices = true)]
public class RealEstateAuctionBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "RealEstateAuction";
}
