/**
 * Class for a Choice Object
 */
export class Choice {
    text: string;
    value: Value;

    constructor(item: any, choice: any) {
        this.text = choice.label;
        this.value = new Value(item, choice);
    }
}

/**
 * Class for a Value within a choice Object
 */
class Value {
    id: string;
    choice_id: string;

    constructor(item: any, choice: any) {
        this.id = item.id;
        this.choice_id = choice.id;
    }
}
