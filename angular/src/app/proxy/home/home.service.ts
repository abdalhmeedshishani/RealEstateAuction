import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  apiName = 'Default';

  getTopThreeHighestBidRealEstate = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, any[]>(
      {
        method: 'GET',
        url: '/api/app/home/top-three-highest-bid-real-estate',
      },
      { apiName: this.apiName, ...config }
    );

  constructor(private restService: RestService) {}
}
