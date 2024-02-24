using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Content;

namespace RealEstateAuction.Uploads
{
    public class CreateFileInput
    {
        public Guid Id { get; set; }

        public IRemoteStreamContent Content { get; set; }
    }
}
