import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BootstrapDateComponent} from './bootstrap-date/bootstrap-date.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
