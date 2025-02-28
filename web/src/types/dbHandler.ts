import { Group } from "./group";

export interface DBHandlerType {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getAllGroups: () => Promise<Array<Group>>;
  getGroup: (id: string) => Promise<Group>;
  getEvent: (id: string) => Promise<Event>;
}
