/**
 * Class for a Sex Response from the symptomChecker API
 */
import { SymptomCheckerResponse } from './symptomchecker-response';
import { Button } from './button';

export class Sex implements SymptomCheckerResponse {
    contentType: string;
    inputType: string;
    buttons: Array<Button>;

    constructor() {
        this.contentType = 'button-selection-message';
        this.inputType = 'buttons';
        this.buttons = [
            new Button('Male', 'male'),
            new Button('Female', 'female')
        ];
    }
}
