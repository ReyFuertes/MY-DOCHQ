/** Libraries **/
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
/** services **/
import { SymptomCheckerConditionService } from '../../service/symptom-checker-condition.service';
import { MessageService } from '../../../global/message.service';
/** Models **/
import { Condition } from '../model/condition';
/** Animations */
import { fadeInAnimation } from '../../../animations/fade-in-animation';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss'],
  animations: [fadeInAnimation]
})
/**
 * Component class for the Symptom Condition screen
 * @author Tristan Mitchell
 */
export class ConditionComponent implements OnInit {
  /** needed to bind the fade in animation */
  @HostBinding('@fadeInAnimation') animate: string;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public conditionloading$ = this.loadingSubject.asObservable();
  public conditionSubject: BehaviorSubject<Condition> = new BehaviorSubject<Condition>(new Condition('', '', ''));
  conditionId: string;
  interviewId: string;
  /**
   * Set up the routing and and subscribe to services
   * @author Tristan Mitchell
   * @param  {MessageService} msgService sets up an instance of the shared messaging service
   * @param  {Router} router sets up a instance of a Router
   * @param  {ActivatedRoute} route sets up an instance of an Activated Route
   */
  constructor(
    private msgService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private conditionService: SymptomCheckerConditionService
  ) {
  }
  /**
   * activates the loading spinner
   * gets the condition ID from the query params
   * Gets the condition from from the server
   * @author Tristan Mitchell
   */
  ngOnInit() {
    this.loadingSubject.next(true);
    this.conditionId = this.route.snapshot.params['c_id'];
    this.interviewId = this.route.snapshot.params['id'];
    this.conditionSubject.next(new Condition('', '', ''));
    this.conditionService.get(this.conditionId).subscribe(
      condition => this.conditionSubject.next(condition),
      error => this.router.navigate(['symptomchecker/report/error']),
      () => this.loadingSubject.next(false));
  }
  /**
   * Function to redirect to the interview with the given ID
    * @author Tristan Mitchell
   * @returns void
   */
  navigateToReport(): void {
    this.router.navigate([`symptomchecker/${this.interviewId}`]);
  }
  /**
   * Function to determine if the common name is different to the official name
   * @author Tristan Mitchell
   * @returns boolean
   */
  showCommonName(): boolean {
    return this.conditionSubject.getValue().name !== this.conditionSubject.getValue().common_name;
  }
}
