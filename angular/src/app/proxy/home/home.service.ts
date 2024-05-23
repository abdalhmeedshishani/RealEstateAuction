import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { House } from '../houses/models';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  apiName = 'Default';
  

  get = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, number>({
      method: 'GET',
      url: '/api/app/home',
    },
    { apiName: this.apiName,...config });
  

  getTop3HighestBidRealEstate = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, House[]>({
      method: 'GET',
      url: '/api/app/home/top3Highest-bid-real-estate',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
