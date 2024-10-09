import type { AuditedAggregateRoot } from '../volo/abp/domain/entities/auditing/models';

export interface UploaderImage extends AuditedAggregateRoot<string> {
  name?: string;
}
