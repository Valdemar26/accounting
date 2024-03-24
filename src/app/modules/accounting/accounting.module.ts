import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { QuarterSliderComponent } from './components/quarter-slider/quarter-slider.component';
import { AccountingComponent } from './accounting.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { QuarterModalComponent } from './components/transactions-list/quarter-modal/quarter-modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountingComponent,
    QuarterSliderComponent,
    TransactionsListComponent,
    QuarterModalComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    AccountingRoutingModule,
    ReactiveFormsModule,

  ]
})
export class AccountingModule { }
