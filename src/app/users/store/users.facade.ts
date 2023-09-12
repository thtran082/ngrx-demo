import { Injectable, inject } from '@angular/core';
import { usersActions } from './users.action';
import { Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import * as usersSelector from './users.selector';
import { NgModel } from '@angular/forms';

@Injectable()
export class UsersFacade {
    readonly #store = inject(Store);

    readonly #users$ = this.#store.select(usersSelector.selectUser);
    readonly #loadingState$ = this.#store.select(usersSelector.selectLoadingState);
    readonly #search$ = this.#store.select(usersSelector.selectSearch);

    readonly vm$ = combineLatest(
        [
            this.#users$,
            this.#loadingState$,
            this.#search$,
        ],
        (users, loading, search) => ({ users, loading, search }),
    );

    constructor() {
        this.fetchRouter();
    }

    fetchRouter() {
        this.#store.dispatch(
            usersActions.resolveRouter(),
        )
    }

    updateSearch(model: NgModel) {
        this.#store.dispatch(
            usersActions.listenValueChange({ model })
        );
    }
}