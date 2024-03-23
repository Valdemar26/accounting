import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IQuarter } from '../components/transactions-list/transactions-list.component';
@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  constructor(private http: HttpClient) { }

  getQuarters(): Observable<any> {
    return this.http.get(`${environment.mainHost}/api/quarters`);
  }

  createQuarter(quarter: IQuarter): Observable<any> {
    return this.http.post(`${environment.mainHost}/api/quarters`, quarter)
  }

  updateQuarters(index: number, quarter: any): Observable<any>{
    return this.http.patch(`${environment.mainHost}/api/quarters/${index}`, quarter)
  }

  deleteQuarters(index: string): Observable<any> {
    return this.http.delete(`${environment.mainHost}/api/quarters/${index}`);
  }
}
