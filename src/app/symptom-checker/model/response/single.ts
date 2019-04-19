/**
 * Class for a Single Response from the symptomChecker API
 */

import { SymptomCheckerResponse } from './symptomchecker-response';
import { Choice } from './choice';

export class Single implements SymptomCheckerResponse {

    dataType: string;
    items: any;
    content: string;
    contentType: string;
    inputType = 'buttons';
    buttons = Array<Choice>();

    constructor(json: any) {
        this.dataType = 'answer';
        this.content = json.text;
        this.contentType = 'button-selection-message';
        this.items = this.mapItems(json);
        this.buttons = this.items.buttons;
    }

    private mapItems(item: any): any {

        // map choices to buttons
        const buttons = item.choices.map(choice => {
            return new Choice(item, choice);
        });

        return {
            buttons,
            name: item.name,
            id: item.id
        };
    }
}
