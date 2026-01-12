import { sendForgotPasswordEmail } from "./Security/testMailer.js";

sendForgotPasswordEmail("yourfriend@example.com", "https://example.com/reset/123")
  .then(() => console.log("Email sent ✅"))
  .catch(console.error);
