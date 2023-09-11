import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURES_KEY, UserGlobalState } from './users.reducer';

export const state$ = createFeatureSelector<UserGlobalState>(USERS_FEATURES_KEY);

export const getUsers$ = createSelector(
    state$,
    (state) => state.list,
)