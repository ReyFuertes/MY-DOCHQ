/**
 * Libraries
 **/
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
/**
* Services
**/
import { SymptomCheckerDiagnosisService } from '../service/symptom-checker-diagnosis.service';
import { MessageService } from '../../global/message.service';
/**
* Models
**/
import { Report } from './model/report';
/** Animations */
import { fadeInAnimation } from '../../animations/fade-in-animation';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  animations: [fadeInAnimation]
})
/**
 * Component class for the Symptom Checker Interview view
 * @author Tristan Mitchell
 */
export class ReportComponent implements OnInit {
  @HostBinding('@fadeInAnimation') animate: string;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public reportloading$ = this.loadingSubject.asObservable();
  public reportSubject: BehaviorSubject<Report> = new BehaviorSubject<Report>(new Report);
  interviewId: string;
  uuidV4Regex: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  /**
   * Subscribes to services and the routing components
   * @author Tristan Mitchell
   * @param  {MessageService} privatemsgService
   * @param  {ActivatedRoute} privateroute
   * @param  {Router} privaterouter
   * @param  {SymptomCheckerDiagnosisService} privatediagnosisService
   */
  constructor(
    private msgService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private diagnosisService: SymptomCheckerDiagnosisService) { }
  /**
   * Initialises the report component
   * @author Tristan Mitchell
   * set starts the spinner  while doing things
   * gets the Interview Id from the URL
   * Validates the ID
   * Initialises the report
   */
  ngOnInit() {
    this.loadingSubject.next(true);
    this.interviewId = this.route.snapshot.params['id'];
    if (!this.uuidV4Regex.test(this.interviewId)) {
      this.router.navigate(['/report/error']);
    }
    this.initialiseReport();
  }
  /**
   * Fetches the interview from the server using the interview ID
   * @author Tristan Mitchell
   * @returns void
   */
  initialiseReport(): void {
    this.diagnosisService.get(this.interviewId).subscribe(
      report => this.reportSubject.next(report),
      error => this.router.navigate(['symptomchecker/report/error']),
      () => this.loadingSubject.next(false)
    );
  }
}
