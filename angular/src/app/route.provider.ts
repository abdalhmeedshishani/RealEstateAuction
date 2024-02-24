import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: '::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      ,
      {
        path: '/real-estate',
        name: '::Menu:RealEstate',
        iconClass: 'fas fa-book',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/houses',
        name: '::Houses',
        parentName: '::Menu:RealEstate',
        layout: eLayoutType.application,
      },
      {
        path: '/uploader',
        name: '::Uploader',
        parentName: '::Menu:RealEstate',
        layout: eLayoutType.application,
      },
    ]);
  };
}
