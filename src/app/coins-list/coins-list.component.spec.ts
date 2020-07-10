import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CoinsListComponent } from './coins-list.component';
import { State } from '../reducers/reducer';
import { fetchCoinsPrice, fetchCoinTrades } from '../actions/coin.action';


describe('CoinsListComponent', () => {
  let component: CoinsListComponent;
  let fixture: ComponentFixture<CoinsListComponent>;
  let store: MockStore<State>;
  const initialState = {};
  let dispatchSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinsListComponent ],
      providers: [
        provideMockStore({initialState})
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinsListComponent);
    component = fixture.componentInstance;
    store.setState({coin: {
      prices: [{coin: 'name', low: 0, high: 0}],
      trades: [{tid: 6519679, type: 'buy'}]
    }});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('action fetch coins price should have been called', (done => {
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(fetchCoinsPrice());

    component.coinsPrice$.subscribe((data) => {
      expect(data.length).toEqual(1);
      done();
    });
  }));

  it('action get trades should be called when click', (done => {
    component.detailOperationClick('BTC');
    expect(dispatchSpy).toHaveBeenCalledWith(fetchCoinTrades({coinType: 'BTC'}));

    component.trade$.subscribe((data) => {
      expect(data.length).toEqual(1);
      done();
    });
  }));

  it('should format era unix date timeme', () => {
    const eraUnixTime = 1594404026;
    const expectedValue = '10/07/2020 15:00';
    expect(component.formatDate(eraUnixTime)).toEqual(expectedValue);
  });
});
