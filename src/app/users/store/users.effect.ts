import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'src/app/api.service';
import { usersApiActions, usersActions } from './users.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/component-store';

export const loadListEffect$ = createEffect(
    (
        action$ = inject(Actions),
        api = inject(ApiService),
    ) => {
        return action$.pipe(
            ofType(usersActions.searchByFirstName),
            switchMap(({ firstName }) =>
                api.getData(firstName).pipe(
                    map((list) =>
                        usersApiActions.searchByFirstNameSuccess({ list })
                    ),
                    catchError((error) =>
                        of(usersApiActions.searchByFirstNameError({ error }))
                    )
                )
            )
        );
    },
    {
        functional: true,
    }
);
