using Microsoft.AspNetCore.Authorization;
using RealEstateAuction.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Users;

namespace RealEstateAuction.Houses
{
    public class HouseAppService :
   CrudAppService<
       House, 
       HouseDto, 
       Guid, 
       PagedAndSortedResultRequestDto,
       CreateUpdateHouseDto>, 
       IHouseAppService 
    {
        private readonly IRepository<House, Guid> _houseRepository;
        private readonly IRepository<HouseImage, Guid> _houseImageRepository;

        public HouseAppService(IRepository<House, Guid> houseRepository, IRepository<HouseImage, Guid> houseImageRepository)
       : base(houseRepository)
        {
            _houseRepository = houseRepository;
            _houseImageRepository = houseImageRepository;
            GetPolicyName = RealEstateAuctionPermissions.RealEstates.Default;
            //GetListPolicyName = RealEstateAuctionPermissions.RealEstates.Default;
            CreatePolicyName = RealEstateAuctionPermissions.RealEstates.Create;
            UpdatePolicyName = RealEstateAuctionPermissions.RealEstates.Edit;
            DeletePolicyName = RealEstateAuctionPermissions.RealEstates.Delete;
        }


        public override Task<HouseDto> CreateAsync(CreateUpdateHouseDto input)
        {
            
            return base.CreateAsync(input);
        }
        [AllowAnonymous]
        public override async Task<PagedResultDto<HouseDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            
            string filter = "";

            if (input.Sorting.IsNullOrWhiteSpace())
            {
                input.Sorting = nameof(House.Name);
            }

            var house = await _houseRepository.WithDetailsAsync(x => x.HouseImages);
            var houses = house.ToList();
            
            var totalCount = filter == null
                ? await _houseRepository.CountAsync()
                : await _houseRepository.CountAsync(
                    author => author.Name.Contains(filter));

            return new PagedResultDto<HouseDto>(
                totalCount,
                ObjectMapper.Map<List<House>, List<HouseDto>>(houses)
            );

            //return base.GetListAsync(input);
        }
        public async Task<HouseDetailsDto> GetDetailsAsync(Guid id)
        {
            var house = await _houseRepository.WithDetailsAsync(x => x.HouseImages);
            var houses = house.Where(x => x.Id == id ).Single();

            var houseDto = ObjectMapper.Map<House, HouseDetailsDto>(houses);
            return houseDto;
        }

    }
}
