namespace RealEstateAuction.Permissions;

public static class RealEstateAuctionPermissions
{
    public const string GroupName = "RealEstateAuction";

    //Add your own permission names. Example:
    //public const string MyPermission1 = GroupName + ".MyPermission1";
    public static class RealEstates
    {
        public const string Default = GroupName + ".RealEstates";
        public const string Create = Default + ".Create";
        public const string Edit = Default + ".Edit";
        public const string Delete = Default + ".Delete";
    }
}
