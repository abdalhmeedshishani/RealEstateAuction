import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'RealEstateAuction',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44381/',
    redirectUri: baseUrl,
    clientId: 'RealEstateAuction_App',
    responseType: 'code',
    scope: 'offline_access RealEstateAuction',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44381',
      rootNamespace: 'RealEstateAuction',
    },
  },
  uploadUrl: 'https://localhost:44381/api/app/upload/upload',
  imgStorageUrl: 'https://localhost:44381/wwwroot/images',
} as Environment;
