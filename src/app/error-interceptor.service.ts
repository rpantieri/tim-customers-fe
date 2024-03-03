import {
    HttpHandler, HttpInterceptor,
    HttpRequest, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import  * as AuthActions from './auth/store/auth.action';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
    constructor(private messageService: MessageService, private store: Store) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        return next.handle(request).pipe(
          catchError( (err: HttpErrorResponse) =>  {
            if (err) {
                this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: err.message });
                console.log(err);
                if (!!err.status && err.status === 401) {
                    console.log('requesting new login');
                    this.store.dispatch(AuthActions.REQUEST_NEW_LOGIN());
                  }
            }
            return throwError(err);
        }))
      
      }
}
