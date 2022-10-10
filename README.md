# National Minority AIDs (MAI) Initiative <br /> Adult Participant Survery

A participant survey which records demographic and program specific information about clients within the MAI program and notifies supervisors of client survey completion. Also allows for administrators to edit question content, manage client records, and review all data collected via the application.

While anyone can create an account, only administrative users will have full priveledges and rights within the application, this has been restricted to users within the organization

Application is live @ https://minority-aids-initiative.vercel.app/

![Homepage Screenshot](https://user-images.githubusercontent.com/60509970/194887009-72e21063-f7c4-4438-ba2c-947d6009354d.png)

## Features
 - Responsive Design
 - Mobile First Design
 - Simple Mail Transfer Protocol (SMTP) on database submission
    - Notifies supervisor of interview completion with relevant information
    - Supervisor is also notified of gift card distribution, for appropiate record keeping 
 - Unique Identification Generator for new Clients
    - Created via cached calls to the backend which counts the total number of clients tested by respective agencies
 - Completion Validation
    - Participant must complete all questions before moving on to the next page
- JSON based question and answer sections that are stored on a database so that edits can be done quickly and conveniently without changing front end source code 

# Tech Stack

## Front-End
1. [NextJs](https://nextjs.org/)
 - Lightweight frontend layer that handles static page generation, server side rendering of data / props, and integrates easily with the Vercel Deployment platform
2. [TypeScript](https://www.typescriptlang.org/)
 - Generally used to create type safe applications, to ensure that backend database models meet the data reflected on the front end.
 - In the case of this application it's use is limited due to the flexibility afforded administrative users with respect to changing question, answer, and user data
3. [Vercel](https://vercel.com/)
 - The hosting platform for Next.js applications which integrates easily with either a GitHub Account or Repository
  - Allows for seamless continuous integration and development, domain management and deployment 
4. [Cypress](https://www.cypress.io/)
 - Front end testing framework that is used currently for navigation and mobile responsive tests
 - Testing can be done on hosted Vercel applications which ensures that tests accurately reflect the environment that users will experience
5. [Redux](https://redux.js.org/)
 - A state management library that is used to store information about the application user and interview information in the global state
 - Determines whether users have authorization to view certain protected domains within the application
 - Data is used from the interview slice / global state object, to display interview progress and basic information about the client being interviewed
6. [CSS](https://www.w3schools.com/Css/)
 - Custom Cascading Style Sheets, used to create an application that looks equally at home whether visited on a web browser, or a phone
 - Generation of components such as a progress bar, which are useful for user engagement and retention within the application
 
## Back-End
1. [MongoDB](https://www.mongodb.com/)
 - A document based database that stores user, client, and interview data in the cloud via an ATLAS cloud instance
 - Data is split into collections which can be updated dynamically based on user inputs from the front end
2. [bcrypt](https://www.npmjs.com/package/bcrypt)
 - Hashing algorithm used to obfuscate user password information to protect account integrity
 - Benefit of not having to decrypt the password when checking against a hashed password (stored in the database), instead checking the respective hashs for equality
 - Can be expanded to hash other sensitive information based on user requirements (i.e. email, SSN, DoB, etc.)
 
## Middleware / API Dependencies
1. [Nodemailer](https://nodemailer.com/about/)
 - Simple Mail Transfer Protocol (SMTP), which connected via google allows for up to 50k requests per day
 - Generates an email request which notifies users of application sign in based on device location and navigator information
 - Sends emails to administrators when new interviews are completed and gift cards are distributed
2. [Google API](https://developers.google.com/maps/documentation/geolocation/overview)
 - Generates device location information based on the user's sign in IP Address
 - Used to protect user account integrity
3. [SWR](https://swr.vercel.app/docs/with-nextjs)
 - Used to fetch data from the cloud hosted database throughout the application and on page load
 - Supports dynamic loading of data and only displays data once it has been loaded from the backend
4. [Browser Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
 - API calls to the backend are stored in the browser cache to allow for faster web page load and responsiveness
 - Any changes to backend data are updated in the cache, to ensure that data on the front end reflects the updated data in the backend
 - Enables up to date user authentication throughout the application
 
# Instructions for Local Fork
1. Fork the Repository
2. Download the necessary dependencies using 
```
yarn install or npm install
```
3. Create a .env file with the following information
    - Database Connection URL String (MongoDB Atlas or equivalent non-relational database)
    - Database Name
    - Google GeoLocation API Key
    - Gmail Username (for sending SMTP via nodemailer)
    - Gmail Password (for sending SMTP via nodemailer)
    - Admin Email (where database update SMTP requests will be sent)
4. Create a MongoDB Atlas account and use the URI string in the .env variables
5. Create a [Google Console Developer Account](https://console.cloud.google.com/getting-started) and enable the [Gmail API](https://developers.google.com/gmail/api/)
6. Allow sign on for less secure app access on the associated gmail account (to allow for nodemailer integration)
  - Found under the security recommendations for your gmail account
7. Enable the geolocate api and generate a key via google cloud console dashboard
  - Instructions [here](https://developers.google.com/maps/documentation/geolocation/overview)
8. Create a [Vercel](https://vercel.com/) Account
9. Deploy to Vercel through connecting the application to either the GitHub Repository or your account <br /> Instructions can be found [here](https://vercel.com/docs/concepts/deployments/overview)
10. et Voilá you now have a fully functioning and deployed application


# License
MIT License

Copyright (c) [2022] [National Minority AIDs Initiative Adult Survey]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

