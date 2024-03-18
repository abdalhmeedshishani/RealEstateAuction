import type { BidOffer, CreateUpdateHouseDto, HouseDetailsDto, HouseDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  apiName = 'Default';

  connection = new signalR.HubConnectionBuilder().withUrl('https://localhost:44381/hub').build();

  bidPrice = (id: string, bidPrice: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, any>(
      {
        method: 'POST',
        url: `/api/app/house/${id}/bid-price`,
        body: bidPrice,
      },
      { apiName: this.apiName, ...config }
    );

  // testBidPrice = (bid: BidOffer, config?: Partial<Rest.Config>) =>
  //   this.restService.request<any, any>(
  //     {
  //       method: 'POST',
  //       url: `/api/app/house/test-bid-price`,
  //       body: bid,
  //     },
  //     { apiName: this.apiName, ...config }
  //   );

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
  testBids: BidOffer[] = [];

  send(m: string) {
    this.connection.send('NewNotification', m);
  }

  realTimeBidPrice(bidPrice: number) {
    this.connection.send('BidPrice', bidPrice);
  }

  testRealTimeBidPrice(bid: BidOffer) {
    this.connection.send('TestBidPrice', bid);
  }

  constructor(private restService: RestService) {
    // this.connection.onclose(async () => {
    //   await this.connection.start();
    // });
    this.connection.on('notificationReceived', (messageHere: string) => {
      const newMessage = ` ${messageHere}`;
      this.messages.push(newMessage);
    });
    // this.connection.on('bidPriceReceived', (messageHere: number) => {
    //   const newMessage = messageHere;
    //   //this.bids.push(messageHere);
    // });
    this.connection.on('testBidPriceReceived', (messageHere: BidOffer) => {
      const newMessage = messageHere;
      //this.bids.push(messageHere);
    });
    this.connection.start();
    console.log('this is start:', this.connection.start());
  }
}
