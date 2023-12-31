import { Injectable, inject } from '@angular/core';
import { usersActions } from './users.action';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import * as usersSelector from './users.selector';

@Injectable()
export class UsersFacade {
    readonly #store = inject(Store);

    readonly #users$ = this.#store.select(usersSelector.selectUser);
    readonly #loadingState$ = this.#store.select(usersSelector.selectLoadingState);
    readonly search$ = this.#store.select(usersSelector.selectSearch);

    readonly vm$ = combineLatest(
        [
            this.#users$,
            this.#loadingState$,
            this.search$,
        ],
        (users, loading, search) => ({ users, loading, search }),
    );

    updateSearch(value: string) {
        this.#store.dispatch(
            usersActions.searchByFirstName({ firstName: value || '' })
        );
    }
}