import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterSliderComponent } from './quarter-slider.component';

describe('QuarterSliderComponent', () => {
  let component: QuarterSliderComponent;
  let fixture: ComponentFixture<QuarterSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuarterSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuarterSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
