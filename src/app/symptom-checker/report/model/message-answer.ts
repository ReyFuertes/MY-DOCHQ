/**
* Model that represents an answer from a symptom checker message
* @author Tristan Mitchell
*/

export class MessageAnswer {
    id: string;
    choice_id: string;
    constructor(id: string, choice_id: string) {
        this.id = id;
        this.choice_id = choice_id;
    }
}
