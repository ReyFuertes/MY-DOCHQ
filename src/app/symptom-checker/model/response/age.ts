/**
 * Class for a Age Response from the symptomChecker API
 */
import { SymptomCheckerResponse } from './symptomchecker-response';

export class Age implements SymptomCheckerResponse {
    contentType: string;
    inputType: string;
    restrictType: string;
    placeholder: string;

    constructor() {
        this.contentType = 'input-area';
        this.inputType = 'text';
        this.restrictType = 'number';
        this.placeholder = 'Please enter your Age';
    }
}
