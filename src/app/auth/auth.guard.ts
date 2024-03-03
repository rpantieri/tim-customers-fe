import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { authFeature} from './store/auth.reducer';
import { environment } from '../../environments/environment';



export const authGuard = () => {
    const router: Router = inject(Router);
    const store: Store = inject(Store);
    return store.select(authFeature.selectAccess_token).pipe(
        take(1),
        map(access_token => {
            const isAuth = access_token != null && access_token.length > 0;
            if (isAuth || environment.dev_token) {
                return true;
            }
            console.log('no AUTH redirecting to auth page');
            return router.createUrlTree(['/auth']);
        })
    );
}
