/* Libraries **/
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nhs-content',
  templateUrl: './nhs-content.component.html',
  styleUrls: ['./nhs-content.component.scss']
})
/**
 * Component class for the NHS sourced information on a medical condition
 * @author Tristan Mitchell
 */
export class NhsContentComponent implements OnInit {

  @Input()
  content: any;

  @Input()
  author: any;

  /**
   * Constructs the NHS Content
   * @author Tristan Mitchell
   */
  constructor() { }

  /**
* @author Tristan Mitchell
* Initialises the NHS Content component
*/
  ngOnInit() {
  }

}
