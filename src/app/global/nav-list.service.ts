// Librarys
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class NavListService {
  private navStateSource = new Subject<any>();
  private options = [];
  navState$ = this.navStateSource.asObservable();
  
  setNavBarState( state: Array<object> ) {
    this.options = state;
    this.push()
  }

  addNavBarState( state: object ) {
    this.options.push(state);
    this.push();
  }

  private push() {
    this.navStateSource.next( this.options );
  }

}
