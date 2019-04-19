// Librarys
import { Injectable } from '@angular/core';
import { Environment } from '../../environments/environment';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  successMsg(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
  }

  errorMsg(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }

  /** Very basic console throw **/
  add(message: string) {
    if (!Environment.production) { console.log(message); }
  }

  log(message: string) {
    this.add(message);
  }

  error(message: string) {
    this.add(message);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
