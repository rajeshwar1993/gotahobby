import { APIResponse } from "./apiTypes";
import { Hobby } from "./hobby";

export interface DBHandlerType {
  getAllHobbies: () => Promise<Array<Hobby>>;
  getHobby: (id: string) => Promise<Hobby>;
}
