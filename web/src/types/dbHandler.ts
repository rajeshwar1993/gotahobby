import { Hobby } from "./hobby";

export interface DBHandlerType {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getAllHobbies: () => Promise<Array<Hobby>>;
  getHobby: (id: string) => Promise<Hobby>;
  getAllEvents;
  getEvent: (id: string) => Promise<Event>;
}
