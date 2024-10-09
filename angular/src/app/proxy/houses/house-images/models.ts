import type { UploaderImageDto } from '../../uploads/models';

export interface HouseImageDto extends UploaderImageDto {
  houseId?: string;
}
