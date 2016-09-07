// export class UserData {
//   createDb() {
//     let users = [
//       { email: "test@com", password: "abc"}
//     ];
//     return { users };
//   }
// }

import { InMemoryDbService } from "angular2-in-memory-web-api";
export class UserData implements InMemoryDbService {
  createDb() {
    let users = [
      { email: "test@com", password: "abc"}
    ];
    return { users };
  }
}

