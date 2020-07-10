import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { MercadoBitcoinService } from './services/coin.service';
import { reducers } from './reducers/reducer';
import { CoinEffects } from './effects/coin.effect';
import { CoinsListComponent } from './coins-list/coins-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CoinsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([CoinEffects])
  ],
  providers: [MercadoBitcoinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
