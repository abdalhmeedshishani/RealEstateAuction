using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RealEstateAuction.Home
{
    public class HomeDto : AuditedEntityDto<Guid>
    {

        public int MyProperty { get; set; }
    }
}
