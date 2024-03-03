import { createFeature, createReducer, on } from '@ngrx/store';
import * as AuthAction from './auth.action';
import { environment } from '../../../environments/environment';


export const AUTH_KEY = 'auth';

export interface State {
  username: string;
  authError: string;
  access_token: string;
  registerError: string;
  verifyRegistration: boolean;
}

const initialState: State = {
  username: '',
  authError: '',
  access_token: environment.dev_token,
  registerError: '',
  verifyRegistration: false,
};

export const authFeature = createFeature({
  name: AUTH_KEY,
  reducer: createReducer(
    initialState,
    on(AuthAction.LOGIN_START, (state) => {
      console.log('login start');
      return { ...state };
    }),
    on(AuthAction.REGISTER_START, (state) => {
      console.log('register start');
      return { ...state };
    }),
    on(AuthAction.LOGIN_SUCCESS, (state, action) => {
      console.log('login success');
      return { ...state, access_token: action.access_token };
    }),
    on(AuthAction.REGISTER_SUCCESS, (state, action) => {
      console.log('register success');
      return { ...state, verifyRegistration: true };
    }),
    on(AuthAction.LOGIN_FAILED, (state, action) => {
      console.log('login failed');
      return { ...state, session: '', authError: action.message };
    }),
    on(AuthAction.REGISTER_FAILED, (state, action) => {
      console.log('registration failed');
      return { ...state, registerError: action.message };
    }),
    on(AuthAction.CLEAR_AUTH_ERROR, (state) => {
      console.log('clear auth error');
      return { ...state, authError: '' };
    }),
    on(AuthAction.CLEAR_REGISTER_ERROR, (state) => {
      console.log('clear auth error');
      return { ...state, registerError: '' };
    }),
    on(AuthAction.TO_CONFIRM_REGISTRATION, (state) => {
      console.log('to confirm registration');
      return { ...state, verifyRegistration: true };
    }),
    on(AuthAction.TO_REGISTRATION, (state) => {
      console.log('to registration');
      return { ...state, verifyRegistration: false };
    }),
    on(AuthAction.VERIFY_REGISTRATION_SUCCESS, (state) => {
      console.log('VERIFY_REGISTRATION_SUCCESS');
      return { ...state, verifyRegistration: false };
    }),
    on(AuthAction.REQUEST_NEW_LOGIN, (state) => {
      console.log('REQUEST_NEW_LOGIN');
      return { ...state, access_token: '' };
    })
  ),
});

export const {
  name, // feature name
  reducer, // feature reducer
} = authFeature;
