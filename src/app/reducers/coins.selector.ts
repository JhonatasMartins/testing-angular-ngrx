import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State } from './reducer';

export const getCoinsState = createFeatureSelector<State>('coin');
export const getPrices = createSelector(getCoinsState, (state: any) => state.prices);
export const getTrades = createSelector(getCoinsState, (state: any) => state.trades);
export const isLoading = createSelector(getCoinsState, (state: any) => state.loading);
