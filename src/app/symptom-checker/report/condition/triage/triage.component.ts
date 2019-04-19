/** Libraries **/
import { Component, OnInit, Input } from '@angular/core';

/** Enums **/
import { TriageLevel } from './triage-level.enum';

@Component({
  selector: 'app-triage',
  templateUrl: './triage.component.html',
  styleUrls: ['./triage.component.scss']
})/**
/**
 * Component class for the Triage Level View
 * @author Tristan Mitchell
 */
export class TriageComponent implements OnInit {
  triage_level_enum: TriageLevel;

  @Input()
  triage_level: string;
  constructor() { }

  display: string;

  /**
 * @author Tristan Mitchell
 * Initialises the acuteness component
 */
  ngOnInit() {
    this.display = '';
    this.initialiseDisplayText(this.triage_level);
  }
  /**
   * Function to map the triage level to its corresponding display text
   * @author Tristan Mitchell
   * @param  {string} level the level of triage
   * @returns void
   */
  initialiseDisplayText(level: string): void {
    switch (TriageLevel[level]) {
      case TriageLevel.consultation:
        this.display = 'Consultation';
        break;
      case TriageLevel.emergency:
        this.display = 'Emergency';
        break;
      case TriageLevel.self_care:
        this.display = 'Self Care';
        break;
      default:
        this.display = 'Error Determining Triage Level';
    }
  }

}
