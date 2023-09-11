import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { UsersFacade } from '../store/users.facade';

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
    providers: [
        UsersFacade,
    ]
})
export default class UsersComponent {
    readonly #route = inject(ActivatedRoute);
    readonly #router = inject(Router);
    readonly #destroy$ = inject(DestroyRef);
    readonly #facade = inject(UsersFacade);

    @ViewChild(NgModel) model!: NgModel;

    readonly vm$ = this.#facade.vm$;

    constructor() {
        this.#fetchRouter();
    }

    ngAfterViewInit() {
        this.#listenSearchChange();
    }

    #fetchRouter() {
        return this.#route.queryParams.pipe(
            takeUntilDestroyed(this.#destroy$),
        ).subscribe(params => {
            this.#facade.updateSearch(params['firstName']);
        });
    }

    #listenSearchChange() {
        return this.model.valueChanges!.pipe(
            debounceTime(300),
            takeUntilDestroyed(this.#destroy$)
        ).subscribe(firstName =>{
            this.#router.navigate([], {
                relativeTo: this.#route,
                queryParams: { firstName },
            });
        });
    }
}