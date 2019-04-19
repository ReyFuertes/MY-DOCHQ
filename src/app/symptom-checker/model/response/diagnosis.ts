/**
 * Class for a Diagnosis Response from the symptomChecker API
 */
import { SymptomCheckerResponse } from './symptomchecker-response';
import { Button } from './button';

export class Diagnosis implements SymptomCheckerResponse {
    contentType: string;
    message: string;
    inputType: string;
    probability: string;
    prevalence: string;
    buttons: Array<Button>;

    constructor(msg: string, probability: string) {

        const p = +probability;

        this.contentType = 'diagnosis';
        this.message = msg;
        this.inputType = 'buttons';
        this.probability = p.toFixed(2);
        this.prevalence = '';
        this.buttons = [
            new Button('Try Again', 'restart'),
            new Button('Close', 'close'),
            new Button('Book Appointment', 'book_appointment'),
        ];
    }
}
