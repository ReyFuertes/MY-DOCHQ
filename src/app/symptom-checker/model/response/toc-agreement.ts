/**
 * Class for a Terms and Conditions Response from the symptomChecker API
 */

import { SymptomCheckerResponse } from './symptomchecker-response';
import { Button } from './button';

export class TocAgreement implements SymptomCheckerResponse {
    contentType: string;
    inputType: string;
    buttons: Array<Button>;

    constructor() {
        this.contentType = 'toc';
        this.inputType = 'buttons';
        this.buttons = [
            new Button('Agree', 'yes'),
            new Button('Disagree', 'no')
        ];
    }

}
