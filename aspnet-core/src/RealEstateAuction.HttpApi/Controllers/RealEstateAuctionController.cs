using RealEstateAuction.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace RealEstateAuction.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class RealEstateAuctionController : AbpControllerBase
{
    protected RealEstateAuctionController()
    {
        LocalizationResource = typeof(RealEstateAuctionResource);
    }
}
