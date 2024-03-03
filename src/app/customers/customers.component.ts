import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { Subscription } from 'rxjs';
import { CustomerDTO } from '../shared/dto/customersDTO.model';
import * as CustomerActions from './store/customers.action';
import { customerFeature } from './store/customers.reducer';
@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styles: ['.p-listbox-list {padding-left : 0rem;}'],
    standalone: true,
    imports: [ListboxModule, ReactiveFormsModule, FormsModule, ButtonModule, RouterOutlet]
})
export class CustomersComponent implements OnInit, OnDestroy {

  customers: CustomerDTO[] = [];
  selectedCustomer: CustomerDTO | null = null;
  subscription: Subscription | undefined;
  subscriptionSelection: Subscription | undefined;


  constructor(private store: Store, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.store
    .pipe(select(customerFeature.selectCustomers))
      .subscribe((ii: CustomerDTO[]) => {
        console.log('customers component: setting customer list');
        this.customers = ii;
      });
    this.subscriptionSelection = this.store
    .pipe(select(customerFeature.selectSelectedCustomer))
      .subscribe((i: CustomerDTO | null) => {
        console.log('customers component: setting new selected customer',i);
        this.selectedCustomer = i == null || isNaN(i.id) ? null : i;
      });
    this.store.dispatch(CustomerActions.RESET_SELECTED_CUSTOMER());

    
  }

  

  onChange() {
    console.log("detect list customer change, new item:" + this.selectedCustomer);
    if (this.selectedCustomer == null) return;
    console.log("dispatching edit customer action");
    this.store.dispatch(CustomerActions.EDIT_CUSTOMER({ customer: this.selectedCustomer }));
    this.router.navigate(['customers', 'edit']);
  }



  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.subscriptionSelection) this.subscriptionSelection.unsubscribe();
  }

  newButton() {
    console.log("customers, navigate to new");
    this.store.dispatch(CustomerActions.NEW_CUSTOMER({ customer: new CustomerDTO() }));
    this.router.navigate(['customers', 'new']);
  }
}
