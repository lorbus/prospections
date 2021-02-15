import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ICustomer, IState, IUser, IPagedResults, ICustomerResponse } from '../shared/interfaces';

@Injectable()
export class DataService {

    baseUrl = '/api/customers';
    baseStatesUrl = '/api/states';
    baseUserUrl = '/api/login';

    isAuthenticated = false;

    @Output()
    authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
                private http: HttpClient
            ) {}

    public userAuthChanged(status: boolean) {
       this.authChanged.emit(status); // Raise changed event
    }

    /*
    getCustomers(): Observable<ICustomer[]> {
        return this.http.get<ICustomer[]>(this.baseUrl)
            .pipe(
                   map((customers: ICustomer[]) => {
                       return customers;
                   }),
                   catchError(this.handleError)
                );
    }
    */

    getCustomersPage(page: number, pageSize: number, startDate: Date, endDate: Date): Observable<IPagedResults<ICustomer[]>> {
        return this.http.get<ICustomer[]>(`${this.baseUrl}/page/${page}/${pageSize}/${startDate}/${endDate}`, { observe: 'response' })
            .pipe(
                    map((res) => {
                        // Need to observe response in order to get to this header (see {observe: 'response'} above)
                        const totalRecords = +res.headers.get('x-inlinecount');
                        const customers = res.body as ICustomer[];
                        return {
                            results: customers,
                            totalRecords
                        };
                    }),
                    catchError(this.handleError)
                );
    }

    getCustomer(id: string): Observable<ICustomer> {
        return this.http.get<ICustomer>(this.baseUrl + '/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    insertCustomer(customer: ICustomer): Observable<ICustomer> {
        return this.http.post<ICustomerResponse>(this.baseUrl, customer)
            .pipe(
                   map((data) => {
                       console.log('insertCustomer status: ' + data.status);
                       return data.customer;
                   }),
                   catchError(this.handleError)
                );
    }

    updateCustomer(customer: ICustomer): Observable<ICustomer> {
        return this.http.put<ICustomerResponse>(this.baseUrl + '/' + customer._id, customer)
            .pipe(
                   map((data) => {
                       console.log('updateCustomer status: ' + data.status);
                       return data.customer;
                   }),
                   catchError(this.handleError)
                );
    }

    deleteCustomer(id: string): Observable<boolean> {
        return this.http.delete<boolean>(this.baseUrl + '/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    getStates(): Observable<IState[]> {
        return this.http.get<IState[]>(this.baseStatesUrl)
            .pipe(
                catchError(this.handleError)
            );
    }

    getUser(userForm: IUser): Observable<IUser> {
        return this.http.get<IUser>(this.baseUserUrl + '/' + userForm.email)
            .pipe(
                map((user: IUser) => {
                    if (user && (userForm.password).localeCompare(user.password) === 0) {
                        this.isAuthenticated = true;
                        this.userAuthChanged(true);
                    }
                    return user;
                }),
                catchError(this.handleError)
            );
    }

    logout() {
        this.isAuthenticated = false;
        this.userAuthChanged(true);
    }

  handleError(error: HttpErrorResponse) {
      console.error('Server Error:', error);
      if (error.error instanceof Error) {
        const errMessage = error.error.message;
        return throwError(errMessage);

        // Use the following instead if using lite-server
        // return throwError(err.text() || 'backend server error');
      }
      return throwError(error || 'Node.js server error');
  }

}
