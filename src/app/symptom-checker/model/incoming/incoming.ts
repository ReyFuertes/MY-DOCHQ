/**
 * Class for an Incoming Response from the symptomChecker API
 */
export class Incoming {

    dataType: any;
    content: any;
    type: string;

    constructor(json: any) {
        this.type = 'incoming';
        this.dataType = json.type;
        this.content = json.message;
     }
}
