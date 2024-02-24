using RealEstateAuction.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace RealEstateAuction.Permissions;

public class RealEstateAuctionPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var RealEstateAuctionGroup = context.AddGroup(RealEstateAuctionPermissions.GroupName);
        //Define your own permissions here
        var RealEstatesPermission = RealEstateAuctionGroup.AddPermission(RealEstateAuctionPermissions.RealEstates.Default, L("Permission:RealEstates"));
        RealEstatesPermission.AddChild(RealEstateAuctionPermissions.RealEstates.Create, L("Permission:RealEstates.Create"));
        RealEstatesPermission.AddChild(RealEstateAuctionPermissions.RealEstates.Edit, L("Permission:RealEstates.Edit"));
        RealEstatesPermission.AddChild(RealEstateAuctionPermissions.RealEstates.Delete, L("Permission:RealEstates.Delete"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<RealEstateAuctionResource>(name);
    }
}
