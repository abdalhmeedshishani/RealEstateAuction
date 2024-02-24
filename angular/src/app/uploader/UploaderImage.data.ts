import { AuditedEntityDto } from '@abp/ng.core';

export interface Uploader extends AuditedEntityDto<string> {
  name: string;
}
