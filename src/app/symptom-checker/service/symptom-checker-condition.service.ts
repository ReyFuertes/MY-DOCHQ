/** Libraries */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';

// Global Services / components
import { Environment } from '../../../environments/environment';
import { MessageService } from '../../global/message.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

/** Models used by the service */
import { Condition } from '../report/model/condition';

@Injectable({
  providedIn: 'root'
})
export class SymptomCheckerConditionService {
  private baseUrl = Environment.apiBaseUrl + Environment.SymptomCheckerServiceUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router) {
  }


  private log(message: string) {
    this.messageService.add(`SymptomCheckerConditionService: ${message}`);
  }

  /** GET Condition by id. Will 404 if id not found */
  get(id: string): Observable<Condition> {
    const url = `${this.baseUrl}/-/condition/${id}`;
    return this.http.get<Response>(url).pipe(
      tap(_ => this.log(`fetched Condition id=${id}`)),
      map(res => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        } else {
          return res['data'];
        }
      },
        catchError(this.handleError<Condition>(`getCondition`)),
      ));
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.messageService.error(`${error.statusText}`);
      this.messageService.errorMsg(`${error.status} - ${error.statusText}`, true);

      return of(result as T);
    };
  }
}
