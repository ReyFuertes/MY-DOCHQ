/**
 * Libraries
 */
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { AuthGuard } from './global/auth.guard';

/**
 * Modules
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutModule } from '@angular/cdk/layout';
import { LoadingScreenModule } from './loading-screen/loading-screen.module';
import {
  MatToolbarModule,
  MatSnackBarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
/**
 * Components
 */
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageComponent } from './global/message/message.component';
import { UnknownPageComponent } from './unknown-page/unknown-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Environment } from '../environments/environment';
import { HomePageComponent } from './home/homepage/homepage.component';
import { DialogComponent } from './dialog/dialog.component';
import { AbsenceModule } from './absence/absence.module';
import { BradFordComponent } from './bradford-report/bradford-report.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessageComponent,
    UnknownPageComponent,
    DialogComponent,
    BradFordComponent,
    ProfileComponent,
    //temporary declaration
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LayoutModule,
    AppRoutingModule,
    LoadingScreenModule,
    AbsenceModule,

    /** Material Design imports (Start) **/
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: Environment.production })
    /** Material Design imports (End) **/
  ],
  providers: [
    AuthGuard,
    MatDatepickerModule
  ],

  entryComponents: [DialogComponent],
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
