using System;
using System.Collections.Generic;
using System.Text;
using RealEstateAuction.Localization;
using Volo.Abp.Application.Services;

namespace RealEstateAuction;

/* Inherit your application services from this class.
 */
public abstract class RealEstateAuctionAppService : ApplicationService
{
    protected RealEstateAuctionAppService()
    {
        LocalizationResource = typeof(RealEstateAuctionResource);
    }
}
