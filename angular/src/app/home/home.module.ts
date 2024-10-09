import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgbCarouselModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AllAngularMaterialModules } from '../shared/all-angular-material-modules.module';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    CommonModule,
    HomeRoutingModule,
    NgbCarouselModule,
    AllAngularMaterialModules,
    NgbTypeaheadModule,
    FormsModule,
    JsonPipe,
  ],
})
export class HomeModule {}
