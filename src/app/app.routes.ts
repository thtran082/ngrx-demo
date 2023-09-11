import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStoreFeature } from './di/store.di';

import * as usersEffect from './users/store/users.effect';
import * as usersFeature from './users/store/users.reducer';
import { provideState } from '@ngrx/store';

export const appRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./list/list.component'),
    },
    {
        path: 'users',
        loadComponent: () => import('./users/components/users.component'),
        providers: [
            provideEffects(usersEffect),
            provideState(
                usersFeature.USERS_FEATURES_KEY,
                usersFeature.reducer,
            ),
        ]
    }
];