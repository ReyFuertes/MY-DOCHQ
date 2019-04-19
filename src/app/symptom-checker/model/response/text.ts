/**
 * Class for a Text and Conditions Response from the symptomChecker API
 */
import { SymptomCheckerResponse } from './symptomchecker-response';

export class Text implements SymptomCheckerResponse {
    contentType: string;
    inputType: string;
    restrictType: string;
    placeholder: string;

    constructor() {
        this.contentType = 'input-area';
        this.inputType = 'text';
        this.restrictType = 'text';
        this.placeholder = '';
    }
}
