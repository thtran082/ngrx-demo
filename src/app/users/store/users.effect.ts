import { DestroyRef, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, first, map, of, switchMap, tap } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { usersActions, usersApiActions } from './users.action';
import { ActivatedRoute, Router } from '@angular/router';

export const fetchRouterEffect$ = createEffect(
    (
        action$ = inject(Actions),
        route = inject(ActivatedRoute),
    ) => {
        return action$.pipe(
            ofType(usersActions.resolveRouter),
            switchMap(() => route.queryParams.pipe(
                map(value =>
                    usersActions.searchByFirstName({ firstName: value?.['firstName'] || '' })
                ),
            )),
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
            switchMap(({ model }) => model.valueChanges || of('')),
            // tap(firstName => {
            //     console.log(firstName);
            //     void router.navigate([], {
            //         relativeTo: route,
            //         queryParams: { firstName },
            //     })
            // })
        )
    },
    {
        functional: true,
        dispatch: false,
    }
)


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
