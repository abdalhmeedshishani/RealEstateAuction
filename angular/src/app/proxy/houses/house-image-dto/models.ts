import type { UploaderImageDto } from '../../uploads/models';

export interface HouseImagesDtos extends UploaderImageDto {
  houseId?: string;
}
