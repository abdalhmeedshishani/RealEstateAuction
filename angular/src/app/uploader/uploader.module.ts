import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploaderRoutingModule } from './uploader-routing.module';
import { UploaderComponent } from './uploader.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, UploaderRoutingModule, SharedModule, FormsModule],
})
export class UploaderModule {}
