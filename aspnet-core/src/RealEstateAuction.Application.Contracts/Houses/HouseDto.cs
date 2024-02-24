
using RealEstateAuction.Houses.HouseImages;
using RealEstateAuction.RealEstates;
using RealEstateAuction.Uploads;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RealEstateAuction.Houses
{
    public class HouseDto : RealEstateDto
    {
        public int NumberOfBedrooms { get; set; }
        public int NumberOfBathrooms { get; set; }
        public int NumberOfFloors { get; set; }
        public List<HouseImageDto> HouseImages { get; set; }

    }
}

