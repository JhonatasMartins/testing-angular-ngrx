import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { CoinEffects } from './coin.effect';
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


describe('CoinEffect', () => {
  let actions$: Observable<Action>;
  let service: MercadoBitcoinService;
  let effects: CoinEffects;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MercadoBitcoinService,
        CoinEffects,
        provideMockActions(() => actions$)
      ],
    }).compileComponents();

    effects = TestBed.inject(CoinEffects);
    service = TestBed.inject(MercadoBitcoinService);
  }));

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should load coins prices', () => {
    const data = [{name: 'BTC', price: '48999.99'}];
    spyOn(service, 'getAllPrices').and.returnValue(cold('-a|', { a: data}));
    actions$ = hot('-a-', { a: fetchCoinsPrice() });
    expect(effects.loadCoinsPrice$).toBeObservable(cold('--c', {c: fetchCoinsPriceSuccess({prices: data})}));
  });

  it('should fail to load coins prices', () => {
    spyOn(service, 'getAllPrices').and.returnValue(cold('-#'));
    actions$ = hot('-a-', { a: fetchCoinsPrice() });
    expect(effects.loadCoinsPrice$).toBeObservable(cold('--c', {c: fetchCoinsPriceFail()}));
  });

  it('should load trades by coin', () => {
    const data = [{tid: 6519679, type: 'buy'}];
    spyOn(service, 'getTrades').and.returnValue(cold('-a|', { a: data}));
    actions$ = hot('-a-', { a: fetchCoinTrades({coinType: 'BTC'}) });
    expect(effects.loadCoinTrade$).toBeObservable(cold('--c', {c: fetchCoinTradesSuccess({trades: data})}));
  });

  it('should fail to load trades by coin', () => {
    spyOn(service, 'getTrades').and.returnValue(cold('-#'));
    actions$ = hot('-a-', { a: fetchCoinTrades({coinType: 'BTC'}) });
    expect(effects.loadCoinTrade$).toBeObservable(cold('--c', {c: fetchCoinTradesFail()}));
  });

  it('should show loading be dispatched', () => {
    actions$ = hot('-a-', { a: fetchCoinTrades({coinType: 'BTC'}) });
    expect(effects.showLoading$).toBeObservable(cold('-c', {c: setCoinLoading({loading: true})}));
  });

  it('should hide loading be dispatched', () => {
    actions$ = hot('-a-', { a: fetchCoinsPriceSuccess({prices: []}) });
    expect(effects.hideLoading$).toBeObservable(cold('-c', {c: setCoinLoading({loading: false})}));
  });


});
