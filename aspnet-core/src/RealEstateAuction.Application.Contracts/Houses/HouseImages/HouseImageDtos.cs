using RealEstateAuction.Uploads;
using System;
using System.Collections.Generic;
using System.Text;

namespace RealEstateAuction.Houses.HouseImageDto
{
    public class HouseImageDto : UploaderImageDto
    {
        public Guid HouseId { get; set; }
    }
}
