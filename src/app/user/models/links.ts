import { Serializable } from '../../global/serializable/serializable';

export class Links implements Serializable<Links>  {

  first: string;
  last: string;
  prev?: string;
  next?: string;

  /**
   * @param  {any} input
   */
  deserialize(input: any ) {

    this.first = input.data;
    this.last = input.last;
    this.prev = input.prev ? input.prev : null;
    this.next = input.next ? input.next : null;

    return this;
  }
}
