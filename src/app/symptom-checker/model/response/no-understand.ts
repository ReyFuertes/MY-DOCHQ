/**
 * Class for a Misunderstood Response from the symptomChecker API
 */
import { SymptomCheckerResponse } from './symptomchecker-response';

export class NoUnderstand implements SymptomCheckerResponse {
    dataType: string;
    contentType: string;
    inputType: string;
    restrictType: string;
    placeholder: string;

    constructor() {
        this.dataType = 'text';
        this.contentType = 'input-area';
        this.inputType = 'text';
        this.restrictType = 'text';
        this.placeholder = '';
    }
}
