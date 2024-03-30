import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseDetailsDto, HouseService } from '@proxy/houses';
import { UploaderConfig } from 'src/app/uploader/uploader.config';
import { UploaderMode, UploaderStyle, UploaderType } from 'src/app/uploader/uploaderMode.enum';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.scss'],
})
export class HouseDetailsComponent {
  isModalOpen = false;
  houseDetails: HouseDetailsDto = new HouseDetailsDto();
  uploaderConfig = new UploaderConfig(
    UploaderStyle.Profile,
    UploaderMode.Details,
    UploaderType.Single
  );

  imagesTest: any[] = [
    { name: '../../../assets/images/1.jpg' },
    { name: '../../../assets/images/2.jpg' },
    { name: '../../../assets/images/3.jpg' },
    { name: '../../../assets/images/4.jpg' },
    //{ name: '../../../assets/images/5.jpg' },
    //{ name: '../../../assets/images/6.jpg' },
    //{ name: '../../../assets/images/7.jpg' },
    //{ name: '../../../assets/images/8.jpeg' },
    //{ name: '../../../assets/images/9.jpg' },
    //{ name: '../../../assets/images/10.jpg' },
    //{ name: '../../../assets/images/11.jpeg' },
    //{ name: '../../../assets/images/12.jpg' },
  ];

  constructor(
    private houseService: HouseService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.setHouseId();
    this.loadHouseDetails();
  }
  slides: any[] = [
    { img: '../../../assets/images/1.jpg' },
    { img: '../../../assets/images/2.jpg' },
    { img: '../../../assets/images/3.jpg' },
    { img: '../../../assets/images/4.jpg' },
  ];
  slideConfig = { slidesToShow: 4, slidesToScroll: 4 };

  addSlide() {
    this.slides.push({ img: '../../../assets/images/5.jpg' });
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

  private loadHouseDetails() {
    let houseId = this.setHouseId();
    this.houseService.getDetails(houseId).subscribe({
      next: houseFromApi => {
        this.houseDetails = houseFromApi;
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
        this.route.navigate(['not-found']);
      },
      complete: () => {
        console.info('complete');
      },
    });
  }

  private setHouseId(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }
}
