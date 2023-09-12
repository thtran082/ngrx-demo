import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';

import { provideState } from '@ngrx/store';
import * as usersEffect from './users/store/users.effect';
import { usersFeature } from './users/store/users.reducer';

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
            provideState(usersFeature),
        ]
    }
];