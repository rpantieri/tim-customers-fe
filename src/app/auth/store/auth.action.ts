import { createAction, props } from '@ngrx/store';

export const LOGIN_START = createAction(
  '[AUTH] LOGIN_START',
  props<{ username: string; password: string }>()
);

export const REGISTER_START = createAction(
  '[AUTH] REGISTER_START',
  props<{ username: string; password: string; email: string }>()
);

export const REGISTER_FAILED = createAction(
  '[AUTH] REGISTER_FAILED',
  props<{ message: string }>()
);

export const LOGIN_FAILED = createAction(
  '[AUTH] LOGIN_FAILED',
  props<{ message: string }>()
);

export const LOGIN_SUCCESS = createAction(
  '[AUTH] LOGIN_SUCCESS',
  props<{ username: string; access_token: string }>()
);

export const REGISTER_SUCCESS = createAction('[AUTH] REGISTER_SUCCESS');

export const CLEAR_AUTH_ERROR = createAction('[AUTH] CLEAR_AUTH_ERROR');

export const CLEAR_REGISTER_ERROR = createAction('[AUTH] CLEAR_REGISTER_ERROR');

export const TO_CONFIRM_REGISTRATION = createAction(
  '[AUTH] TO_CONFIRM_REGISTRATION'
);

export const TO_REGISTRATION = createAction('[AUTH] TO_REGISTRATION');

export const VERIFY_REGISTRATION = createAction(
  '[AUTH] VERIFY_REGISTRATION',
  props<{ registration_code: string }>()
);

export const VERIFY_REGISTRATION_SUCCESS = createAction(
  '[AUTH] VERIFY_REGISTRATION_SUCCESS'
);

export const REQUEST_NEW_LOGIN = createAction('[AUTH] REQUEST_NEW_LOGIN');
