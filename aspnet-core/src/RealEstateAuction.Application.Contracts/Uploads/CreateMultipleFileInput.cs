using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Content;

namespace RealEstateAuction.Uploads
{
    public class CreateMultipleFileInput
    {
        public Guid Id { get; set; }

        public IEnumerable<IRemoteStreamContent> Contents { get; set; }
    }
}
