import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { MercadoBitcoinService } from '../services/coin.service';
import {
  fetchCoinsPrice,
  fetchCoinsPriceSuccess,
  fetchCoinsPriceFail,
  fetchCoinTrades,
  fetchCoinTradesSuccess,
  fetchCoinTradesFail,
  setCoinLoading
} from '../actions/coin.action';


@Injectable()
export class CoinEffects {

  @Effect()
  showLoading$ = this.actions$.pipe(
    ofType(fetchCoinTrades, fetchCoinsPrice),
    map(() => setCoinLoading({loading: true}))
  );

  @Effect()
  hideLoading$ = this.actions$.pipe(
    ofType(fetchCoinTradesSuccess, fetchCoinTradesFail, fetchCoinsPriceSuccess, fetchCoinsPriceFail),
    map(() => setCoinLoading({loading: false}))
  );

  @Effect()
  loadCoinsPrice$ = this.actions$.pipe(
    ofType(fetchCoinsPrice),
    mergeMap(() =>
      this.coinService.getAllPrices().pipe(
        map((data: any) => (fetchCoinsPriceSuccess({prices: data}))),
        catchError(() => of(fetchCoinsPriceFail()))
      )
    )
  );

  @Effect()
  loadCoinTrade$ = this.actions$.pipe(
    ofType(fetchCoinTrades),
    mergeMap((action: any) =>
      this.coinService.getTrades(action.coinType).pipe(
        map((data: any) => (fetchCoinTradesSuccess({trades: data.reverse()}))),
        catchError(() => of(fetchCoinTradesFail()))
      )
    )
  );


  constructor(
    private actions$: Actions,
    private coinService: MercadoBitcoinService
  ) {}
}
