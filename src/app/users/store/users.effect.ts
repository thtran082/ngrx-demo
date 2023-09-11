import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { usersActions, usersApiActions } from './users.action';

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
