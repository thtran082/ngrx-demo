import { createFeature, createReducer, on, provideState } from '@ngrx/store';
import { List } from 'src/app/api.service';
import { usersActions, usersApiActions } from './users.action';

export const USERS_FEATURES_KEY = 'USERS';

export interface UserGlobalState {
    list: List[],
    search: {
        firstName: string,
    },
    loadingState: {
        list: boolean
    },
}

const initialState: UserGlobalState = {
    list: [],
    search: {
        firstName: '',
    },
    loadingState: {
        list: false,
    }
};

export const reducer = createReducer(
    initialState,
    on(usersActions.searchByFirstName, (state, { firstName }) => {
        return {
            ...state,
            search: {
                ...state.search,
                firstName,
            }
        }
    }),
    on(usersApiActions.searchByFirstNameSuccess, (state, { list }) => ({
        ...state,
        list,
        loadingState: { list: false },
    })),
    on(usersApiActions.searchByFirstNameError, (state, { error }) => ({
        ...state,
        loadingState: { list: false },
    })),
);
