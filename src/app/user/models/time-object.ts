import { Serializable } from '../../global/serializable/serializable';

export class TimeObject implements Serializable<TimeObject>  {

    constructor(
        public date?: string,
        public timezone_type?: number,
        public timezone?: string,
    ) { }

    /**
     * @param  {any} input
     */
    deserialize(input: any) {
        this.date = input.date;
        this.timezone_type = input.timezone_type;
        this.timezone = input.timezone;
        return this;
    }
}
