import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './global/auth.guard';
import {UnknownPageComponent} from './unknown-page/unknown-page.component';
import { HomePageComponent } from './home/homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  { path: 'profile', component: ProfileComponent  },

  //temporary routes
  { path: 'homepage', component: HomePageComponent  },

  { path: 'dashboard', component: DashboardComponent }, //, canActivate: [AuthGuard] 
  { path: 'user', loadChildren: '../app/user/user.module#UserModule' },
  { path: 'symptomchecker', loadChildren: '../app/symptom-checker/symptom-checker.module#SymptomCheckerModule' },
  { path: 'onboarding', loadChildren: '../app/onboarding-medical-questionnaire/onboarding-medical-questionnaire.module#OnboardingMedicalQuestionnaireModule' },
  { path: '**', component: UnknownPageComponent },

    
];

@NgModule({
  imports: [
  // Use below definition when debugging
    // RouterModule.forRoot(routes, { enableTracing: true } )
    RouterModule.forRoot( routes )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
