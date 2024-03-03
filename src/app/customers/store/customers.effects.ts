import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, exhaustMap } from 'rxjs/operators';
import * as CustomerActions from './customers.action';
import { CustomerDTO } from '../../shared/dto/customersDTO.model';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class CustomersEffects {

    fetchCustomersDTO = createEffect(() => this.actions$.pipe(
        ofType(CustomerActions.FETCH_DTO_LIST),
        switchMap(() => {
            console.log('fetch dto list');
            return this.http.get<CustomerDTO[]>(
                environment.baseUrl + 'customer/listDTO'
            ).pipe(
                map(customers => {
                    console.log('set dto list action');
                    return CustomerActions.SET_DTO_LIST({ list: customers });
                })
            )
        })
    ));

    insertCustomers = createEffect(() => this.actions$.pipe(
        ofType(CustomerActions.SAVE_NEW_CUSTOMER),
        exhaustMap((action) => {
            console.log('saving new customer: ', action.customer);
            return this.http.post<CustomerDTO>(
                environment.baseUrl + 'customer/', action.customer
            ).pipe(
                map(customer => {
                    console.log('saved new customer:', customer);
                    return CustomerActions.SAVED_NEW_CUSTOMER({ customer: customer });
                })
            )
        })
    ));

    updateCustomer = createEffect(() => this.actions$.pipe(
        ofType(CustomerActions.UPDATE_CUSTOMER),
        exhaustMap((action) => {
            console.log('updating customer: ', action.customer);
            return this.http.put<CustomerDTO>(
                environment.baseUrl + 'customer/' , action.customer
            ).pipe(
                map(customer => {
                    console.log('updated customer:', customer);
                    return CustomerActions.UPDATED_CUSTOMER({ customer: customer });
                })
            )
        })
    ));



    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store
    ) { }
}
