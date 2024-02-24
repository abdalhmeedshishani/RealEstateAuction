import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploaderMode, UploaderStyle, UploaderType } from './uploaderMode.enum';
import { UploaderConfig } from './uploader.config';
import { Uploader } from './UploaderImage.data';
import { UploadService } from '@proxy/uploads';
import { IRemoteStreamContent } from '@proxy/volo/abp/content';
import { RemoteStreamContent } from './remote-stream-content.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  progress!: number;
  silhouetteImage!: string;
  file: FormData;
  remoteStreamContent: IRemoteStreamContent;

  uploaderStyleEnum = UploaderStyle;
  uploaderModeEnum = UploaderMode;
  uploaderTypeEnum = UploaderType;

  @Output() public onUploadFinished = new EventEmitter();

  @Input() public config!: UploaderConfig;
  @Input() public imagesNames: any[] = [];

  constructor(private http: HttpClient, private uploadSvc: UploadService) {}

  ngOnInit() {
    this.setSilhouetteImage();
  }

  uploadFile(files: FileList | null) {
    if (files === null) {
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    this.http
      .post(environment.uploadUrl, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe({
        next: event => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total == undefined) {
              event.total = 1;
              alert('event total is undefined');
            }
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            let uploaderImages = event.body as Uploader[];
            this.onUploadFinished.emit(uploaderImages);
            this.imagesNames = uploaderImages;
          }
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
  }

  getImageUrlFromUploaderImage(img: Uploader): string {
    return `${environment.imgStorageUrl}/${img.name}`;
  }

  getImageUrlFromString(imgName: string): string {
    return `${environment.imgStorageUrl}/${imgName}`;
  }

  //#region Private

  private setSilhouetteImage() {
    if (this.config?.style == UploaderStyle.Normal) {
      this.silhouetteImage = '../../../assets/images/logo/20th_century_fox.png';
    } else {
      this.silhouetteImage = '../../../assets/images/logo/20th_century_fox.png';
    }
  }

  //#endregion
}
