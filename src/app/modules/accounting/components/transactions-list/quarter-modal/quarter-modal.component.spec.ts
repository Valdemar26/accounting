import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterModalComponent } from './quarter-modal.component';

describe('QuarterModalComponent', () => {
  let component: QuarterModalComponent;
  let fixture: ComponentFixture<QuarterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuarterModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuarterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
