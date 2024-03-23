import { Component, OnInit } from '@angular/core';
import { AccountingService } from '../../services/accounting.service';
import { BehaviorSubject } from 'rxjs';

export interface IQuarter {
  id: string;
  quarter: number;
  period: string;
  total: number;
  tax: number;
}

@Component({
  selector: 'app-transactions-list',
  standalone: false,
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss'
})
export class TransactionsListComponent implements OnInit {
  quartersList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private readonly accountingService: AccountingService
  ) {
  }

  ngOnInit(): void {
    this.getQuarters();
  }

  public getQuarters(): void {
    this.accountingService.getQuarters().subscribe(
      (data: any[]) => {
        console.log('getQuarters data: ', data);
        this.quartersList$.next(data);
      },
      error => {
        console.error('Error fetching quarters: ', error);
      }
    );
  }

  addQuarter(): void {
    // TODO rewrite
    const newQuarter: IQuarter = {
      id: this.generateCustomID(2024, 1),
      quarter: 1,
      period: '2024 Q1',
      total: 1000,
      tax: 200
    };

    this.accountingService.createQuarter(newQuarter).subscribe(quarter => {
      console.log('addQuarter: ', quarter);
      this.getQuarters();
    });
  }

  deleteQuarter(id: string): void {
    this.accountingService.deleteQuarters(id).subscribe(quarter => console.log('deleteQuarter: ', quarter));
  }

  editQuarter(index: number, quarter: any): void {
    this.accountingService.updateQuarters(index, quarter).subscribe(quarter => console.log('deleteQuarter: ', quarter));
  }

  private generateCustomID(year: number, quarter: number): string {
    return `${year}${quarter}`;
  }
}
