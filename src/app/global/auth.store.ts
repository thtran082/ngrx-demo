import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { pipe, tap } from 'rxjs';
import { Search } from '../list/list.state';

@Injectable({ providedIn: 'root' })
export class AuthStore extends ComponentStore<{ search: Search }> {
    readonly search$ = this.select(s => s.search);

    constructor() {
        super({ search: { firstName: ''} });
    }

    preserveSearch$ = this.effect<Search>(
        pipe(
            tap(value => {
                console.log(value);
                
                this.setState({ search: value })
            })
        )
    )
}