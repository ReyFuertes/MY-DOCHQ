/**
* Model that represents a symptom checker message
* @author Tristan Mitchell
*/
export class Message {
    type: string;
    message: string;
    origin: string;

    constructor(type: string, message: string, origin: string) {
        this.type = type;
        this.message = message;
        this.origin = origin;
    }
}
