import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, finalize, map, of, switchMap, tap } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { usersActions, usersApiActions } from './users.action';

export const fetchRouterEffect$ = createEffect(
    (
        action$ = inject(Actions),
        route = inject(ActivatedRoute),
    ) => {
        return action$.pipe(
            ofType(usersActions.resolveRouter),
            switchMap(() => route.queryParams.pipe(
                filter(value => {
                    return 'firstName' in value;
                }),
                map(value =>
                    usersActions.searchByFirstName({ firstName: value?.['firstName'] || '' })
                ),
            )),
            finalize(() => console.log('done'))
        )
    },
    {
        functional: true,
    }
);

export const listenFormChange$ = createEffect(
    (
        actions$ = inject(Actions),
        router = inject(Router),
        route = inject(ActivatedRoute),
    ) => {
        return actions$.pipe(
            ofType(usersActions.listenValueChange),
            switchMap(({ valueChanges }) => valueChanges),
            tap(firstName => {
                void router.navigate([], {
                    relativeTo: route,
                    queryParams: { firstName },
                })
            })
        )
    },
    {
        functional: true,
        dispatch: false,
    }
);

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
