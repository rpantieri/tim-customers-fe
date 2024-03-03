import { Routes } from '@angular/router';
import { authGuard } from '../auth/auth.guard';
import { CustomerEditComponent } from './customers-edit/customer-edit.component';
import { CustomerResolverService } from './customers-resolver.service';

import { CustomersComponent } from './customers.component';

export const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    resolve: [CustomerResolverService],
    canActivate: [authGuard],
    children: [
      { path: 'edit', component: CustomerEditComponent },
      { path: 'new', component: CustomerEditComponent }
    ]
  }
];
