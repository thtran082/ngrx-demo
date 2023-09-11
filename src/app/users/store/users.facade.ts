import { Injectable, inject } from '@angular/core';
import { usersActions } from './users.action';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import * as usersAction from './users.selector';

@Injectable()
export class UsersFacade {
    readonly #store = inject(Store);

    readonly #users$ = this.#store.select(usersAction.selectUser);
    readonly #loadingState$ = this.#store.select(usersAction.selectLoadingState);
    readonly #search$ = this.#store.select(usersAction.selectSearch);

    readonly vm$ = combineLatest(
        [
            this.#users$,
            this.#loadingState$,
            this.#search$,
        ],
        (users, loading, search) => ({ users, loading, search }),
    );

    updateSearch(value: string) {
        this.#store.dispatch(
            usersActions.searchByFirstName({ firstName: value || '' })
        );
    }
}