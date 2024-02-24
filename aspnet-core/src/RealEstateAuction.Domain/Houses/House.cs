using RealEstateAuction.RealEstates;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstateAuction.Houses
{
    public class House : RealEstate
    {

        public House()
        {
            HouseImages = new List<HouseImage>();
        }

        public int NumberOfBedrooms { get; set; }
        public int NumberOfBathrooms { get; set; }
        public bool HasGarage { get; set; }
        public int NumberOfFloors { get; set; }
        public bool HasBasement { get; set; }
        public bool HasSwimmingPool { get; set; }
        public bool HasFireplace { get; set; }
        public bool HasSecuritySystem { get; set; }
        public List<HouseImage> HouseImages { get; set;}
    }
}
