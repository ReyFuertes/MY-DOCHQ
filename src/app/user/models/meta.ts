import { Serializable } from '../../global/serializable/serializable';

export class Meta implements Serializable<Meta> {

    current_page: number;
    from: number;
    last_page: string;
    path: string;
    per_page: number;
    to: number;
    total: number;

    /**
     * @param  {any} input
     */
    deserialize(input: any) {

        this.current_page = input.current_page;
        this.from = input.from;
        this.last_page = input.last_page;
        this.per_page = input.per_page;
        this.to = input.to;
        this.total = input.total;

        return this;
    }
}
