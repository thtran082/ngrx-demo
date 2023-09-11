import { createAction, createActionGroup, props } from '@ngrx/store';
import { List } from 'src/app/api.service';

export const usersActions = createActionGroup({
    source: '[USERS] SearchByFirstName',
    events: {
        'Search By First Name': props<{ firstName: string }>(),
    }
});

export const usersApiActions = createActionGroup({
    source: '[USERS] Search API',
    events: {
        'Search By First Name Success': props<{ list: List[] }>(),
        'Search By First Name Error': props<{ error: any }>(),
    }
})