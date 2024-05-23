using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstateAuction.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Linq;
using Volo.Abp.Users;
using static Volo.Abp.Identity.Settings.IdentitySettingNames;

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
        private readonly IAsyncQueryableExecuter _asyncQueryableExecuter;
        private readonly ICurrentUser _currentUser;

        public HouseAppService(IRepository<House, Guid> houseRepository, IRepository<HouseImage, Guid> houseImageRepository,
            IAsyncQueryableExecuter asyncQueryableExecuter, ICurrentUser currentUser)
       : base(houseRepository)
        {
            _houseRepository = houseRepository;
            _houseImageRepository = houseImageRepository;
            _asyncQueryableExecuter = asyncQueryableExecuter;
            _currentUser = currentUser;
            GetPolicyName = RealEstateAuctionPermissions.RealEstates.Default;
            //GetListPolicyName = RealEstateAuctionPermissions.RealEstates.Default;
            CreatePolicyName = RealEstateAuctionPermissions.RealEstates.Create;
            UpdatePolicyName = RealEstateAuctionPermissions.RealEstates.Edit;
            DeletePolicyName = RealEstateAuctionPermissions.RealEstates.Delete;
        }

        public async Task BidPrice(Guid id,[FromBody] decimal bidPrice)
        {
            var house = await _houseRepository.GetAsync(id);
            house.BidPrice = bidPrice;
            await Repository.UpdateAsync(house, autoSave: true);
        }

        public async Task<HouseDetailsDto> GetDetails(Guid id)
        {
            var queryAbleHouse = await _houseRepository.WithDetailsAsync(x => x.HouseImages);
            
            var houses = queryAbleHouse.Where(x => x.Id == id);
            var l = await _asyncQueryableExecuter.SingleAsync(houses);

            var houseDto = ObjectMapper.Map<House, HouseDetailsDto>(l);
            return houseDto;

        }

        public override Task<HouseDto> UpdateAsync(Guid id, CreateUpdateHouseDto input)
        {
            if (_currentUser.Id != input.CreatorId)
            {
                new NotFoundResult();
            }

            return base.UpdateAsync(id, input);
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

    }
}
