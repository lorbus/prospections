import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

import { DataService } from '../core/data.service';
import { ICustomer, IState, IUser } from '../shared/interfaces';
import { NotificationService } from '../notification.service';

@Component({
  selector:     'app-customer-edit',
  templateUrl:  './customer-edit.component.html'
})

export class CustomerEditComponent implements OnInit {

  customer: ICustomer = {
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    prospectionDate: null,
    bdmName: '',
    leadFrom: '',
    businessType: '',
    registration: '',
    businessName: '',
    locationName: '',
    phone: '',
    note1: ' ',
    note2: ' ',
    role: '',
    pending: '',
    archivedReason: ' ',
    archiveDate: null,
    stateId: 0,
    startDate: null,
    endDate: null
  };

  states: IState[];
  user: IUser;

  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText = 'Insert';
  prospectionStatus = '';

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private dataService: DataService,
              private storage: LocalStorageService,
              private notifyService: NotificationService
            ) { }

  ngOnInit() {

    const id = this.route.snapshot.params.id;

    if (id !== '0') {
      this.operationText = 'Update';
      this.getCustomer(id);
    } else {
      this.customer.stateId = null;
      // retrieve using the key in string
      this.user = this.storage.retrieve('user');
      this.customer.bdmName = this.user.firstName + ' ' + this.user.lastName;
    }

    this.getStates();

  }

  getCustomer(id: string) {
      this.dataService.getCustomer(id)
        .subscribe((customer: ICustomer) => {
          this.customer = customer;
          if (this.customer && this.customer.pending === 'Archived') {
            this.radioAchievedChanged('Archived');
          }
        },
        (err: any) => console.log(err));
  }

  getStates() {
    this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }

  radioAchievedChanged(achieved: string) {
    this.prospectionStatus = achieved;
  }

  radioPendingChanged(pending: string) {
    this.prospectionStatus = pending;
  }

  // event handler for the select element's change event
  selectChangeHandler(id: string) {
    if (this.operationText === 'Insert') {
      // Update the UI
      this.customer.stateId = Number(id.split(' ')[1]);
    }
  }

  dateProspectionChanged(date: Date) {
    this.customer.prospectionDate = date;
  }

  dateArchiveChanged(date: Date) {
    this.customer.archiveDate = date;
  }

  submit() {

    if (this.customer._id) {
        if (this.customer.pending === 'Pending') {
          this.customer.archivedReason = '';
          this.customer.archiveDate = null;
        }
        this.dataService.updateCustomer(this.customer)
          .subscribe((customer: ICustomer) => {
            if (customer) {
              this.notifyService.showSuccess('Prospection Updated', 'Success!');
              this.navigateToMainPage();
            } else {
              this.errorMessage = 'Unable to Save Prospection';
              this.notifyService.showError(this.errorMessage, 'Error!');
            }
          },
          (err: any) => console.log(err));
      } else {
        this.dataService.insertCustomer(this.customer)
          .subscribe((customer: ICustomer) => {
            if (customer) {
              this.notifyService.showSuccess('Prospection Created', 'Success!');
              this.navigateToMainPage();
            } else {
              this.errorMessage = 'Unable to Add Prospection';
              this.notifyService.showError(this.errorMessage, 'Error!');
            }
          },
          (err: any) => console.log(err));
      }

  }

  cancel() {
    this.navigateToMainPage();
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteCustomer(this.customer._id)
        .subscribe((status: boolean) => {
          if (status) {
            this.notifyService.showSuccess('Prospection Deleted', 'Success!');
            this.navigateToMainPage();
          } else {
            this.errorMessage = 'Unable to Delete Prospection';
            this.notifyService.showError(this.errorMessage, 'Error!');
          }
        },
        (err) => console.log(err));
  }

  navigateToMainPage() {
    this.router.navigate(['/customers']);
  }

}
