import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule, FormGroup, FormControl, FormArray, FormBuilder, NgModel, FormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import * as CustomerActions from '../store/customers.action';
import { customerFeature } from '../store/customers.reducer';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CustomerDTO, copyCustomerDTOFromProxy } from '../../shared/dto/customersDTO.model';
import { copyObject } from '../../shared/utils';
import { AccordionModule } from 'primeng/accordion';
import { NgFor, NgIf } from '@angular/common';
import { TableModule} from 'primeng/table';


@Component({
    selector: 'app-customer-edit',
    templateUrl: './customer-edit.component.html',
    styles: ['.p-accordion-content{padding:0px}'],
    providers: [ConfirmationService],
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule, ConfirmPopupModule, TranslateModule, AccordionModule, NgFor, NgIf, TableModule, InputTextModule
    ,FormsModule]
})
export class CustomerEditComponent implements OnInit {

  subscription: Subscription;
  customerForm: UntypedFormGroup;
  contactArray: contact[] = [];

  storeSelectedCustomer: CustomerDTO | null = null;

  name: String = '';

  constructor(private store: Store, private confirmationService: ConfirmationService, private fb:FormBuilder) {
    this.customerForm = this.fb.group({
      name: new FormControl<string|null>(null, Validators.required),
      taxcode: new FormControl<string|null>(null, Validators.required),
      address: new FormControl<string|null>(null, [Validators.required]),
      contacts : this.fb.array([]),
      note: new FormControl<string|null>(null)
      
    });

    this.customerForm.valueChanges.subscribe((x) => {
      this.name = x.name;
      console.log('component edit value component', x);
    });

    this.subscription = this.store
      .pipe(select(customerFeature.selectSelectedCustomer))
      .subscribe(i => {
        this.storeSelectedCustomer = i;
        this.buildForm();
        this.customerForm.markAsPristine();
      });
  }

  buildForm(){
    let dd:CustomerDTO = this.storeSelectedCustomer!=null ? copyCustomerDTOFromProxy(this.storeSelectedCustomer) : new CustomerDTO();
    let caa:FormGroup[] = [];
    for(let i=0;i<dd.contacts.length;++i)caa.push(this.createContact());
    this.customerForm.setControl('contacts',this.fb.array(caa));
    this.customerForm.patchValue(dd);
  }

  get contacts():FormArray{
    return <FormArray>this.customerForm.get('contacts');
  }

  createContact():FormGroup{
    return this.fb.group({
      name : new FormControl<string | null>(null, Validators.required),
      role : new FormControl<string | null>(null),
      email : new FormControl<string | null>(null, [Validators.nullValidator,Validators.email]),
      mobile : new FormControl<string | null>(null),
      phone :  new FormControl<string | null>(null),
    });
  }

  addNewContact(){
    //this.contacts.push(this.createContact());
    this.contactArray.push(new contact());
  }

  deleteContact(index : number){
    this.contacts.removeAt(index);
  }


  ngOnInit(): void {
    this.initForm();
  }


  checkNotValidValue(name: string): boolean {
    let c: AbstractControl | null = this.customerForm.get(name);
    return c != null && c.touched && !c.valid;
  }

  private initForm(): void {

  }

  save(event: Event) {
    console.log("Customer edit save button pressed");
    this.confirmationService.confirm({
      target: event.target != null ? event.target : undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onSubmit();
      },
      reject: () => {
        //reject action
      }
    });
  }

  onSubmit(): void {
    if (this.storeSelectedCustomer == null) {
      alert("no actual selected customer");
      return;
    }
    let item: any = this.customerForm.value;
    let i: CustomerDTO = new CustomerDTO();
    Object.assign(i, this.storeSelectedCustomer);
    Object.assign(i, item);
    if (isNaN(this.storeSelectedCustomer.id)) {
      console.log("dispatching saving new item", i);
      this.store.dispatch(CustomerActions.SAVE_NEW_CUSTOMER({ customer: i }));
    } else {
      console.log("dispatching updating  item", i);
      this.store.dispatch(CustomerActions.UPDATE_CUSTOMER({ customer: i }));
    }
  }

}

class contact{
  name? : string;
  role? : string;
  email? : string;
  mobile? : string;
  phone? : string;
}
