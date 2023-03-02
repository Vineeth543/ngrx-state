import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppReducer } from './store/app.state';
import { AppComponent } from './app.component';
import { NgModule, isDevMode } from '@angular/core';
import { AuthEffects } from './auth/state/auth.effects';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthTokenInterceptor } from './services/AuthToken.intercepter';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomSerializer } from './store/router/custom-serializer';

@NgModule({
  declarations: [AppComponent, routingComponents],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
