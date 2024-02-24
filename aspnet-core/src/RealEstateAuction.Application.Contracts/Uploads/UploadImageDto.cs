using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RealEstateAuction.Uploads
{
    public class UploaderImageDto : AuditedEntityDto<Guid>
    {
        public string Name { get; set; }
    }
}
