import { createAction, props } from '@ngrx/store';
import { CustomerDTO } from '../../shared/dto/customersDTO.model';



export const FETCH_DTO_LIST = createAction(
    '[CUSTOMERS] FETCH_CUSTOMERS_LIST'
);

export const SET_DTO_LIST = createAction(
    '[CUSTOMERS] setList',
    props<{ list: CustomerDTO[] }>()
);

export const EDIT_CUSTOMER = createAction(
    '[CUSTOMERS] editCUSTOMER',
    props<{ customer: CustomerDTO }>()
);

export const NEW_CUSTOMER = createAction(
    '[CUSTOMERS] NEW_CUSTOMER',
    props<{ customer: CustomerDTO }>()
);

export const SAVE_NEW_CUSTOMER = createAction(
    '[CUSTOMERS] SAVE_NEW_CUSTOMER',
    props<{ customer: CustomerDTO }>()
);

export const SAVED_NEW_CUSTOMER = createAction(
    '[CUSTOMERS] SAVED_NEW_CUSTOMER',
    props<{ customer: CustomerDTO }>()
);

export const UPDATE_CUSTOMER = createAction(
    '[CUSTOMERS] UPDATE_CUSTOMER',
    props<{ customer: CustomerDTO }>()
);

export const UPDATED_CUSTOMER = createAction(
    '[CUSTOMERS] UPDATED_CUSTOMER',
    props<{ customer: CustomerDTO }>()
);

export const RESET_SELECTED_CUSTOMER = createAction(
    '[CUSTOMERS] RESET_SELECTED_CUSTOMER'
);
