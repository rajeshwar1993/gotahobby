import { Logger } from "@/utils/supabase/logger";
import { Group } from "./group";

export interface DBHandlerType {
  logger: Logger;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getAllGroups: () => Promise<Array<Group>>;
  getGroupById: (groupId: string) => Promise<Group>;
  getEventById: (eventId: string) => Promise<Event | null>;
  getAllEventsOfGroup: (groupId: string) => Promise<Array<Event> | null>;
}
