/** Libraries */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

/** Global Services*/
import { Environment } from '../../../environments/environment';
import { MessageService } from '../../global/message.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { tap } from 'rxjs/operators';

/** Models used by the service */
import { Report } from '../report/model/report';
import { Condition } from '../report/model/condition';
import { Diagnosis } from '../report/model/diagnosis';

@Injectable({
  providedIn: 'root'
})
export class SymptomCheckerDiagnosisService {
  private baseUrl = Environment.apiBaseUrl + Environment.SymptomCheckerServiceUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) { }

  private log(message: string) {
    this.messageService.add(`SymptomCheckerChatlogService: ${message}`);
  }

  /** GET Report by id. Will 404 if id not found */
  get(id: string): Observable<Report> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Response>(url).pipe(
      tap(_ => this.log(`fetched report id=${id}`)),
      map(res => {
        if (res.status < 200 || res.status >= 300) {
          this.router.navigate(['/error']);
          throw new Error('This request has failed ' + res.status);
        } else {
          const report = new Report();
          let conditions = new Array<Condition>();
          if (res['data']) {
            res = res['data'];
          }
          report.age = +res['age'];
          report.name = res['name'].toString();
          report.sex = res['sex'].toString();
          report.email_address = res['email_address'].toString();
          report.createdAt = res['createdAt'];

          if (res && res['data'] && res['data']['conditions']) {
            conditions = res['data']['conditions'];
          } else {
            conditions.forEach(condition => {
              conditions.push(new Condition(
                condition['id'].toString(),
                condition['common_name'].toString(),
                condition['name'].toString(),
                +condition['probability'].toFixed(2)

              ));
            });
          }
          report.diagnosis.conditions = conditions;

          return report;
        }
      },
        catchError(this.handleError<Report>(`getReport`)),
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
