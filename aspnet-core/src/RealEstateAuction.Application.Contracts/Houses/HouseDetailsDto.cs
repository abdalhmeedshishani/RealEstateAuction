
using RealEstateAuction.Houses.HouseImages;
using RealEstateAuction.RealEstates;
using System;
using System.Collections.Generic;
using System.Text;

namespace RealEstateAuction.Houses
{
    public class HouseDetailsDto : RealEstateDto
    {          
        public int NumberOfBedrooms { get; set; }
        public int NumberOfBathrooms { get; set; }
        public bool HasGarage { get; set; }
        public int NumberOfFloors { get; set; }
        public bool HasBasement { get; set; }
        public bool HasSwimmingPool { get; set; }
        public bool HasFireplace { get; set; }
        public bool HasSecuritySystem { get; set; }
        public List<HouseImageDto> HouseImages { get; set; }

    }
}
