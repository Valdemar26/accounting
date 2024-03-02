import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaxReportingComponent } from './tax-reporting.component';

const routes: Routes = [
  { path: '', component: TaxReportingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxReportingRoutingModule { }
