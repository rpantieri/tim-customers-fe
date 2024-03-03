import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { CustomerDTO } from "../shared/dto/customersDTO.model";
import * as CustomerActions from './store/customers.action';

@Injectable({ providedIn: "root" })
export class CustomerResolverService implements Resolve<{ list: CustomerDTO[] }> {

    constructor(
        private store: Store,
        private actions$: Actions
    ) { }

    resolve() {
        this.store.dispatch(CustomerActions.FETCH_DTO_LIST());
        return { list: [] };
    }
}