/** Model imports */
import { Diagnosis } from './diagnosis';
/**
 * Model that represents a symptomchecker report 
 * @author Tristan Mitchell
*/
export class Report {
    createdAt: Date;
    age: number;
    sex: string;
    name: string;
    email_address: string;
    diagnosis: Diagnosis;

    constructor() {
        this.createdAt = new Date();
        this.age = 0;
        this.sex = '';
        this.name = '';
        this.email_address = '';
        this.diagnosis = new Diagnosis();
    }
}
