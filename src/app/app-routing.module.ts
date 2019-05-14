import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BootstrapDateComponent} from './bootstrap-date/bootstrap-date.component';
import {CustomDateRangeComponent} from './custom-date-range/custom-date-range.component';


const routes: Routes = [
  {
    path: '',
    component: BootstrapDateComponent
  },
  {
    path:'customrange',
    component: CustomDateRangeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
