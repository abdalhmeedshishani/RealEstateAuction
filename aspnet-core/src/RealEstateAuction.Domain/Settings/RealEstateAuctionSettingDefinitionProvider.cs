using Volo.Abp.Settings;

namespace RealEstateAuction.Settings;

public class RealEstateAuctionSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(RealEstateAuctionSettings.MySetting1));
    }
}
