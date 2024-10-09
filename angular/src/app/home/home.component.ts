import { AuthService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgbCarousel,
  NgbCarouselModule,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { HomeService } from '@proxy/home';
import { HouseDto } from '@proxy/houses';
import { HouseImageDto } from '@proxy/houses/house-images';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  model: any;
  searchForm: FormGroup;
  housesBidPrice: any[];

  //images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images: any = [
    { image: '../../assets/images/tree-house.jpg' },
    { image: '../../assets/images/inside-house.jpg' },
  ];
  states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona'];

  searchList: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2
          ? []
          : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      )
    );

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private homeSVC: HomeService
  ) {}
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  ngOnInit(): void {
    this.homeSVC.getTopThreeHighestBidRealEstate().subscribe(d => {
      next: this.housesBidPrice = d;
    });
  }
  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }

  login() {
    this.authService.navigateToLogin();
  }

  getTopThreeHighestBidRealEstateImages(imgName: HouseImageDto[]): string {
    return `${environment.imgStorageUrl}/${imgName[0].name}`;
  }

  buildForm() {
    this.searchForm = this.fb.group({
      city: [''],
      address: [''],
      //state: [''],
      zipCode: [''],
    });
  }
}
