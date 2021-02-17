import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';

import { ValidationService } from '../shared/validation.service';
import { IUser } from '../shared/interfaces';
import { DataService } from '../core/data.service';
import { NotificationService } from '../notification.service';

@Component({
    selector:       'app-login',
    templateUrl:    './login.component.html',
    styleUrls:      [ './login.component.css' ]
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMessage = '';

    user: IUser = {
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        password: '',
        phone: '',
        role: '',
    };

    constructor(
                private formBuilder: FormBuilder,
                private router: Router,
                private dataService: DataService,
                private storage: LocalStorageService,
                private notifyService: NotificationService
    ) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.loginForm = this.formBuilder.group({
            email:      ['', [ Validators.required, ValidationService.emailValidator ]],
            password:   ['', [ Validators.required, ValidationService.passwordValidator ]]
        });
    }

    inputChanged() {
        this.errorMessage = '';
    }

    submit({ value, valid }: { value: IUser, valid: boolean }) {
        this.user.email = value.email.toLowerCase();
        this.user.password = value.password;

        this.dataService.getUser(this.user).subscribe((user: IUser) => {
            if (user) {
                if ((this.user.password).localeCompare(user.password) === 0) {
                    this.router.navigate(['/customers']);
                    // remove password
                    user.password = '***********';
                    // save the data using store methods
                    this.storage.store('user', user);
                    this.dataService.userAuthChanged(true);
                } else {
                    this.errorMessage = 'Password is not correct';
                }
            } else {
              this.errorMessage = 'Unable to get user. Username or password not correct';
            }
          },
          (err: any) => (this.notifyService.showError(err.error.message || 'Server Error', 'Error!')),
                  () => console.log('getCustomersPage() retrieved customers'));

    }

}
