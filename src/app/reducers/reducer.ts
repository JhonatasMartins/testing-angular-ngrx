import { ActionReducerMap } from '@ngrx/store';
import { coinReducer } from './coin.reducer';

export interface State{
  coin: {};
}

export const reducers: ActionReducerMap<State> = {
  coin: coinReducer
};
