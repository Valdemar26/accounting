import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxReportingComponent } from './tax-reporting.component';

describe('TaxReportingComponent', () => {
  let component: TaxReportingComponent;
  let fixture: ComponentFixture<TaxReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxReportingComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaxReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
