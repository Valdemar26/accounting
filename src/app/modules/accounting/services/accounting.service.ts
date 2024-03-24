import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IQuarter } from '../../../shared/interfaces/shared.interface';

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

  updateQuarters(quarter: IQuarter): Observable<any>{
    return this.http.patch(`${environment.mainHost}/api/quarters/${quarter.id}`, quarter)
  }

  deleteQuarters(index: string): Observable<any> {
    return this.http.delete(`${environment.mainHost}/api/quarters/${index}`);
  }
}
