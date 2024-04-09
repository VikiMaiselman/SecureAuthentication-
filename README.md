# Server

- The server was written in Node.js (version 21) on JS + Express.js framweork
- The application uses MVC structure
- Database used is MongoAtlas (free tier, so might be a little bit slow)
- Authentication is done based on Passport.js library (Local Strategy - password are encrypted with salting and stored securely in our database)

- To run locally: npm start or nodemon app.js (if you have installed it globally)
- If you want to run your React client also locally, that in app.js (of this server) change the address of the incoming client to prevent CORS errors

## Twilio account

- I tried to connect to the account of IronVest, but there was one id missing (ACCOUNT_SID, should start with "ACxxx")
- To make the app work, I created my own trial account in Twilio, but I could only register and verify there my own phone number. Unregistered phone numbers get an error #21608 ("The phone number is unverified. Trial accounts cannot send messages to unverified numbers.", more info here: 'https://www.twilio.com/docs/errors/21608').
- Possible solutions to this error:

  1. You can provide me the missing credential for IronVest account and I will change the ENV VAR on the deployment server and redeploy
  2. You can register with my phone number (I will provide you the 6digit - OTP)
  3. You can skip the verification with Twilio and register/sign in directly (this will still be secure)
  4. For any questions - +972586630445 (Viki)

- If you decide to authenticate w/o Twilio, you won't see the verification page (which exists, Verification.jsx)
- The screenshot can be found in public folder in the React client.
