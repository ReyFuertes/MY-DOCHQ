/** Libraries **/
import { Component, OnInit, Input } from '@angular/core';

/** Enums **/
import { Prevalence } from './prevalence.enum';

@Component({
  selector: 'app-prevalence',
  templateUrl: './prevalence.component.html',
  styleUrls: ['./prevalence.component.scss']
})
/**
 * Component class for the Medical Condition Prevalence View
 * @author Tristan Mitchell
 */
export class PrevalenceComponent implements OnInit {

  prevalence_enum: Prevalence;

  @Input()
  prevalence: string;
  display: string;

  constructor() { }
  /**
   * @author Tristan Mitchell
   * Initialsises the prevalence component
   */
  ngOnInit() {
    this.display = '';
    this.initialiseDisplayText(this.prevalence);
  }

/**
* Function that maps the condition prevalence level to the display text
* @author Tristan Mitchell
* @param  {string} level
* @returns void
*/
  initialiseDisplayText(level: string): void {
    switch (Prevalence[level]) {
      case Prevalence.common:
        this.display = 'Common';
        break;
      case Prevalence.moderate:
        this.display = 'Moderate';
        break;
      case Prevalence.rare:
        this.display = 'Rare';
        break;
      case Prevalence.very_rare:
        this.display = 'Very Rare';
        break;
      default:
        this.display = 'Error Determining Prevalence Level';
    }
  }
}
