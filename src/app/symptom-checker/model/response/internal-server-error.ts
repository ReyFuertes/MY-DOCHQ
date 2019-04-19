/**
 * Class for an Internal error Response from the symptomChecker API
 */
import { SymptomCheckerResponse } from './symptomchecker-response';

export class InternalServerError implements SymptomCheckerResponse {
    contentType: string;
    inputType: null;

    constructor() {
        this.contentType = 'error';
    }
}
