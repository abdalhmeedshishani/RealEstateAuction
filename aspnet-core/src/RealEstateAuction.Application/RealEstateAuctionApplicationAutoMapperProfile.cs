using AutoMapper;
using RealEstateAuction.Houses;
using RealEstateAuction.Houses.HouseImages;

namespace RealEstateAuction;

public class RealEstateAuctionApplicationAutoMapperProfile : Profile
{
    public RealEstateAuctionApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */
        CreateMap<House, HouseDto>();
        CreateMap<CreateUpdateHouseDto, House>().ForMember(dest => dest.HouseImages, opt => opt.MapFrom(src => src.HouseImages)); ;
        CreateMap<House, HouseDetailsDto>().ForMember(dest => dest.HouseImages, opt => opt.MapFrom(src => src.HouseImages));
        CreateMap<HouseImageDto, HouseImage>();
        CreateMap<HouseImage, HouseImageDto>();
    }
}
