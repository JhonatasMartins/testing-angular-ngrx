import { of } from 'rxjs';
import { MercadoBitcoinService } from './coin.service';
import {CoinType, MethodType} from '../types/coin.type';

let httpClientSpy: { get: jasmine.Spy };
let service: MercadoBitcoinService;

describe('MercadoBitcoinService', () => {

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new MercadoBitcoinService(httpClientSpy as any);
  });

  it('should return all coins listed on CoinType enum', () => {
    expect(service).toBeTruthy();

    httpClientSpy.get.and.returnValue(of({ticker: {name: 'teste'}}));
    service.getAllPrices().subscribe(data => {
      expect(data.length).toEqual(Object.keys(CoinType).length);
    });
  });

  it('should return all trade operations', () => {
    const mockData = [{tid: 6519678, type: 'buy'}];
    httpClientSpy.get.and.returnValue(of(mockData));
    service.getTrades('BTC').subscribe(data => {
      expect(data).toEqual(mockData);
    });
  });

});

