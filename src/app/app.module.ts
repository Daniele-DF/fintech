import { CoreModule } from './core/core.module';
import { MaterialModule } from './shared/material/material.module';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    DashboardModule,
    MaterialModule,
    HttpClientModule,
    CoreModule,
    HttpClientXsrfModule.withOptions({
    cookieName: 'XSRF-TOKEN',
     headerName: 'X-XSRF-TOKEN',
     })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
