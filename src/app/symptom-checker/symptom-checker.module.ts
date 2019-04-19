/**
 * Libraries
 */
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
/**
 * Global
 */
import { JwtInterceptor } from '../global/jwt.interceptor';
import { AuthGuard } from '../global/auth.guard';
import { SafeHtmlPipe } from '../global/pipes/safe-html.pipe';

/**
 * Services
 */
import { SymptomCheckerService } from './service/symptom-checker.service';
import { SymptomCheckerRoutingModule } from './symptom-checker-routing.module';
import { SymptomCheckerChatlogService } from './service/symptom-checker-chatlog.service';
import { SymptomCheckerConditionService } from './service/symptom-checker-condition.service';
import { SymptomCheckerDiagnosisService } from './service/symptom-checker-diagnosis.service';

/**
 * Report Components
 */
import { ReportComponent } from './report/report.component';
import { DiagnosisComponent } from './report/diagnosis/diagnosis.component';
import { ChatlogComponent } from './report/chatlog/chatlog.component';

/**
 * Symptom Checker Components
 */
import { SymptomCheckerComponent } from './symptom-checker.component';

import {
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatChipsModule,
  MatExpansionModule,
  MatTabsModule,
  MatBadgeModule,
  MatGridListModule,
  MatSelectModule,
  MatOptionModule,
  MatListModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { Chatlog } from './report/model/chatlog';
import { ErrorComponent } from './report/error/error.component';
import { ConditionComponent } from './report/condition/condition.component';
import { NhsContentComponent } from './report/nhs-content/nhs-content.component';
import { from } from 'rxjs';
import { SeverityComponent } from './report/condition/severity/severity.component';
import { PrevalenceComponent } from './report/condition/prevalence/prevalence.component';
import { AcutenessComponent } from './report/condition/acuteness/acuteness.component';
import { TriageComponent } from './report/condition/triage/triage.component';
import { LoadingScreenModule } from '../loading-screen/loading-screen.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    HttpModule,
    SymptomCheckerRoutingModule,
    LoadingScreenModule,
    /** Material Design imports (Start) **/
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatTabsModule,
    MatExpansionModule,
    MatInputModule,
    MatChipsModule,
    MatGridListModule,
    MatBadgeModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    /** Material Design imports (End) **/
  ],
  declarations: [
    SymptomCheckerComponent,
    ReportComponent,
    DiagnosisComponent,
    ChatlogComponent,
    ErrorComponent,
    ConditionComponent,
    NhsContentComponent,
    SeverityComponent,
    PrevalenceComponent,
    AcutenessComponent,
    TriageComponent,
    SafeHtmlPipe
  ],
  providers: [
    SymptomCheckerService,
    SymptomCheckerChatlogService,
    SymptomCheckerDiagnosisService,
    SymptomCheckerConditionService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ]
})
export class SymptomCheckerModule { }
