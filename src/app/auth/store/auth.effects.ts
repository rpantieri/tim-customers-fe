import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as AuthAction from './auth.action';
import { LoginDTO } from '../../shared/dto/logintDTO.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  loginStart = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.LOGIN_START),
      exhaustMap((action) => {
        console.log('invoking login service');
        var httpOptions:HttpHeaders = new HttpHeaders();
        httpOptions = httpOptions.set('Authorization','Basic '+btoa(action.username+':'+action.username));
        return this.http
          .post<LoginDTO>(environment.baseUrl + 'auth/login', '' ,{headers: httpOptions}
          )
          .pipe(
            map((dto) => {
              console.log('retriving login result');
              return AuthAction.LOGIN_SUCCESS({
                username: '',
                access_token:  dto.access_token,
              });
            }),
            catchError((errirRes: HttpErrorResponse) => {
              console.log('catching error in login service', errirRes);
              return of(
                AuthAction.LOGIN_FAILED({
                  message: errirRes.error?.errorMessage,
                })
              );
            })
          );
      })
    )
  );

  navigateAfterLogin = createEffect(() =>{
    return this.actions$.pipe(
      ofType(AuthAction.LOGIN_SUCCESS),
      tap(()=>{
        console.log('navigating towards landing page');
        this.router.navigate(['/customers']);
      })
    );
  },{dispatch : false});

  registerStart = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.REGISTER_START),
      exhaustMap((action) => {
        console.log('invoking register service');
        return this.http
          .post<LoginDTO>(
            environment.baseUrl + 'auth/registerUser',
            {
              username: action.username,
              password: action.password,
              email: action.email,
            }
          )
          .pipe(
            map((dto) => {
              console.log('retriving register result');
              return AuthAction.REGISTER_SUCCESS();
            }),
            catchError((errirRes: HttpErrorResponse) => {
              console.log('catching error in register service', errirRes);
              return of(
                AuthAction.REGISTER_FAILED({
                  message: errirRes.error.errorMessage,
                })
              );
            })
          );
      })
    )
  );

  verifyRegistration = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.VERIFY_REGISTRATION),
      exhaustMap((action) => {
        console.log('invoking verify register service');
        return this.http
          .post<LoginDTO>(
            environment.baseUrl + 'auth/verifyRegistration',
            action.registration_code
          )
          .pipe(
            map((dto) => {
              console.log('retriving verify register result');
              return AuthAction.VERIFY_REGISTRATION_SUCCESS();
            }),
            catchError((errirRes: HttpErrorResponse) => {
              console.log(
                'error in verify registration service call:',
                errirRes
              );
              return of(
                AuthAction.REGISTER_FAILED({
                  message: errirRes.error.errorMessage,
                })
              );
            })
          );
      })
    )
  );

  verifySuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAction.VERIFY_REGISTRATION_SUCCESS),
        tap(() => this.router.navigate(['auth']))
      ),
    { dispatch: false }
  );

  requireNewLogin = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAction.REQUEST_NEW_LOGIN),
        tap(() => this.router.navigate(['auth']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {}
}
