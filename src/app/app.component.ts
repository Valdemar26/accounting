import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  totalSum: number = 0;
  counter: number = 0;
  averageRate: number | null = null;

  async calculateRate() {
    const defaultDates = this.getDefaultDates();
    const dateFrom: string = defaultDates.from;
    const dateTo: string = defaultDates.to;

    this.validateNotEmpty(dateFrom, 'FROM');
    this.validateNotEmpty(dateTo, 'TO');

    console.log(dateFrom);
    console.log(dateTo);

    this.counter = 0;
    this.totalSum = 0;

    try {
      const response: Response = await fetch(`https://www.money.pl/api/graphql?query=query%20timevalue(%24symbol%3A%20String!%2C%20%24date_start%3A%20String%2C%20%24date_end%3A%20String)%20%7B%0A%20%20data%3A%20timeline_raw_nbp_values(symbol%3A%20%24symbol%2C%20date_start%3A%20%24date_start%2C%20date_end%3A%20%24date_end%2C%20add_diffs%3A%20true)%20%7B%0A%20%20%20%20table_name%0A%20%20%20%20time%0A%20%20%20%20close%0A%20%20%20%20diff%0A%20%20%20%20__typename%0A%20%20%7D%0A%7D%0A&operationName=timevalue&variables=%7B%22symbol%22%3A%22EUR.n%22%2C%22date_start%22%3A%22${dateFrom}%22%2C%22date_end%22%3A%22${dateTo}%22%7D`, {
        headers: {
          'x-api': 'timevalue'
        }
      });

      const jsonData = await response.json();
      const responseData = jsonData.data.data;
      console.log(jsonData.data.data);

      responseData.forEach((item: any): void => {
        const rate: number = parseFloat(item.close);
        this.counter += 1;
        this.totalSum += rate;
      });

      this.averageRate = parseFloat((this.totalSum / this.counter).toFixed(4));

      console.log('Total Sum:', this.totalSum);
      console.log('Counter:', this.counter);
      console.log('AVERAGE RATE:', this.averageRate);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  private validateNotEmpty(param: string, name: string): void {
    if (!param) {
      console.error(`${name} cannot be empty`);
      throw new Error(`${name} cannot be empty`);
    }
  }

  private getDefaultDates() {
    const now: Date = new Date();
    const firstDayPrevMonth: Date = new Date(now.getFullYear(), now.getMonth() - 1, 2);
    const lastDayPrevMonth: Date = new Date(now.getFullYear(), now.getMonth(), 1);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    return {
      from: formatDate(firstDayPrevMonth),
      to: formatDate(lastDayPrevMonth),
    };
  }
}
