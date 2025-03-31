import { FaceBoundingBoxDto } from './face-bounding-box-dto';
import { PhotoDto } from './photo-dto';

export interface PhotoRecognitionDto extends PhotoDto {
  faceBoundingBox: FaceBoundingBoxDto;
}
