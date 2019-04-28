/** Libraries */
import { Component, HostBinding, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';

/** Animations */
import { fadeInAnimation } from '../animations/fade-in-animation';
import { slideInOutAnimation } from '../animations/slide-out-animation';
import { animate } from '@angular/animations';
import { LocalStorageService } from '../global/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeInAnimation]
})
export class DashboardComponent implements OnInit {

  /** needed to bind the fade in animation */
  @HostBinding('@fadeInAnimation') animate: string;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  public selectCard(selectedCard: any): void {
    localStorage.setItem('selected_dashboard_card', JSON.stringify(selectedCard))
  }

  public getSelectedCard(): any {
    return this.localStorageService.getString('selected_dashboard_card')
      ? this.localStorageService.getString('selected_dashboard_card')
      : this.selectCard(1);
  }

  public getSidebarMenu(): any {
    return this.localStorageService.getString('sidebar_menu')
      ? this.localStorageService.getString('sidebar_menu')
      : this.selectCard(1);
  }

  constructor(private localStorageService: LocalStorageService, private breakpointObserver: BreakpointObserver) {

  }

  public selectMenu(index: number): void {
    localStorage.setItem('sidebar_menu', JSON.stringify(index));
  }

  ngOnInit(): void {
    this.selectMenu(1);
  }
}
