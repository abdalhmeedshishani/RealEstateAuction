import { RealEstateDto } from '../real-estates/models';
import type { HouseImagesDtos } from './house-image-dto/models';

export interface CreateUpdateHouseDto extends RealEstateDto {
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  hasGarage: boolean;
  numberOfFloors: number;
  hasBasement: boolean;
  hasSwimmingPool: boolean;
  hasFireplace: boolean;
  hasSecuritySystem: boolean;
  houseImages: HouseImagesDtos[];
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
  houseImages: HouseImagesDtos[] = [];
}

export class HouseDto extends RealEstateDto {
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  numberOfFloors: number;
  houseImages: HouseImagesDtos[] = [];
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
