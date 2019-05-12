import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BootstrapDateComponent} from './bootstrap-date/bootstrap-date.component';

const routes: Routes = [
  {
    path: '',
    component: BootstrapDateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
