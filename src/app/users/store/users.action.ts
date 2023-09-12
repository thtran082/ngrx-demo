import { NgModel } from '@angular/forms';
import { createActionGroup, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { List } from 'src/app/api.service';

export const usersActions = createActionGroup({
    source: '[USERS] SearchByFirstName',
    events: {
        'Resolve Router': props<any>(),
        'Search By First Name': props<{ firstName: string }>(),
        'Listen Value Change': props<{ valueChanges: Observable<string> }>(),
    }
});

export const usersApiActions = createActionGroup({
    source: '[USERS] Search API',
    events: {
        'Search By First Name Success': props<{ list: List[] }>(),
        'Search By First Name Error': props<{ error: any }>(),
    }
})