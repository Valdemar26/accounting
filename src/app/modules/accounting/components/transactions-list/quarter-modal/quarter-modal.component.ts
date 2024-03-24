import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IQuarter } from '../../../../../shared/interfaces/shared.interface';

@Component({
  selector: 'app-quarter-modal',
  templateUrl: './quarter-modal.component.html',
  styleUrls: ['./quarter-modal.component.scss']
})
export class QuarterModalComponent implements OnInit {
  @Input() mode!: 'add' | 'edit';
  @Input() quarter!: IQuarter;

  @Output() closeModalEvent = new EventEmitter();
  @Output() submitFormEvent = new EventEmitter<IQuarter>();

  quarterForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    console.log('mode: ', this.mode);
    console.log('quarter: ', this.quarter);
    if (this.mode === 'edit' && this.quarter) {
      this.patchForm();
    }
  }

  initForm(): void {
    this.quarterForm = this.formBuilder.group({
      id: [this.quarter?.id || null],
      quarter: [this.quarter?.quarter || null, Validators.required],
      period: [this.quarter?.period || null, Validators.required],
      total: [this.quarter?.total || null, Validators.required],
      tax: [this.quarter?.tax || null, Validators.required]
    });
  }

  patchForm(): void {
    console.log('patchForm');
    this.quarterForm.patchValue({
      quarter: this.quarter.quarter,
      period: this.quarter.period,
      total: this.quarter.total,
      tax: this.quarter.tax
    });
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  submitForm(): void {
    console.log('submitForm');
    if (this.quarterForm.valid) {
      if (!this.quarterForm.get('id')?.value) {
        this.quarterForm.patchValue({'id': this.generateQuarterId(this.quarterForm.get('period')?.value)})
      }

      this.submitFormEvent.emit(this.quarterForm.value);
      this.closeModal();
    }
  }

  private generateQuarterId(period: string): string {
    const [year, quarter] = period.split(' ');

    const quarterNumber: string = quarter.slice(1);

    return `${year}${quarterNumber}`;
  }
}
