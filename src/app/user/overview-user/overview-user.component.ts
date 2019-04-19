/**
 * Libraries
 **/
import { Component, OnInit, Input, Output, OnChanges, OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
* Services
**/
import { UserService } from '../user.service';

/**
* Models used by class
**/
import { User } from '../models/user';

@Component({
  selector: 'app-overview-user',
  templateUrl: './overview-user.component.html',
  styleUrls: ['./overview-user.component.scss']
})
export class OverviewUserComponent implements OnInit, OnChanges, OnDestroy {

  @Input() userId: string;
  @Output() clearSelectedClick: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  public selectedUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  /**
   * Constructor for the ViewUserComponent
   * @param  {UserService} privateuserService
   */
  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  /**
   * Function to detect any changes that have occurred to the variables
   * @param  {any} changes
   */
  ngOnChanges(changes: any): void {
    const userIdChange: string = changes.userId.currentValue;

    if (userIdChange) {
      this.getUser(userIdChange);
    }
  }

  /**
   * Function called when the component is finished with
   */
  ngOnDestroy(): void {
    this.loadingSubject.complete();
    this.selectedUserSubject.complete();
  }
  /**
   * Function to initiate the service call to retreive a user
   * @param  {string} id
   */
  getUser(id: string): void {
    this.loadingSubject.next(true);

    this.userService.get(id).subscribe(user => this.selectedUserSubject.next(user),
      error => console.log(error),
      () => this.loadingSubject.next(false));
  }
  /**
   * function to notify the parent component that the clear event has been triggerd
   * @param  {any} event
   */
  clearUser(event: any): void {
    this.clearSelectedClick.emit(true);
    this.selectedUserSubject.next(null);
  }

}
