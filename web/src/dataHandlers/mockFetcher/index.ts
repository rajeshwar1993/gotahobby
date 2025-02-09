import { DBHandlerType } from "@/types/dbHandler";
import { Hobby } from "@/types/hobby";
import axios from "axios";

export class MockDataHandler implements DBHandlerType {
  constructor() {}

  async getAllHobbies(): Promise<Hobby[]> {
    const response = await axios.get("http://localhost:3090/api/hobbies/all");

    return response.data;
  }

  async getHobby(hobbyId: String): Promise<Hobby> {
    const response = await axios.get("http://localhost:3090/api/hobby");

    return response.data;
  }
}
