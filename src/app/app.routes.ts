import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'customers', pathMatch: 'full' },
    { path: 'customers', loadChildren: () => import('./customers/customers-routes').then(m => m.routes) },
    { path: 'auth', loadChildren: () => import('./auth/auth-routes').then(m => m.routes) }
  ];
