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
  getEventById: (eventId: string) => Promise<Event>;
  getAllEventsOfGroup: (groupId: string) => Promise<Array<Event> | null>;

  // These methods are used in the API routes but not implemented yet
  createEvent?: (eventName: string, groupId: string) => Promise<{ id: string }>;
  updateEvent?: (
    eventId: string,
    data: Partial<import("./event").Event>
  ) => Promise<void>;
  deleteEvent?: (eventId: string) => Promise<void>;
}
