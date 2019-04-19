import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  exports: [CalendarComponent],
  providers: [],
})
export class AbsenceModule { }