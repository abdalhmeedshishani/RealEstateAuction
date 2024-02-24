import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseRoutingModule } from './house-routing.module';
import { HouseComponent } from './house.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AllAngularMaterialModules } from '../shared/all-angular-material-modules.module';

@NgModule({
  declarations: [HouseComponent],
  imports: [CommonModule, HouseRoutingModule, SharedModule, FormsModule, AllAngularMaterialModules],
})
export class HouseModule {}
