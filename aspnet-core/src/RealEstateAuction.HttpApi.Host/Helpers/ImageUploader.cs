using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using RealEstateAuction.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;

namespace RealEstateAuction.Helpers
{
    public class ImageUploader : IImageUploader
    {

        #region Constructor and Data Memebers

        public readonly string _pathToSave;

        public ImageUploader(IOptions<ImageUploaderConfig> _imageUploaderConfig)
        {
            _pathToSave = $"{Directory.GetCurrentDirectory()}{_imageUploaderConfig.Value.FolderName}";
        }

        #endregion

        public List<string> Upload(IFormFile[] files)
        {
            var filesNames = new List<string>();

            // TODO 
            //if(UploadFolderDoesNotExist)
            //{
            //    CreateUploaderImagesFolder();
            //}

            foreach (var file in files)
            {
                string fileName = GetFileName(file);
                filesNames.Add(fileName);

                var fullPath = Path.Combine(_pathToSave, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

            }

            return filesNames;
        }

        #region Private Methods

        private string GetFileName(IFormFile file)
        {
            var myFileName = file.FileName;
            var fileExt = Path.GetExtension(myFileName);

            return $"{Guid.NewGuid()}{fileExt}";
        }

        #endregion
    }
}
