import { AsyncPipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiService } from '../api.service';

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
    ]
})
export default class ListComponent {
    private readonly api = inject(ApiService);
    readonly list$ = this.api.getData();
}