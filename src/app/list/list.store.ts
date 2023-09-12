import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComponentStore, OnStoreInit, tapResponse } from '@ngrx/component-store';
import { distinctUntilChanged, pipe, switchMap, tap, withLatestFrom } from 'rxjs';
import { ApiService } from '../api.service';
import { ListState } from './list.state';
import { AuthStore } from '../global/auth.store';

@Injectable()
export class ListStore extends ComponentStore<ListState> implements OnStoreInit {
    readonly #api = inject(ApiService);
    readonly #route = inject(ActivatedRoute);
    readonly #router = inject(Router);
    readonly #authStore = inject(AuthStore);

    readonly #list$ = this.select(s => s.list);
    readonly #search$ = this.select(s => s.search);
    readonly #loading$ = this.select(s => s.loadingState);

    /**
     * alternatives with:
     * readonly vm$ = combineLatest(
     *      [this.#list$, this.#search$],
     *      (list, search) => ({ list, search }),
     * )
     */
    readonly vm$ = this.select(
        this.#list$,
        this.#search$,
        this.#loading$,
        this.#authStore.visited$,
        (list, search, loading, visited) => ({ list, search, loading, visited })
    );

    constructor() {
        super(initialState);
    }

    ngrxOnStoreInit() {
        this.fetchRouter$(this.#route.queryParams);
        this.fetchAPI$(
            this.#search$.pipe(
                distinctUntilChanged((prev, curr) => {
                    return prev.firstName === curr.firstName
                }),
            )
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

    setVisited(visited: boolean) {
        this.#authStore.patchState({ visited });
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