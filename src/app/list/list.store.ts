import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComponentStore, OnStoreInit, tapResponse } from '@ngrx/component-store';
import { pipe, switchMap, tap, withLatestFrom } from 'rxjs';
import { ApiService } from '../api.service';
import { ListState } from './list.state';

@Injectable()
export class ListStore extends ComponentStore<ListState> implements OnStoreInit {
    readonly #api = inject(ApiService);
    readonly #route = inject(ActivatedRoute);
    readonly #router = inject(Router);

    readonly #list$ = this.select(s => s.list);
    readonly #search$ = this.select(s => s.search);
    readonly #loading$ = this.select(s => s.loadingState);

    readonly vm$ = this.select(
        this.#list$,
        this.#search$,
        this.#loading$,
        (list, search, loading) => ({ list, search, loading })
    );

    constructor() {
        super(initialState);
    }

    ngrxOnStoreInit() {
        this.fetchRouter$(this.#route.queryParams);
        this.fetchAPI$(
            this.#search$
        );
    }

    fetchRouter$ = this.effect<Params>(
        pipe(
            withLatestFrom(this.#search$),
            tap(([value, search]) => {
                this.patchState({
                    search: { ...search, firstName: value?.['firstName'] || '' }
                });
            })
        )
    )

    fetchAPI$ = this.effect<ListState['search']>(
        pipe(
            tap(() => { this.setListLoading(true) }),
            switchMap(({ firstName }) => this.#api.getData(firstName).pipe(
                tapResponse(
                    (list) => {
                        this.patchState({ list });
                    },
                    () => { },
                    () => (this.setListLoading(false))
                )
            )),
        )
    );

    updateSearch$ = this.effect<ListState['search']['firstName']>(
        pipe(
            tap((firstName) => {
                void this.#router.navigate([], {
                    relativeTo: this.#route,
                    queryParams: { firstName },
                });
            })
        )
    );

    setListLoading(list: boolean) {
        this.patchState({ loadingState: { list } });
    }

}

const initialState: ListState = {
    list: [],
    search: {
        firstName: '',
    },
    loadingState: {
        list: false,
    }
};