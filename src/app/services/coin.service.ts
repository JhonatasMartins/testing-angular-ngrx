import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CoinType, MethodType} from '../types/coin.type';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MercadoBitcoinService {

  baseUrl = environment.API;

  constructor(private http: HttpClient) {}

  get(coin: string, method: MethodType){
    return this.http.get(`${this.baseUrl}/${coin}/${method}`);
  }

  getPriceByCoin(coin: string,  method: MethodType){
    return this.get(coin, method).pipe(
      map((response: any) => {
        return {coin, ...response.ticker};
      })
    );
  }

  getAllPrices(){
    const values = Object.keys(CoinType)
                   .filter(key => typeof key === 'string');

    return forkJoin(values.map(coin => this.getPriceByCoin(coin, MethodType.ticker)));
  }

  getTrades(coinType: string){
    return this.get(coinType, MethodType.trades);
  }

}
