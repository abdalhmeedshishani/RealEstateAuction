import { UploaderMode, UploaderStyle, UploaderType } from './uploaderMode.enum';

export class UploaderConfig {
  style: UploaderStyle;
  mode: UploaderMode;
  type: UploaderType;

  constructor(style: UploaderStyle, mode: UploaderMode, type: UploaderType) {
    this.style = style;
    this.mode = mode;
    this.type = type;
  }
}
