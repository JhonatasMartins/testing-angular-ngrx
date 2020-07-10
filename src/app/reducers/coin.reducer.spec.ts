import { coinReducer } from './coin.reducer';
import { fetchCoinsPrice, fetchCoinsPriceSuccess, fetchCoinTradesSuccess, fetchCoinTrades, setCoinLoading } from '../actions/coin.action';

describe('Coin Reducer', () => {
  it('initial coins length should be 0', () => {
    const newState = coinReducer(undefined, {});
    expect(newState.prices.length).toEqual(0);
  });

  it('prices should be empty when load prices', () => {
    const prices = [];
    const newState = coinReducer(undefined, fetchCoinsPrice());
    expect(newState.prices).toEqual(prices);
  });

  it('prices list should be updated after success', () => {
    const data = [{name: 'BTC', price: '48999.99'}];
    const newState = coinReducer(undefined, fetchCoinsPriceSuccess({prices: data}));
    expect(newState.prices).toEqual(data);
  });

  it('trades list should be updated after success', () => {
    const data = [{tid: 6519679, type: 'buy'}];
    const newState = coinReducer(undefined, fetchCoinTradesSuccess({trades: data}));
    expect(newState.trades).toEqual(data);
  });

  it('loading should be true', () => {
    const newState = coinReducer(undefined, setCoinLoading({loading: true}));
    expect(newState.loading).toBeTrue();
  });
});
