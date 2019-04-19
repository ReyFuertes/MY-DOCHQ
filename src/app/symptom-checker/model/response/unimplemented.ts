/**
 * Class for a any unimplemented Response from the symptomChecker API
 */

import { SymptomCheckerResponse } from './symptomchecker-response';

export class Unimplemented implements SymptomCheckerResponse {
    contentType: string;
    inputType: string;
    content: string;

    constructor(json: any) {
        this.contentType = 'unimplemented';
        this.content = JSON.stringify(json).trim();
    }
}
