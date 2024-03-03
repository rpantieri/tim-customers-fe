import { Action, createFeature, createReducer, on } from '@ngrx/store';

import * as CustomerAction from './customers.action';
import { CustomerDTO, copyCustomerDTOFromProxy } from '../../shared/dto/customersDTO.model';

export const CUSTOMERS_KEY = 'customers';

export interface State {
    customers: CustomerDTO[];
    selectedCustomer: CustomerDTO | null;
}

const initialState: State = {
    customers: [],
    selectedCustomer: null
};


export const customerFeature=createFeature({
    name: CUSTOMERS_KEY,
    reducer: createReducer(
    initialState,
    on(CustomerAction.FETCH_DTO_LIST, state => {
        console.log('fetch dto list reducer');
        return { ...state };
    }),
    on(CustomerAction.SET_DTO_LIST, (state, action) => {
        console.log('set dto list reducer');
        let ii:CustomerDTO[] = action.list.map( x => copyCustomerDTOFromProxy(x));
        return { ...state, customers: ii };
    }),
    on(CustomerAction.EDIT_CUSTOMER, (state, action) => {
        console.log('edit customer');
        return { ...state, selectedCustomer: action.customer };
    }),
    on(CustomerAction.NEW_CUSTOMER, (state, action) => {
        console.log('new customer');
        return { ...state, selectedCustomer: action.customer };
    }),
    on(CustomerAction.SAVED_NEW_CUSTOMER, (state, action) => {
        console.log('saved  customer reducer');
        return { ...state, customers: [...state.customers, action.customer], selectedCustomer: action.customer };
    }),
    on(CustomerAction.UPDATED_CUSTOMER, (state, action) => {
        console.log('updated  customer reducer');
        const index: number = state.customers.findIndex((x) => x.id === action.customer.id);
        let ia: CustomerDTO[] = [...state.customers];
        ia[index] = action.customer;
        return { ...state, customers: ia, selectedCustomer: action.customer };
    }),
    on(CustomerAction.RESET_SELECTED_CUSTOMER, (state, action) => {
        console.log('new customer');
        return { ...state, selectedCustomer: null };
    })
)});

export const{
    name,
    reducer,
    selectCustomers,
    selectCustomersState,
    selectSelectedCustomer
} = customerFeature;

