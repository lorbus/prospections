import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomersGridComponent } from './customers/customers-grid.component';
import { CustomerEditComponent } from './customers/customer-edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'customers', component: CustomersComponent},
  { path: 'customers/:id', component: CustomerEditComponent},
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: '**', pathMatch: 'full', redirectTo: '/login' } // catch any not found routes and redirect to login page
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
  static components = [ LoginComponent, CustomersComponent, CustomerEditComponent, CustomersGridComponent ];
}
