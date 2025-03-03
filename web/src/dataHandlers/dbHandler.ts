import { Group } from "@/types/group";
import { Event } from "@/types/event";
import { Picture } from "@/types/picture";
import { DBHandlerType } from "@/types/dbHandler";

export abstract class DBHandler implements DBHandlerType {
  constructor() {}

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract getPictureById(
    query: { type: "single"; id: string } | { type: "multiple"; ids: string[] }
  ): Promise<Picture | Picture[]>;
  abstract getAllGroups(): Promise<Group[]>;
  abstract getGroupById(groupId: string): Promise<Group>;
  abstract getEventById(eventId: string): Promise<Event>;
  abstract getAllEventsOfGroup(groupId: string): Promise<Event[] | null>;

  // Optional methods used in API routes
  async createEvent(
    eventName: string,
    groupId: string
  ): Promise<{ id: string }> {
    throw new Error("Method not implemented");
  }

  async updateEvent(eventId: string, data: Partial<Event>): Promise<void> {
    throw new Error("Method not implemented");
  }

  async deleteEvent(eventId: string): Promise<void> {
    throw new Error("Method not implemented");
  }
}
