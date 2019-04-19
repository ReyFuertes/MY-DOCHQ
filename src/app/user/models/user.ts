// Global
import { Serializable } from '../../global/serializable/serializable';

// Model
import { TimeObject } from './time-object';

export class User implements Serializable<User> {

  public id?: string;
  public department?: string;
  public first_name?: string;
  public last_name?: string;
  public sign_up_email_sent?: boolean;
  public email_address?: string;

  public created_at?: any;
  public modified_at?: any;

  constructor() { }

  get _email() {
    return this.email_address;
  }

  get _id() {
    return this.id;
  }

  get _created_at() {
    return this.created_at;
  }

  get _modified_at() {
    return this.modified_at;
  }

  /**
   * @param  {any} input
   */
  deserialize(input: any) {

    this.id = input.id;
    this.first_name = input.first_name;
    this.last_name = input.last_name;
    this.department = input.department;
    this.email_address = input.email_address;
    this.sign_up_email_sent = input.sign_up_email_sent;

    if (input.created_at) {
      // this.created_at = new TimeObject().deserialize(input.created_at);
      this.created_at = { date : new Date(input.created_at) };
    }

    if (input.modified_at) {
      // this.modified_at = new TimeObject().deserialize(input.modified_at);
      this.modified_at = { date : new Date(input.created_at) };
    }

    return this;
  }
}
