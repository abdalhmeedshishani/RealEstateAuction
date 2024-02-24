using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RealEstateAuction.Houses
{
    public interface IHouseAppService :
    ICrudAppService< 
        HouseDto, 
        Guid, 
        PagedAndSortedResultRequestDto, 
        CreateUpdateHouseDto> 
    {
    }
}
