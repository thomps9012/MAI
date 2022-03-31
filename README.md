# National Minority AIDs (MAI) Initiative Adult Participant Survery

### Short Description
A participant survey which records demographic and program specific information about clients within the MAI program and notifies supervisors of client survey completion.

![Homepage Screenshot](./public/MAI-adult-screenshot.png?raw=true "Homepage")

### Features
 - Responsive Design
 - Mobile First Design
 - Simple Mail Transfer Protocol (SMTP) on database submission
    - Notifies supervisor of interview completion with relevant information
 - Progressive Web Application (PWA)
 - Unique Identification Generator for new Clients
 - Completion Validation
    - Participant must complete all questions before moving on to the next page
    - Utilizing a state check for each page's form data
- JSON questions that can be edited quickly and conveniently without changing the front end source code 


### Instructions
1. Fork the Repository
2. Download the necessary dependencies using 
```
yarn install
```
3. Create a .env file with the following information
    - Database Connection URL String (MongoDB or equivalent non-relational database)
    - Database Name
    - SendGrid API Key
4. Download and install Docker Desktop if you haven't already
5. Create the Docker image using
```
docker build -t [tag] .
```
6. Create a container registry and accompanying web application for deployment if you're using the Azure .NET framework
[Instructions on Docker Azure Deployments](https://docs.microsoft.com/en-us/azure/devops/pipelines/apps/cd/deploy-docker-webapp?view=azure-devops&tabs=java%2Cyaml)

    -- or -- 
    
    if deploying to Heroku follow
    [the Instructions Here](https://devcenter.heroku.com/categories/deploying-with-docker)

7. et Voilá you now have a fully functioning 


### Technical Specifications

##### Front-End
- NextJs
- React
- NextPWA
- TypeScript
- CSS
##### Back-End
- MongoDB
- CosmosDB
- NodeJs
##### Middleware / Dependencies
- SendGrid

#### Sister Application
The application has a sister application with a different set of questions for youth participants that can be found 
[here](https://github.com/thomps9012/MAIyouth)

### License
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

