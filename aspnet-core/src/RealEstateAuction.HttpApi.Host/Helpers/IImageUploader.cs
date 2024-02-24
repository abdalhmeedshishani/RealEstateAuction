using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace RealEstateAuction.Helpers
{
    public interface IImageUploader
    {
        public List<string> Upload(IFormFile[] files);
    }
}
