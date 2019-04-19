/**
 * Libraries
 **/
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

/**
 * services
 **/
import { SymptomCheckerChatlogService } from '../../service/symptom-checker-chatlog.service';
import { MessageService } from '../../../global/message.service';

/**
 * Classes
**/
import { Message } from '../model/message';
import { MessageAnswer } from '../model/message-answer';

@Component({
  selector: 'app-chatlog',
  templateUrl: './chatlog.component.html',
  styleUrls: ['./chatlog.component.scss']
})
/**
* Component class for the Symptom Checker Chatlog View
* @author Tristan Mitchell
*/
export class ChatlogComponent implements OnInit {

  /** Needed to determine which chat to retrieve from the server */
  @Input()
  interviewId: string;

  @Input()
  intervieweeName: string;

  public chatlogSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  /** Regular expression that will remove " marks from a string */
  stripQuotesRegex = /"([^"]+(?="))"/g;

  constructor(
    private msgService: MessageService,
    private chatlogService: SymptomCheckerChatlogService) { }

  ngOnInit() {
    this.chatlogSubject.next([]);
    this.chatlogService.get(this.interviewId).subscribe(
      log => this.chatlogSubject.next(this.sanitiseLog(log)));
  }

  /**
   * Function that taking in an array of Messages and manipulates the contents for the view
   *
   * @author Tristan Mitchell
   * @author Peter Holt <peter.holt@dochq.co.uk
   * @param  {Array<Message>} msgs an array of chatlog messages
   * @returns Array of chatlog messages
   */
  sanitiseLog(msgs: Array<Message>): Array<Message> {
    const tempLog: Array<Message> = [];
    msgs.forEach(msg => {
      if (msg.type === 'start_chat') {
        return;
      }
      if (msg.type === 'answer') {
        try {
          const test = JSON.parse(msg.message);
          const obj = new MessageAnswer(test.id, test.choice_id);
          msg.message = this.determineAnswerResponse(obj.choice_id);
        } catch (error) {
          this.msgService.error(error);
        }
      }
      if (msg.type == 'risk_factor' && msg.origin == 'user') {
        try{
          let message = JSON.parse(msg.message);
          msg.message = (message.choice_id == 'present' ? 'Yes' : 'No');
        } catch (error) {
          this.msgService.error(error);
        }
      }
      if (msg.message) {
        msg.message = msg.message.replace(this.stripQuotesRegex, '$1');
        tempLog.push(msg);
      }
    });
    return tempLog;
  }
  /**
   * Function that maps the choice ID to the correct response
   * @author Tristan Mitchell
   * @param  {string} value to determine the users answer
   * @returns string
   */
  determineAnswerResponse(value: string): string {
    switch (value) {
      case 'present':
        return 'yes';
      case 'absent':
        return 'no';
      case 'unknown':
        return 'I don\'t know';
      default:
        return 'error occured retrieving answer';
    }
  }
}
