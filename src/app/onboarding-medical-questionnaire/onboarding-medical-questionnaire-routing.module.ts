import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnboardingMedicalQuestionnaireComponent } from './onboarding-medical-questionnaire.component';

const routes: Routes = [
  { path: '', component: OnboardingMedicalQuestionnaireComponent }
];

@NgModule({
  imports: [
    [RouterModule.forChild(routes)]
  ],
  declarations: []
})
export class OnboardingMedicalQuestionnaireRoutingModule { }
