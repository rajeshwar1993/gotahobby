import { Group } from "./group";

export interface DBHandlerType {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getAllGroups: () => Promise<Array<Group>>;
  getGroupById: (groupId: string) => Promise<Group>;
  getEventById: (eventId: string) => Promise<Event>;
  getAllEventsOfGroup: (groupId: string) => Promise<Array<Event>>;
}
