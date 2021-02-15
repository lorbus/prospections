import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { DataFilterService } from '../core/data-filter.service';
import { DataService } from '../core/data.service';
import { ICustomer, IUser, IPagedResults } from '../shared/interfaces';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})

export class CustomersComponent implements OnInit {

  customers: ICustomer[] = [];
  filteredCustomers: ICustomer[] = [];
  user: IUser;

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

  page = 1;
  filterText = '';
  showDateFilterFoundLabel = false;

  totalRecords = 0;
  pageSize = 1000;

  constructor(
              private router: Router,
              private dataService: DataService,
              private dataFilter: DataFilterService,
              private storage: LocalStorageService,
              private notifyService: NotificationService
            ) { }

  ngOnInit() {
    // retrieve using the key in string
    this.user = this.storage.retrieve('user');

    this.getCustomersPage(1);
  }

  dateStartChanged(date: Date) {
    this.customer.startDate = date;
  }

  dateEndChanged(date: Date) {
    this.customer.endDate = date;
  }

  clearDateFilters() {
    this.customer.startDate = null;
    this.customer.endDate = null;
    this.showDateFilterFoundLabel = false;
    this.getCustomersPage(this.page);
  }

  searchByDate() {
    let message = '';
    const title = 'Attention!';

    if (this.customer.startDate > new Date()) {
      message = '\'Start Date\' should be Less then \'Today\'s Date\'';
    } else if (this.customer.endDate > new Date()) {
      message = '\'End Date\' should be Less then \'Today\'s Date\'';
    } else if (this.customer.startDate > this.customer.endDate) {
      message = '\'Start Date\' should be Less then \'End Date\'';
    } else {
      this.getCustomersPage(this.page);
      this.showDateFilterFoundLabel = true;
    }

    if (message !== '') {
      this.showDateFilterFoundLabel = false;
      this.notifyService.showWarning(message, title);
    }

  }

filterChanged(filterText: string) {
    this.filterText = filterText;

    if (filterText && this.customers) {

      const props = [
        'firstName',
        'lastName',
        'address',
        'archivedReason',
        'archiveDate',
        'bdmName',
        'prospectionDate',
        'pending',
        'businessName',
        'locationName',
        'phone',
        'role',
        'state.name',
        'state.zip',
        'state.abbreviation',
      ];

      this.filteredCustomers = this.dataFilter.filter(this.customers, props, filterText);
    } else {
      this.filteredCustomers = this.customers;
    }
  }

pageChanged(page: number) {
    this.page = page;
    this.getCustomersPage(page);
  }

getCustomersPage(page: number) {
    if (this.dataService.isAuthenticated || this.user != null) {
      this.dataService.getCustomersPage((page - 1) * this.pageSize, this.pageSize, this.customer.startDate, this.customer.endDate)
        .subscribe((response: IPagedResults<ICustomer[]>) => {
          this.customers = this.filteredCustomers = response.results;
          this.totalRecords = response.totalRecords;
        },
          (err: any) => (this.notifyService.showError('Server Error', 'Error!')),
          () => console.log('getCustomersPage() retrieved customers'));
    } else {
      this.router.navigate(['/login']);
    }
  }

downloadCSV() {
    const fileName = 'Prospections_' + (new Date()).toLocaleString();
    const headers = [
                      'ID', 'Prospection Date', 'Contact Name', 'Contact Surname', 'Email', 'Address', 'BDM Name',
                      'Lead From', 'Business Type', 'Registration', 'Business Name', 'Location Name', 'Phone',
                      'Pending', 'Role', 'Archived Reason', 'Archive Date', 'Note 1', 'Note 2', 'Postal Code'
                    ];

    const prospections = this.filteredCustomers;
    prospections.forEach(obj => {
      obj.stateId = obj.state.zip;
    });

    const options = {
      title: '',
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      headers
    };

    // tslint:disable-next-line: no-unused-expression
    new Angular2Csv(prospections, fileName, options);
  }

}
