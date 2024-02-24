import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseDetailsComponent } from './house-details.component';

const routes: Routes = [{ path: '', component: HouseDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseDetailsRoutingModule { }
