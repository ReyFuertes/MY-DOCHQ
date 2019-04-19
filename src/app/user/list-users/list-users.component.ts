/**
 * Libraries
 **/
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';
 /**
 * Services
 **/
import { MessageService } from '../../global/message.service';
import { NavListService } from '../../global/nav-list.service';
import { UserService } from '../user.service';

 /**
 * Models used by class
 **/
import { UserListDataSource } from './user-list-datasource';

/** Animations */
import { fadeInAnimation } from '../../animations/fade-in-animation';
import { slideInOutAnimation } from '../../animations/slide-out-animation';
import { animate } from '@angular/animations';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  animations: [fadeInAnimation],
})

export class ListUsersComponent implements OnInit, AfterViewInit {

   /** needed to bind the fade in animation */
   @HostBinding('@fadeInAnimation') animate: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  public selectedUserIndex: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = ['email', 'created_at.date', 'updated_at.date'];
  displayedColumns = ['email'];
  /**
   * @param  {MessageService} privatemsg
   * @param  {NavListService} privatenavListService
   * @param  {UserService} privateuserService
   */
  constructor(
    private msg: MessageService,
    private navListService: NavListService,
    private userService: UserService,
  ) { }
  /**
   * @param  {} this.paginator
   * @param  {} this.sort
   * @param  {} this.userService
   * @param  {} this.msg
   */
  dataSource: UserListDataSource = new UserListDataSource(
    this.paginator,
    this.sort,
    this.userService,
    this.msg);

  /**
   * On initialisation of the component
 */
  ngOnInit() {
    this.dataSource = new UserListDataSource(this.paginator,
      this.sort,
      this.userService,
      this.msg);
    this.dataSource.loadUsers(null, 0, 25);
  }

  /**
 * To run once the view has finished initialising
*/
  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadUsersPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadUsersPage())
      )
      .subscribe();
  }

  /**
   * Updates the data source and add the users to the data table
   */
  loadUsersPage() {
    this.dataSource.loadUsers(
      this.input.nativeElement.value,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  highlight(row) {
    this.selectedUserIndex = row.id;
  }

  clearSelectedUser(clear: boolean) {
    if (clear) {
      this.selectedUserIndex = null;
    }

  }
}
