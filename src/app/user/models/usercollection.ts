// Global
import { Serializable } from '../../global/serializable/serializable';

// Model
import { User } from './user';
import { Links } from './links';
import { Meta } from './meta';

export class UserCollection implements Serializable<UserCollection> {
  data: User[];
  links: Links;
  meta: Meta;

  /**
   * @param  {any} input
   */
  deserialize(input: any) {

    const userList: User[] = [];
    input.data.forEach(user => {
      userList.push(new User().deserialize(user));
    });

    this.data = userList;

    this.links = new Links().deserialize(input.links);
    this.meta = new Meta().deserialize(input.meta);

    return this;
  }
}


