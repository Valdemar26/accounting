import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { QuarterSliderComponent } from './components/quarter-slider/quarter-slider.component';
import { AccountingComponent } from './accounting.component';


@NgModule({
  declarations: [
    AccountingComponent,
    QuarterSliderComponent
  ],
  imports: [
    CommonModule,
    AccountingRoutingModule,
  ]
})
export class AccountingModule { }
