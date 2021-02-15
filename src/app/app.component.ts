import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

import { DataService } from './core/data.service';
import { IUser } from './shared/interfaces';

@Component({
  selector:     'app-root',
  templateUrl:  './app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {
    loginLogoutText = 'Login';
    loginUserText = '';
    sub: Subscription;
    user: IUser;

    constructor(
        private router: Router,
        private dataService: DataService,
        private storage: LocalStorageService
    ) { }

    ngOnInit() {

        this.getLocalStorage();

        this.sub = this.dataService.authChanged
            .subscribe(() => {
                this.setLoginLogoutText();
                this.getLocalStorage();
            },
          (err: any) => console.log(err),
          () => console.log('AppComponent -> ngOnInit()'));

        this.setLoginLogoutText();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.clearLocalStorage();
    }

    loginOrOut() {
      if (this.dataService.isAuthenticated || this.user != null) {
        this.dataService.logout();
        this.redirectToLogin();
        this.clearLocalStorage();
      }
      this.setLoginLogoutText();
    }

    // Retrive info from local storage
    getLocalStorage() {
        this.user = this.storage.retrieve('user');
        if (this.user != null) {
          this.loginUserText = this.user.firstName + ' ' + this.user.lastName;
        }
    }

    // clear local storage
    clearLocalStorage() {
      this.loginUserText = '';
      this.storage.clear();
      this.user = null;
    }

    redirectToLogin() {
        this.router.navigate(['/login']);
    }

    setLoginLogoutText() {
        this.loginLogoutText = (this.dataService.isAuthenticated || this.user != null) ? 'Logout' : 'Login';
    }

}
