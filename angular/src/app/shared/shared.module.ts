import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { UploaderModule } from '../uploader/uploader.module';
import { UploaderComponent } from '../uploader/uploader.component';

@NgModule({
  declarations: [UploaderComponent],
  imports: [CoreModule, ThemeSharedModule, NgbDropdownModule, NgxValidateCoreModule],
  exports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    UploaderComponent,
  ],
  providers: [],
})
export class SharedModule {}
