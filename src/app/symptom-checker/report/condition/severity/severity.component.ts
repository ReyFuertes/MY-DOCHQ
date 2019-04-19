/** Libraries **/
import { Component, OnInit, Input } from '@angular/core';

/** Enumerations **/
import { Severity } from './severity.enum';

@Component({
  selector: 'app-severity',
  templateUrl: './severity.component.html',
  styleUrls: ['./severity.component.scss']
})
/**
* Component Class for the condition severity view
* @author Tristan Mitchell
*/
export class SeverityComponent implements OnInit {

  severity_enum: Severity;

  @Input()
  severity: string;
  display: string;
  /**
   * Constructs the Severity Class
   * @author Tristan Mitchell
   */
  constructor() { }
  /**
   * @author Tristan Mitchell
   * Initialises the severity component
   */
  ngOnInit() {
    this.display = '';
    this.initialiseDisplayText(this.severity);
  }
  /**
  * Function that maps the severity level to the display text
  * @author Tristan Mitchell
  * @param  {string} level
  * @returns void
  */
  initialiseDisplayText(level: string): void {
    switch (Severity[level]) {
      case Severity.mild:
        this.display = 'Mild';
        break;
      case Severity.moderate:
        this.display = 'Moderate';
        break;
      case Severity.severe:
        this.display = 'Severe';
        break;
      default:
        this.display = 'Error Determining Severity Level';
    }
  }

}
