import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BootstrapDateComponent } from './bootstrap-date/bootstrap-date.component';
import { CustomDateRangeComponent } from './custom-date-range/custom-date-range.component';

@NgModule({
  declarations: [
    AppComponent,
    BootstrapDateComponent,
    CustomDateRangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
