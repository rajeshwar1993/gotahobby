import { DBHandlerType } from "@/types/dbHandler";
import { Group } from "@/types/group";
import axios from "axios";

export class MockDataHandler implements DBHandlerType {
  constructor() {}

  async getAllGroups(): Promise<Group[]> {
    const response = await axios.get("http://localhost:3090/api/groups/all");

    return response.data;
  }

  async getGroup(groupId: String): Promise<Group> {
    const response = await axios.get("http://localhost:3090/api/group");

    return response.data;
  }

  async getEvent(eventId: String): Promise<Event> {
    const response = await axios.get("http://localhost:3090/api/group");

    return response.data;
  }
}
