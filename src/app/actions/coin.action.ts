import { createAction, props } from '@ngrx/store';
import { CoinType } from '../types/coin.type';

export enum CoinActionTypes{
  coinLoading = '[COIN] Set Loading',
  fetchCoinsPrice = '[COIN] Fetch Prices',
  fetchCoinsPriceSuccess = '[COIN] Fetch Price Success',
  fetchCoinsPriceFail = '[COIN] Fetch Price Fail',
  fetchCoinTrades = '[COIN] Fetch Coin Trades',
  fetchCoinTradesSuccess = '[COIN] Fetch Coin Trades Success',
  fetchCoinTradesFail = '[COIN] Fetch Coin Trades Fail'
}

export const fetchCoinsPrice = createAction(CoinActionTypes.fetchCoinsPrice);
export const fetchCoinsPriceSuccess = createAction(CoinActionTypes.fetchCoinsPriceSuccess, props<{prices: any}>());
export const fetchCoinsPriceFail = createAction(CoinActionTypes.fetchCoinsPriceFail);
export const fetchCoinTrades = createAction(CoinActionTypes.fetchCoinTrades, props<{coinType: string}>());
export const fetchCoinTradesSuccess = createAction(CoinActionTypes.fetchCoinTradesSuccess, props<{trades: any}>());
export const fetchCoinTradesFail = createAction(CoinActionTypes.fetchCoinTradesFail);
export const setCoinLoading = createAction(CoinActionTypes.coinLoading, props<{loading: boolean}>());


