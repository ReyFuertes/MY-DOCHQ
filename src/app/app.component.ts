/**
 * Libraries
 **/
import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';

/**
* Services
**/
import { LocalStorageService } from './global/local-storage.service';

/**
* Animation
**/
import { fadeInAnimation } from './animations/fade-in-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInAnimation],
})

export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  /** needed to bind the fade in animation */
  @HostBinding('@fadeInAnimation') animate: string;

  mobileQuery: MediaQueryList;
  options = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  private _mobileQueryListener: () => void;

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public appLoading$ = this.loadingSubject.asObservable();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    router.events.subscribe((val) => {
      this.loggedInSubject.next(this.localStorageService.getString('obj') !== null);
    });
  }

  ngOnInit(): void {
    const token = this.localStorageService.getString('obj');
    this.loggedInSubject.next(token !== null);
  }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(): void {
    this.localStorageService.deleteItem('obj');
    this.router.navigate(['/user/login']);
  }
}
