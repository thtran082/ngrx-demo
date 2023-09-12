import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

@Injectable({ providedIn: 'root' })
export class AuthStore extends ComponentStore<{ visited: boolean }> {
    readonly visited$ = this.select(s => s.visited);

    constructor() {
        super({ visited: false });
    }
}