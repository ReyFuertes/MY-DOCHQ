/** Libraries **/
import { Component, OnInit, Input } from '@angular/core';
/** Enums **/
import { Acuteness } from './acuteness.enum';

@Component({
  selector: 'app-acuteness',
  templateUrl: './acuteness.component.html',
  styleUrls: ['./acuteness.component.scss']
})
/**
 * Component class for the a medical conditions acuteness
 * 
 * @author Tristan Mitchell
 */
export class AcutenessComponent implements OnInit {

  acuteness_enum: Acuteness;

  @Input()
  acuteness: string;
  display: string;

/**
 * Initialises the acuteness component
 * 
 * @author Tristan Mitchell
 */
  ngOnInit() {
    this.display = '';
    this.initialiseDisplayText(this.acuteness);
  }
  /**
   * Function to map the conditions acuteness to the relevant display
   * 
   * @author Tristan Mitchell
   * @param  {string} level
   * @returns void
   */
  initialiseDisplayText(level: string): void {
    switch (Acuteness[level]) {
      case Acuteness.acute:
        this.display = 'Acute';
        break;
      case Acuteness.acute_potentially_chronic:
        this.display = 'Acute Potentially Chronic';
        break;
      case Acuteness.chronic:
        this.display = 'Chronic';
        break;
      case Acuteness.chronic_with_exacerbations:
        this.display = 'Chronic With Exacerbations';
        break;
      default:
        this.display = 'Error Determining Acuteness Level';
    }
  }

}
