/**
 * Model that represents a symptomchecker Medical Condition
 * @author Tristan Mitchell
 */
export class Condition {
    id: string;
    probability: number;
    name: string;
    common_name: string;
    prevalance?: string;
    sex_filter?: string;
    categories?: Array<string>;
    acuteness?: string;
    severity?: string;
    extras?: Array<any>;
    triage_level?: string;
    description?: string;
    nhs_name?: string;
    keywords?: Array<string>;
    mainEntityOfPage: any;

    constructor(
        id: string,
        common_name: string,
        name: string,
        prob?: number,
        prevalence?: string,
        sex_filter?: string,
        categories?: Array<string>,
        acuteness?: string,
        severity?: string,
        extras?: Array<any>,
        triage_level?: string,
        description?: string,
        nhs_name?: string
    ) {
        this.id = id;
        this.probability = prob;
        this.common_name = common_name;
        this.name = name;
        this.prevalance = prevalence;
        this.sex_filter = sex_filter;
        this.categories = categories;
        this.acuteness = acuteness;
        this.severity = severity;
        this.extras = extras;
        this.triage_level = triage_level;
        this.description = description;
        this.nhs_name = nhs_name;
    }
}
