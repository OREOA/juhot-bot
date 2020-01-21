import { google } from "googleapis"
import privatekey from "../../google.json"
const calendar = google.calendar('v3')


const jwtClient = new google.auth.JWT(
  privatekey.client_email,
  undefined,
  privatekey.private_key,
  ['https://www.googleapis.com/auth/calendar'])

jwtClient.authorize((err: any, tokens: any) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Successfully connected!");
  }
})


export default { calendar, jwtClient }
