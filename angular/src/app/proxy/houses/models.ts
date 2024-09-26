import { RealEstateDto } from '../real-estates/models';
import type { HouseImageDto } from './house-images/models';

export interface CreateUpdateHouseDto extends RealEstateDto {
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  hasGarage: boolean;
  numberOfFloors: number;
  hasBasement: boolean;
  hasSwimmingPool: boolean;
  hasFireplace: boolean;
  hasSecuritySystem: boolean;
  houseImages: HouseImageDto[];
}

export class HouseDetailsDto extends RealEstateDto {
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  hasGarage: boolean;
  numberOfFloors: number;
  hasBasement: boolean;
  hasSwimmingPool: boolean;
  hasFireplace: boolean;
  hasSecuritySystem: boolean;
  houseImages: HouseImageDto[] = [];
}

export class HouseDto extends RealEstateDto {
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  numberOfFloors: number;
  houseImages: HouseImageDto[] = [];
}

export class BidOffer {
  id: string;
  bidPrice: number[] = [];
}

// export interface HouseDetailsDto extends RealEstateDto {
//   numberOfBedrooms: number;
//   numberOfBathrooms: number;
//   hasGarage: boolean;
//   numberOfFloors: number;
//   hasBasement: boolean;
//   hasSwimmingPool: boolean;
//   hasFireplace: boolean;
//   hasSecuritySystem: boolean;
//   houseImages: HouseImagesDtos[];
// }

// export interface HouseDto extends RealEstateDto {
//   numberOfBedrooms: number;
//   numberOfBathrooms: number;
//   numberOfFloors: number;
// }
