import { Group } from "@/types/group";
import axios from "axios";
import { DBHandler } from "../dbHandler";
import { Event } from "@/types/event";
import { Picture } from "@/types/picture";

export class MockDataHandler extends DBHandler {
  constructor() {
    super();
  }

  async connect(): Promise<void> {
    return;
  }

  async disconnect(): Promise<void> {
    return;
  }

  async getPictureById(
    query: { type: "single"; id: string } | { type: "multiple"; ids: string[] }
  ): Promise<Picture | Picture[]> {
    // Mock implementation
    if (query.type === "single") {
      return {
        id: query.id,
        type: "PROFILE_PICTURE" as any,
        src: "https://via.placeholder.com/150",
        alt: "Placeholder image",
        createdAt: new Date().toISOString(),
      };
    } else {
      return query.ids.map((id) => ({
        id,
        type: "PROFILE_PICTURE" as any,
        src: "https://via.placeholder.com/150",
        alt: "Placeholder image",
        createdAt: new Date().toISOString(),
      }));
    }
  }

  async getAllGroups(): Promise<Group[]> {
    const response = await axios.get("http://localhost:3090/api/groups/all");

    return response.data;
  }

  async getGroupById(groupId: string): Promise<Group> {
    const response = await axios.get("http://localhost:3090/api/group");

    return response.data;
  }

  async getEventById(eventId: string): Promise<Event> {
    const response = await axios.get("http://localhost:3090/api/group");

    return response.data;
  }

  async getAllEventsOfGroup(groupId: string): Promise<Event[] | null> {
    return [];
  }
}
