import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { QuarterSliderComponent } from './components/quarter-slider/quarter-slider.component';
import { AccountingComponent } from './accounting.component';
import { TransactionsListComponent } from './components/transactions-list/transactions-list.component';
import { ProgressComponent } from './components/transactions-list/progress/progress.component';
import { DndDirective } from './directives/dnd.directive';


@NgModule({
  declarations: [
    AccountingComponent,
    QuarterSliderComponent,
    ProgressComponent,
    DndDirective,
    TransactionsListComponent,
  ],
  exports: [
    ProgressComponent,
    DndDirective
  ],
  imports: [
    CommonModule,
    AccountingRoutingModule,

  ]
})
export class AccountingModule { }
