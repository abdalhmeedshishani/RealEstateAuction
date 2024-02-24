import type { IRemoteStreamContent } from '../volo/abp/content/models';
import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateFileInput {
  id?: string;
  content: IRemoteStreamContent;
}

export interface CreateMultipleFileInput {
  id?: string;
  contents: IRemoteStreamContent[];
}

export interface UploaderImageDto extends AuditedEntityDto<string> {
  name?: string;
}
