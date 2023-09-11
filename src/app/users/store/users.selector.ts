import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURES_KEY, UserGlobalState } from './users.reducer';

export const state$ = createFeatureSelector<UserGlobalState>(USERS_FEATURES_KEY);

export const selectUser = createSelector(
    state$,
    (state) => state.list,
);

export const selectLoadingState = createSelector(
    state$,
    (state) => state.loadingState,
);

export const selectSearch = createSelector(
    state$,
    (state) => state.search,
);
