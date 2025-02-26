import { Hobby } from "./hobby";

export interface DBHandlerType {
  getAllHobbies: () => Promise<Array<Hobby>>;
  getHobby: (id: string) => Promise<Hobby>;
  getEvent: (id: string) => Promise<Event>;
}
