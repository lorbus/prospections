import { ModuleWithProviders } from '@angular/core';
// import { DatePipe } from '@angular/common';

export interface ICustomer {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    prospectionDate: Date;
    bdmName: string;
    leadFrom: string;
    businessType: string;
    registration: string;
    businessName: string;
    locationName: string;
    phone: string;
    pending: string;
    archivedReason: string;
    note1: string;
    note2: string;
    role: string;
    archiveDate: Date;
    stateId?: number;
    state?: IState;
    startDate: Date;
    endDate: Date;
}

export interface IState {
    _id?: string;
    id: number;
    abbreviation: string;
    name: string;
    zip: number;
    bsfNr: number;
    lang: string;
    commune: string;
    alt: string;
    long: string;
}

export interface IRouting {
    routes: ModuleWithProviders;
    components: any[];
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface ICustomerResponse {
    customer: ICustomer;
    status: boolean;
    error: string;
}

export interface IUser {
    _id?: string;
    email: string;
    password: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: string;
    address: string;
}

export interface IApiResponse {
    status: boolean;
    error?: string;
}
