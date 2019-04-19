import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SymptomCheckerComponent } from './symptom-checker.component';
import { ReportComponent } from './report/report.component';
import { ErrorComponent } from './report/error/error.component';
import { ConditionComponent } from './report/condition/condition.component';

const routes: Routes = [
  { path: '', component: SymptomCheckerComponent },
  { path: 'report/', redirectTo: 'report/error' },
  { path: 'condition/', redirectTo: 'report/error' },
  { path: 'report/error', component: ErrorComponent },
  { path: ':id', component: ReportComponent },
  { path: ':id/condition/:c_id', component: ConditionComponent },
];

@NgModule({
  imports: [
    [RouterModule.forChild(routes)]
  ],
  declarations: []
})
export class SymptomCheckerRoutingModule { }
