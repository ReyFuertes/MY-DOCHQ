/*
    Interface to be used when deserializing an object
*/
export interface Serializable<T> {
    deserialize(input: Object): T;
  }
