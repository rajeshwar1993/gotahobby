import { Group } from "@/types/group";
import axios from "axios";
import { DBHandler } from "..";

export class MockDataHandler extends DBHandler {
  constructor() {}

  async getAllGroups(): Promise<Group[]> {
    const response = await axios.get("http://localhost:3090/api/groups/all");

    return response.data;
  }

  async getGroup(groupId: string): Promise<Group> {
    const response = await axios.get("http://localhost:3090/api/group");

    return response.data;
  }

  async getEvent(eventId: string): Promise<Event> {
    const response = await axios.get("http://localhost:3090/api/group");

    return response.data;
  }
}
