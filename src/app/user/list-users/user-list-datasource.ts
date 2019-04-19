// Libraries
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { map, timeout } from 'rxjs/operators';

// Global
import { Compare } from '../../global/comparison/compare';

// Services
import { MessageService } from '../../global/message.service';
import { UserService } from '../user.service';

// Models used by class
import { UserCollection } from '../models/usercollection';
import { User } from '../models/user';


export class UserListDataSource implements DataSource<User> {

    private compare = new Compare;

    private userCollectionSubject: BehaviorSubject<UserCollection> = new BehaviorSubject<UserCollection>(new UserCollection);
    public userDataSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    /**
     * @param  {MatPaginator} privatepaginator
     * @param  {MatSort} privatesort
     * @param  {UserService} privateuserService
     * @param  {MessageService} privatemessageService
     */
    constructor(
        private paginator: MatPaginator,
        private sort: MatSort,
        private userService: UserService,
        private messageService: MessageService
    ) { }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    /**
     * @param  {CollectionViewer} collectionViewer
     */
    connect(collectionViewer: CollectionViewer): Observable<User[]> {

        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        const dataMutations = [
            this.userDataSubject.asObservable(),
            this.paginator.page,
            this.sort.sortChange
        ];

        this.paginator.length = this.userDataSubject.value.length;

        return merge(...dataMutations).pipe(map(() => {
            return this.getPagedData(this.getSortedData([...this.userDataSubject.value]));
        }));

    }
    /**
     * @param  {string} search
     * @param  {number} pageIndex
     * @param  {number} pageSize
     *
     * function used for updating the user list data table
     */
    loadUsers(search: string, pageIndex: number, pageSize: number) {
        this.loadingSubject.next(true);

        // clear the table once the search has started
        this.userDataSubject.next([]);

        // set the filter criteria
        const filterCriteria = search ? new RegExp(search.trim(), 'gm') : new RegExp('[\\s\\S]', 'gm');

        this.userService.getAllUsers().subscribe(
            users => {
                this.userDataSubject.next(users.filter(f =>
                    f.email_address.match(filterCriteria)));
            },
            e => {
                this.messageService.error(`Error - ${JSON.stringify(e)}`);
                this.messageService.errorMsg(
                    'An error has occurred loading users, if this persists please try again later or contact support.');
                this.loadingSubject.next(false);
            },
            () => this.loadingSubject.next(false)
        );
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     *  any open connections or free any held resources that were set up during connect.
     */
    disconnect(collectionViewer: CollectionViewer): void {
        this.userCollectionSubject.complete();
        this.loadingSubject.complete();
        this.userDataSubject.complete();
    }

    /**
     * Paginate the data (client-side). If you're using server-side pagination,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getPagedData(data: User[]) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getSortedData(collection: User[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return collection;
        }

        return collection.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'email':
                    return this.compare.compareString(a._email, b._email, isAsc);
                    break;
                case 'id':
                    return this.compare.compareNumber(+a._id, +b._id, isAsc);
                    break;
                case 'created_at.date':
                    return this.compare.compareDate(a._created_at.date, b._created_at.date, isAsc);
                    break;
                case 'updated_at.date':
                    return this.compare.compareDate(a.modified_at.date, b.modified_at.date, isAsc);
                    break;
                default:
                    return 0;
                    break;
            }
        });
    }
}
