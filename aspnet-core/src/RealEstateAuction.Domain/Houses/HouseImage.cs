using RealEstateAuction.UploaderImages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstateAuction.Houses
{
    public class HouseImage : UploaderImage
    {
        public Guid HouseId { get; set; }

    }
}
