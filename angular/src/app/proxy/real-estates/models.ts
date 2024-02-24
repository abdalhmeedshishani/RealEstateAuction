import { AuditedEntityDto } from '@abp/ng.core';

export class RealEstateDto extends AuditedEntityDto<string> {
  name?: string;
  address?: string;
  sizeInSquareFeet: number;
  city?: string;
  state?: string;
  zipCode?: string;
  price: number;
  bidPrice: number;
  isForSale: boolean;
  description?: string;
}

// export interface RealEstateDto extends AuditedEntityDto<string> {
//   name?: string;
//   address?: string;
//   sizeInSquareFeet: number;
//   city?: string;
//   state?: string;
//   zipCode?: string;
//   price: number;
//   bidPrice: number;
//   isForSale: boolean;
//   description?: string;
// }
