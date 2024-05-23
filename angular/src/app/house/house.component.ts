import { ConfigStateService, ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BidOffer, HouseDto, HouseService } from '@proxy/houses';
import { UploaderMode, UploaderStyle, UploaderType } from '../uploader/uploaderMode.enum';
import { UploaderConfig } from '../uploader/uploader.config';
import { Uploader } from '../uploader/UploaderImage.data';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
  providers: [ListService],
})
export class HouseComponent {
  house = { items: [], totalCount: 0 } as PagedResultDto<HouseDto>;
  admin: boolean;
  isModalOpen = false;
  selectedHouse: HouseDto = new HouseDto();
  form: FormGroup;
  isForSale: boolean = false;
  hasGarage: boolean = false;
  hasBasement: boolean = false;
  hasSwimmingPool: boolean = false;
  hasSecuritySystem: boolean = false;
  price: number = 0;
  bids: number[] = this.houseService.bids;
  testBids: BidOffer[] = this.houseService.testBids;
  uploaderConfig = new UploaderConfig(
    UploaderStyle.Normal,
    UploaderMode.AddEdit,
    UploaderType.Multiple
  );
  uploaderConfig2 = new UploaderConfig(
    UploaderStyle.Normal,
    UploaderMode.Details,
    UploaderType.Single
  );
  authorizationChecked: boolean = false;
  messages: string[] = this.houseService.messages;
  bidPrice: number = 0;
  currentBidPrice: number;
  //selectedId: string[] = [];
  selectedId: string[] = this.houseService.selectedId;
  notifications: string = this.houseService.notification;
  constructor(
    public readonly list: ListService,
    private houseService: HouseService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private config: ConfigStateService
  ) {}
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<HouseComponent>;

  ngOnInit() {
    const houseStreamCreator = query => this.houseService.getList(query);

    this.list.hookToQuery(houseStreamCreator).subscribe(response => {
      this.house = response;
    });
  }

  send(userId: string) {
    let notification = 'Im gonna buy this';
    this.houseService.send(userId, notification);
  }

  show(id: string): boolean {
    let a = this.selectedId.includes(id);
    return a;
  }

  isCurrentUserAuthorized(id: string): boolean {
    let currentUser = this.config.getOne('currentUser');
    if (currentUser.userName == 'admin') {
      this.admin = true;
      return false;
    } else if (currentUser.id === id) {
      return true;
    }
  }

  bidThePrice(id: string, bidPrice: number) {
    this.houseService.bidPrice(id, bidPrice).subscribe({
      next: () => {
        this.houseService.realTimeBidPrice(id, bidPrice);
        //this.bids.push(bidPrice);
      },
    });
  }

  openDialog(userId: string, id: string, bidPrice: number) {
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.updateSize('500px');
    dialogRef.afterOpened().subscribe(() => {
      this.currentBidPrice = bidPrice;
    });
    dialogRef.afterClosed().subscribe(result => {
      // Note: If the user clicks outside the dialog or presses the escape key, there'll be no result
      if (result !== undefined) {
        if (result === 'yes') {
          this.bidThePrice(id, this.bidPrice);
          this.send(userId);
          var a = this.selectedId.includes(id);
          if (a === false) {
            this.selectedId.push(id);
          }
        } else if (result === 'no') {
          // TODO: Replace the following line with your code.
          console.log('User clicked no.');
        }
      }
    });
  }

  createHouse() {
    this.buildForm();
    this.isModalOpen = true;
  }

  editHouse(id: string) {
    this.houseService.get(id).subscribe(house => {
      this.selectedHouse = house;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  uploadFinished(uploaders: Uploader[]) {
    this.form.patchValue({
      houseImages: uploaders,
    });
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      houseImages: [],
      sizeInSquareFeet: [, Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      price: [, Validators.required],
      isForSale: [this.isForSale],
      numberOfBedrooms: [, Validators.required],
      numberOfBathrooms: [, Validators.required],
      hasGarage: [this.hasGarage, Validators.required],
      numberOfFloors: [, Validators.required],
      hasBasement: [this.hasBasement],
      hasSwimmingPool: [this.hasSwimmingPool],
      hasFireplace: [this.hasSwimmingPool],
      hasSecuritySystem: [this.hasSecuritySystem],
      description: ['', Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedHouse.id
      ? this.houseService.update(this.selectedHouse.id, this.form.value)
      : this.houseService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.houseService.delete(id).subscribe(() => this.list.get());
      }
    });
  }
}
