import { Component, OnInit } from '@angular/core';
import { AccountingService } from '../../services/accounting.service';
import { BehaviorSubject } from 'rxjs';
import { IQuarter } from '../../../../shared/interfaces/shared.interface';

@Component({
  selector: 'app-transactions-list',
  standalone: false,
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss'
})
export class TransactionsListComponent implements OnInit {
  quartersList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  modalMode: 'add' | 'edit' = 'add'; // Variable to control modal mode (add/edit)
  quarters: IQuarter[] = []; // Variable to hold the list of quarters
  selectedQuarter: IQuarter | null = null;
  isModalOpen: boolean = false;

  constructor(
    private readonly accountingService: AccountingService,
  ) {
  }

  ngOnInit(): void {
    this.getQuarters();
  }

  public getQuarters(): void {
    this.accountingService.getQuarters().subscribe(
      (data: IQuarter[]) => {
        console.log('getQuarters data: ', data);
        data.map((quarter: IQuarter) => {
          if (!quarter.id) {
            quarter.id = this.generateQuarterId(quarter.period)
          }
        })
        this.quartersList$.next(data);
        this.quarters = data;
      },
      error => {
        console.error('Error fetching quarters: ', error);
      }
    );
  }

  openAddModal(): void {
    console.log('openAddModal');
    this.modalMode = 'add';
    this.isModalOpen = true;
  }

  openEditModal(quarter: IQuarter): void {
    console.log(quarter);
    this.modalMode = 'edit';
    this.selectedQuarter = quarter;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.modalMode = 'add'; // Reset modal mode to 'add' when closing the modal
    this.isModalOpen = false;
  }

  submitForm(quarter: IQuarter): void {
    if (this.modalMode === 'add') {
      this.accountingService.createQuarter(quarter).subscribe(newQuarter => {
        console.log('Quarter added:', newQuarter);
        this.getQuarters(); // Refresh the list of quarters after adding a new quarter
      });
    } else if (this.modalMode === 'edit') {
      console.log('quarter: ', quarter);
      this.accountingService.updateQuarters(quarter).subscribe(updatedQuarter => {
        console.log('Quarter updated:', updatedQuarter);
        this.getQuarters();
      });
    }
  }

  deleteQuarter(quarter: IQuarter): void {
    if (!quarter.id) {
      quarter.id = this.generateQuarterId(quarter.period)
    }
    console.log('deleteQuarter: ', quarter);
    this.accountingService.deleteQuarters(quarter.id).subscribe(quarter => {
      console.log('deleteQuarter: ', quarter);
      this.getQuarters();
    });
  }

  private generateQuarterId(period: string): string {
    const [year, quarter] = period.split(' ');

    const quarterNumber: string = quarter.slice(1);

    return `${year}${quarterNumber}`;
  }
}
