import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss'
})
export class InvoicesComponent implements OnInit {
  ngOnInit(): void {
    const currentDate = moment().format("DD-MM-YYYY");
    console.log(currentDate);
  }

}
