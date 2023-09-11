import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUsers$ } from '../store/users.selector';
import { usersActions } from '../store/users.action';
import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-users',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.scss'],
    imports: [
        NgIf,
        AsyncPipe,
        NgFor,
        FormsModule,
    ],
})
export default class UsersComponent {
    readonly #store = inject(Store);

    users$ = this.#store.select(getUsers$);

    ngOnInit() {
        this.#store.dispatch(usersActions.searchByFirstName({ firstName: '' }));
    }
}