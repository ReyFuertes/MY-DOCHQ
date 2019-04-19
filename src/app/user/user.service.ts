// Librarys
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { catchError, map, tap, filter, timeout } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// Global Services / components
import { Environment } from '../../environments/environment';
import { MessageService } from '../global/message.service';

// Models used by the service
import { User } from './models/user';
import { UserCollection } from './models/usercollection';
import { LoginForm } from './models/loginform';
import { RegisterForm } from './models/registerform';
import { LoginResponse } from './models/loginresponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = Environment.apiBaseUrl + Environment.userServiceUrl;
  private userList: Array<User>;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private outgoingHttpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  /** GET User Collection from the server */
  getUserCollection(): Observable<UserCollection> {
    return this.http.get<JSON>(this.baseUrl, this.httpOptions).pipe(
      map(res => new UserCollection().deserialize(res)));
  }

  /** GET Users from the server */
  getAllUsers(): Observable<User[]> {

    return this.http.get<Response>(this.baseUrl, this.httpOptions).pipe(
      timeout(3000),
      tap(_ => this.log(`fetched users`)),
      map(res => {
        // If request fails, throw an Error that will be caught
        if (res.status < 200 || res.status >= 300) {
          throw new Error('This request has failed ' + res.status);
        } else {
          return res['data'];
        }
      },
        catchError(this.handleError<UserCollection>(`getAllUsers`))
      ));
  }

  /** GET User by id. Will 404 if id not found */
  get(id: string): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      map(res => new User().deserialize(res)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /** PUT: Update the user on the server */
  update(user: User): Observable<Response> {
    const url = `${this.baseUrl}/${user._id}`;
    return this.http.put(url, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user._id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /** POST: Add a new user to the server */
  add(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user, this.httpOptions).pipe(
      tap((u: User) => this.log(`added user w/ id=${u.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** DELETE: Delete the user from the server */
  delete(user: User): Observable<User> {
    const url = `${this.baseUrl}/${user._id}`;
    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${user._id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /** POST: Register a new user */
  register(user: RegisterForm): Observable<User> {
    const body = Object.keys(user)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(user[k]))
      .join('&');
    return this.http.post<User>(this.baseUrl, body, this.outgoingHttpOptions).pipe(
      tap((u: User) => this.log(`added user w/ id=${u.id}`)),
      catchError(this.registerHandleError<User>('registerUser'))
    );
  }

  /** POST: Send the user's credentials off and get a token **/
  login(login: LoginForm): Observable<LoginResponse> {
    const url = `${this.baseUrl}/login`;
    const body = Object.keys(login)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(login[k]))
      .join('&');

    return this.http.post<LoginResponse>(url, body, this.outgoingHttpOptions).pipe(
      tap(_ => this.log(`Attempted Login`)),
      catchError(this.loginHandleError<LoginResponse>('loginUser'))
    );
  }

  /** GET: fetch the user fields validation messages from a JSON file **/
  getValidationMessages(): Observable<any> {
    return of(require('./validation-messages.json'));
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

  /**
   * Handle Register Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private registerHandleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      if(error.error){
        const resError = error.error;
        const message = (resError.error) ? resError.error : 'Something went wrong. Please try again.'

        this.messageService.error(`${message}`);
        this.messageService.errorMsg(`${message}`, true);
      } else {
        this.messageService.error(`${error.statusText}`);
        this.messageService.errorMsg(`${error.status} - ${error.statusText}`, true);
      }

      return of(result as T);
    };
  }

  /**
   * Handle Login Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private loginHandleError<T>(operation = 'operation', result?: T) {
    return (error: HttpResponse<any>): Observable<T> => {

      this.messageService.error(`${error.status} - ${error.statusText}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);

    };
  }
}
