import { Component, OnInit } from '@angular/core';
import { AccountingService } from '../../services/accounting.service';

@Component({
  selector: 'app-quarter-slider',
  standalone: false,
  templateUrl: './quarter-slider.component.html',
  styleUrl: './quarter-slider.component.scss'
})
export class QuarterSliderComponent implements OnInit {
  public carousels = [];

  constructor(private readonly accountingService: AccountingService) {
  }

  ngOnInit(): void {
    this.getQuarters();
  }

  public getQuarters(): void {
    this.accountingService.getQuarters().subscribe(data => console.log(data))
  }
}
