/**
 * Libraries
 **/
import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
/**
* Models
**/
import { Diagnosis } from '../model/diagnosis';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
/**
 * Component class for the Symptom Diagnosis screen
 * @author Tristan Mitchell
 */
export class DiagnosisComponent implements OnInit {

  @Input()
  diagnosis: Diagnosis;

  @Input()
  interviewId: string;

  navigationExtras: NavigationExtras;

  constructor(private router: Router) { }

  ngOnInit() {
    this.navigationExtras = {
      queryParams: { 'interview_id': this.interviewId },
    };
  }
  /**
   * function to navigate to a medical condition with the given ID
   * @author Tristan Mitchell
   * @param  {string} id
   * @returns void
   */
  navigateToCondition(id: string): void {
    console.log(`attempted: symptomchecker/${this.interviewId}/condition/${id}`);
    this.router.navigate([`symptomchecker/${this.interviewId}/condition/${id}`]);
  }
}
