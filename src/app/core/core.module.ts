import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './auth-cookies/api.interceptor';
import { AuthInterceptor } from './auth-cookies/auth.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule

  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() self: CoreModule) {
    if (self) {
      throw new Error('AuthCookiesModule imported more than once.')
    }
  }
}
