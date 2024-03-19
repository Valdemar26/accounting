import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AccountingService {

  constructor(private http: HttpClient) { }

  getQuarters(): Observable<any> {
    return this.http.get(`${environment.mainHost}/api/quarters`);
  }

  setQuarters(): Observable<any> {
    return this.http.post(`${environment.mainHost}/api/quarters`,
      {
        "quarter": "2",
        "period": "",
        "total": "3500"
      }
      );
  }

  deleteQuarters(): Observable<any> {
    return this.http.delete(`${environment.mainHost}/api/quarters`);
  }
}
