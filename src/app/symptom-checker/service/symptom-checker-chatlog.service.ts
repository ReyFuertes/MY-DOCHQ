/** Libraries */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

// Global Services / components
import { Environment } from '../../../environments/environment';
import { MessageService } from '../../global/message.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/** Models used by the service */
import { Chatlog } from '../report/model/chatlog';
import { Message } from '../report/model/message';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SymptomCheckerChatlogService {
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

  /** GET Chat by id. Will 404 if id not found */
  get(id: string): Observable<Message[]> {
    const url = `${this.baseUrl}/${id}/chat`;
    return this.http.get<Response>(url).pipe(
      tap(_ => this.log(`fetched chatlog id=${id}`)),
      map(res => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        } else {
          let messages = new Array<Message>();
          if (res['data']) {
            messages = res['data'];
          } else {
            messages.forEach(msg => {
              messages.push(new Message(
                msg['type'],
                msg['message'],
                msg['orign']
              ));
            });
          }
          return messages;
        }
      },
        catchError(this.handleError<Chatlog>(`getChatLog`))
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
