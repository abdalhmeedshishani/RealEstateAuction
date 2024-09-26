import type { CreateUpdateHouseDto, HouseDetailsDto, HouseDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  apiName = 'Default';

  connection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:44381/hub')
    .build();

  bidPrice = (id: string, bidPrice: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, any>(
      {
        method: 'POST',
        url: `/api/app/house/${id}/bid-price`,
        body: bidPrice,
      },
      { apiName: this.apiName, ...config }
    );

  create = (input: CreateUpdateHouseDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HouseDto>(
      {
        method: 'POST',
        url: '/api/app/house',
        body: input,
      },
      { apiName: this.apiName, ...config }
    );

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>(
      {
        method: 'DELETE',
        url: `/api/app/house/${id}`,
      },
      { apiName: this.apiName, ...config }
    );

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HouseDto>(
      {
        method: 'GET',
        url: `/api/app/house/${id}`,
      },
      { apiName: this.apiName, ...config }
    );

  getDetails = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HouseDetailsDto>(
      {
        method: 'GET',
        url: `/api/app/house/${id}/details`,
      },
      { apiName: this.apiName, ...config }
    );

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<HouseDto>>(
      {
        method: 'GET',
        url: '/api/app/house',
        params: {
          sorting: input.sorting,
          skipCount: input.skipCount,
          maxResultCount: input.maxResultCount,
        },
      },
      { apiName: this.apiName, ...config }
    );

  update = (id: string, input: CreateUpdateHouseDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HouseDto>(
      {
        method: 'PUT',
        url: `/api/app/house/${id}`,
        body: input,
      },
      { apiName: this.apiName, ...config }
    );
  messages: string[] = [];
  bids: number[] = [];
  selectedId: string[] = [];
  notification: string;

  send(m: string, notification: string) {
    this.connection.send('NewNotification', m, notification);
  }

  realTimeBidPrice(id: string, bidPrice: number) {
    this.connection.send('BidPrice', id, bidPrice);
  }

  constructor(private restService: RestService) {
    // this.connection.onclose(async () => {
    //   await this.connection.start();
    // });
    this.connection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
    this.connection.on('notificationReceived', (messageHere: string) => {
      const newMessage = ` ${messageHere}`;
      this.messages.push(newMessage);
    });
    this.connection.on('bidPriceReceived', (id: string, messageHere: number) => {
      const newMessage = messageHere;
      this.selectedId.push(id);
      this.bids.push(newMessage);
    });
  }
}
