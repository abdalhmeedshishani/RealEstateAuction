using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RealEstateAuction.RealEstates
{
    public class RealEstateDto : AuditedEntityDto<Guid>
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public double SizeInSquareFeet { get; set; }

        // Location Information
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }

        // Financial Information
        [Column(TypeName = "decimal(18,4)")]
        public decimal Price { get; set; }
        [Column(TypeName = "decimal(18,4)")]
        public decimal BidPrice { get; set; }
        public bool IsForSale { get; set; }

        // Additional Details
        public string Description { get; set; }
    }
}
