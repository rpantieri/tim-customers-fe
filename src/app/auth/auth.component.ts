import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import * as AuthActions from './store/auth.action';
import { authFeature } from './store/auth.reducer';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageDropdownComponent } from '../components/LanguageDropdown.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-auth.component',
    template: `
    <div
      class="align-items-center d-flex h-100 justify-content-center w-auto"
    >
      <div class="p-4 text-bg-secondary border rounded" (keyup.enter)="login(USERNAME.value, PASSWORD.value)">
        <div class="row p-2">
          <div class="col-3 "><div class="row h-100 justify-content-end align-items-center">{{ 'AUTH.USERNAME' | translate }}</div></div>
          <div class="col-9">
            <input
              id="username"
              type="text"
              pInputText
              #USERNAME
              [placeholder]="'AUTH.USERNAME' | translate"
            />
          </div>
        </div>
        <div class="row p-2">
          <div class="col-3 "><div class="row h-100 justify-content-end align-items-center">{{ 'AUTH.PASSWORD' | translate }}</div></div>
          <div class="col-9">
            <input
              id="password"
              type="password"
              pInputText
              #PASSWORD
              [placeholder]="'AUTH.PASSWORD' | translate"
            />
          </div>
        </div>
        <div class="row p-2">
          <div class="col-3"></div>
          <div class="col-5"><button (click)="login(USERNAME.value, PASSWORD.value)" class="btn btn-primary btn-lg">{{'AUTH.LOGIN' | translate}}</button></div>
          <div class="col-4"><app-language-dropdown></app-language-dropdown></div>
        </div>
        
      </div>
    </div>
  `,
    styles: [''],
    providers: [MessageService],
    standalone: true,
    imports: [
        InputTextModule,
        LanguageDropdownComponent,
        TranslateModule,
    ],
})
export class AuthComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  subscriptionError: Subscription | undefined;
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.subscriptionError = this.store
      .pipe(select(authFeature.selectRegisterError))
      .subscribe((error) => {
        if (error != null && error.length > 0) {
          this.messageService.clear('error');
          this.messageService.add({
            key: 'error',
            sticky: false,
            severity: 'error',
            summary: 'Error in login',
            detail: error,
          });
          this.store.dispatch(AuthActions.CLEAR_AUTH_ERROR());
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.subscriptionError) this.subscriptionError.unsubscribe();
  }

  login(username: string, password: string): void {
    this.store.dispatch(
      AuthActions.LOGIN_START({ username: username, password: password })
    );
  }

  register(): void {
    this.store.dispatch(AuthActions.TO_REGISTRATION());
    this.router.navigate(['auth', 'register']);
  }

  verifyRegistration(): void {
    this.store.dispatch(AuthActions.TO_CONFIRM_REGISTRATION());
    this.router.navigate(['auth', 'register']);
  }
}
