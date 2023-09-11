import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { provideComponentStore } from '@ngrx/component-store';
import { debounceTime } from 'rxjs';
import { ListStore } from './list.store';

@Component({
    selector: 'app-list',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.scss'],
    imports: [
        NgIf,
        AsyncPipe,
        NgFor,
        FormsModule,
    ],
    providers: [
        provideComponentStore(ListStore),
    ]
})
export default class ListComponent {
    readonly #store = inject(ListStore);
    readonly vm$ = this.#store.vm$;

    @ViewChild(NgModel) model!: NgModel;

    ngAfterViewInit() {
        this.#store.updateSearch$(
            this.model.valueChanges!.pipe(
                debounceTime(300),
            ),
        )
    }
}