using Microsoft.Extensions.Options;
using RealEstateAuction.Uploads.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Content;

namespace RealEstateAuction.Uploads
{
    public class UploadAppService : RealEstateAuctionAppService, IUploadAppService
    {
        public readonly string _pathToSave;
        public UploadAppService(IOptions<UploaderConfig> _imageUploaderConfig)
        {
            _pathToSave = $"{Directory.GetCurrentDirectory()}{_imageUploaderConfig.Value.FolderName}";
        }

        public Task<IRemoteStreamContent> Download(Guid id)
        {
            var fs = new FileStream("C:\\Temp\\" + id + ".blob", FileMode.OpenOrCreate);
            return Task.FromResult(
                (IRemoteStreamContent)new RemoteStreamContent(fs)
                {

                }
            );
        }




        public async Task<List<UploaderImageDto>> Upload(IRemoteStreamContent[] files)
        {
            var imagesNames = new List<string>();
            foreach (var file in files)
            {

                string imageType = Path.GetExtension(file.FileName);

                Stream fs = file.GetStream();
                var id = Guid.NewGuid();
                var filePath = $"C:\\Users\\Abdelhammed\\source\\repos\\RealEstateAuction\\aspnet-core\\src\\RealEstateAuction.HttpApi.Host\\wwwroot\\images\\" + id.ToString() + imageType;
                using var stream = new FileStream(filePath, FileMode.Create);
                await fs.CopyToAsync(stream);
                var imageName = GetFileName(file, id);
                imagesNames.Add(imageName);

            }
            return GetHouseImages(imagesNames);
        }

        /*    public async Task<List<UploaderImageDto>> Upload(IRemoteStreamContent[] files)
            {
                var tasks = new List<Task<string>>();

                foreach (var file in files)
                {
                    tasks.Add(ProcessFileAsync(file));
                }

                await Task.WhenAll(tasks);

                var imagesNames = tasks.Select(task => task.Result).ToList();

                return GetHouseImages(imagesNames, new Guid());
            }*/

        public async Task CreateFile(CreateFileInput input)
        {
            using (var fs = new FileStream("C:\\Temp\\" + input.Id + ".blob", FileMode.Create))
            {
                await input.Content.GetStream().CopyToAsync(fs);
                await fs.FlushAsync();
            }
        }

        public async Task CreateMultipleFile(CreateMultipleFileInput input)
        {
            using (var fs = new FileStream("C:\\Temp\\" + input.Id + ".blob", FileMode.Append))
            {
                foreach (var content in input.Contents)
                {
                    await content.GetStream().CopyToAsync(fs);
                }
                await fs.FlushAsync();
            }
        }

        #region Private Methods

        private string GetFileName(IRemoteStreamContent file, Guid id)
        {
            var myFileName = file.FileName;

            var fileExt = Path.GetExtension(myFileName);

            return $"{id}{fileExt}";
        }

        private List<UploaderImageDto> GetHouseImages(List<string> imagesNames)
        {
            var imagesNamesDtos = new List<UploaderImageDto>();

            foreach (var imageName in imagesNames)
            {
                var guestImage = new UploaderImageDto();
                //guestImage.Id.ToString(imageName);
                guestImage.Name = imageName;


                imagesNamesDtos.Add(guestImage);
            }

            return imagesNamesDtos;
        }

        private async Task<string> ProcessFileAsync(IRemoteStreamContent file)
        {
            using var fs = file.GetStream();
            var id = Guid.NewGuid();
            var filePath = $"C:\\Users\\Abdelhammed\\source\\repos\\RealEstateAuction\\aspnet-core\\src\\RealEstateAuction.HttpApi.Host\\Resources\\Images\\" + id.ToString() + ".png";

            using var stream = new FileStream(filePath, FileMode.Create);
            await fs.CopyToAsync(stream);

            return GetFileName(file, id);
        }

        #endregion
    }
}


