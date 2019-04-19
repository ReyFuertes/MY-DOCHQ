/** Model imports */
import { Message } from './message';
/**
* Model that represents a symptomchecker chat transcript
* @author Tristan Mitchell
*/
export class Chatlog {
    log: Array<Message>;
    constructor() {
        this.log = [];
    }
}
