import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseDetailsRoutingModule } from './house-details-routing.module';
import { HouseDetailsComponent } from './house-details.component';
//import { SharedModule } from 'primeng/api';

import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HouseDetailsComponent],
  imports: [CommonModule, HouseDetailsRoutingModule, FormsModule, SharedModule],
})
export class HouseDetailsModule {}
