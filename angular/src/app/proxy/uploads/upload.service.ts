import type { CreateFileInput, CreateMultipleFileInput, UploaderImageDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  apiName = 'Default';
  

  createFileByInput = (input: CreateFileInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/upload/file',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  createMultipleFileByInput = (input: CreateMultipleFileInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/upload/multiple-file',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  downloadById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, Blob>({
      method: 'POST',
      responseType: 'blob',
      url: `/api/app/upload/${id}/download`,
    },
    { apiName: this.apiName,...config });
  

  uploadByFiles = (files: FormData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UploaderImageDto[]>({
      method: 'POST',
      url: '/api/app/upload/upload',
      body: files,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
