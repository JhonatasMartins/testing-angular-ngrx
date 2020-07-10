import { createReducer, on } from '@ngrx/store';
import {
  fetchCoinsPriceSuccess, fetchCoinTradesSuccess, setCoinLoading,
} from '../actions/coin.action';

const initialState = {
  prices: [],
  trades: [],
  loading: false
};

const reducer = createReducer(initialState,
  on(fetchCoinsPriceSuccess, (state, action) => (
    {...state, prices: action.prices}
  )),
  on(fetchCoinTradesSuccess, (state, action) => (
    {...state, trades: action.trades}
  )),
  on(setCoinLoading, (state, action) => (
    {...state, loading: action.loading}
  ))
);

export const coinReducer = (state, action) => {
  return reducer(state, action);
};
