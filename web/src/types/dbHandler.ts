import { Group } from "./group";
import { Event } from "@/types/event";
import { Picture } from "./picture";

export interface DBHandlerType {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getPictureById(
    query: { type: "single"; id: string } | { type: "multiple"; ids: string[] }
  ): Promise<Picture | Picture[]>;
  getAllGroups: () => Promise<Array<Group>>;
  getGroupById: (groupId: string) => Promise<Group>;
  getEventById: (eventId: string) => Promise<Event | null>;
  getAllEventsOfGroup: (groupId: string) => Promise<Array<Event> | null>;
}
