import { MockDataHandler } from "./mockFetcher";
import { FirebaseHandler } from "./firebase";

export class DBHandler {
  static get(env: string = "local") {
    if (env === "firebase") {
      return new FirebaseHandler();
    }
    return new MockDataHandler();
  }
}
