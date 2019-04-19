import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatStepperModule } from '@angular/material/stepper';
import { OnboardingMedicalQuestionnaireComponent } from './onboarding-medical-questionnaire.component';
import { OnboardingMedicalQuestionnaireRoutingModule } from './onboarding-medical-questionnaire-routing.module';
/**
 * Global
 */
import { JwtInterceptor } from '../global/jwt.interceptor';
import { AuthGuard } from '../global/auth.guard';
import { SafeHtmlPipe } from '../global/pipes/safe-html.pipe';

import {
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatCheckboxModule,
  MatButtonModule,
  MatListModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    OnboardingMedicalQuestionnaireRoutingModule,
    /** Material Design imports (Start) **/
    MatStepperModule,
    MatCardModule,
    MatListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    /** Material Design imports (End) **/
  ],
  declarations: [OnboardingMedicalQuestionnaireComponent],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ]
})
export class OnboardingMedicalQuestionnaireModule { }
