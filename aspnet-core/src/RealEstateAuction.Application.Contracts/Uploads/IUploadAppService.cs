using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Content;

namespace RealEstateAuction.Uploads
{
    public interface IUploadAppService : IApplicationService
    {
        Task<List<UploaderImageDto>> Upload( IRemoteStreamContent[] file);
        Task<IRemoteStreamContent> Download(Guid id);

        Task CreateFile(CreateFileInput input);
        Task CreateMultipleFile(CreateMultipleFileInput input);
    }

    

   
}
