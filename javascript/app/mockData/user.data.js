"use strict";
class UserData {
    createDb() {
        let users = [
            { emailAddress: "test@com", password: "abc" }
        ];
        return { users: users };
    }
}
exports.UserData = UserData;
