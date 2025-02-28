import { DBHandlerType } from "@/types/dbHandler";
import { Group } from "@/types/group";
import axios from "axios";

export class FirebaseHandler implements DBHandlerType {
  constructor() {}

  async getAllGroups(): Promise<Group[]> {
    const response = await axios.get("http://localhost:3090/api/groups/all");

    return response.data;
  }

  async getGroup(): Promise<Group> {
    const response = await axios.get("http://localhost:3090/api/group");

    return response.data;
  }
  async getEvent(): Promise<Event> {
    const response = await axios.get("http://localhost:3090/api/group");

    return response.data;
  }
}
