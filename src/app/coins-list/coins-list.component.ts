import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchCoinsPrice, fetchCoinTrades } from '../actions/coin.action';
import { State } from '../reducers/reducer';
import { getPrices, getTrades, isLoading } from '../reducers/coins.selector';

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.css']
})
export class CoinsListComponent implements OnInit {

  coinsPrice$: Observable<any>;
  trade$: Observable<any>;
  loading$: Observable<boolean>;
  coinType: string = null;

  constructor(private store: Store<State>) {
    this.coinsPrice$ = this.store.pipe(select(getPrices));
    this.trade$ = this.store.pipe(select(getTrades));
    this.loading$ = this.store.pipe(select(isLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCoinsPrice());
  }

  detailOperationClick(coinType: string){
    this.coinType = coinType;
    this.store.dispatch(fetchCoinTrades({coinType}));
  }

  formatDate(date){
    const opt: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit'
    };

    return new Date(date * 1000).toLocaleDateString('pt-BR', opt);
  }
}
