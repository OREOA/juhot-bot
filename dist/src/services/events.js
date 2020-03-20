"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const google_json_1 = __importDefault(require("../../google.json"));
const calendar = googleapis_1.google.calendar('v3');
const jwtClient = new googleapis_1.google.auth.JWT(google_json_1.default.client_email, undefined, google_json_1.default.private_key, ['https://www.googleapis.com/auth/calendar']);
jwtClient.authorize((err, tokens) => {
    if (err) {
        console.log(err);
        return;
    }
    else {
        console.log("Successfully connected!");
    }
});
exports.default = { calendar, jwtClient };
//# sourceMappingURL=events.js.map