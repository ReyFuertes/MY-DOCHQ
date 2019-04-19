/** Model imports */
import { Condition } from './condition';
/**
* Model that represents a symptomchecker diagnosis
* @author Tristan Mitchell
*/
export class Diagnosis {
    conditions: Array<Condition>;
    constructor() {
        this.conditions = [];
    }
}
