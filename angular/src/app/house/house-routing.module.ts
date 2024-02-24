import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseComponent } from './house.component';
import { authGuard, permissionGuard } from '@abp/ng.core';

const routes: Routes = [{ path: '', component: HouseComponent, canActivate: [permissionGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HouseRoutingModule {}
