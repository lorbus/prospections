# Propection Manager - webtool

Propection Manager service provides a useful web tool for prospection activity. Facilitating reports and especially the follow up of the BD activities in the field.

## Software Requirements To Run Locally (there's a Docker option below as well)

* Node.js 10.16 or higher
* MongoDB 3.4 or higher
* Angular 8 or higher

### Running the Application Locally

1. Install Node.js (10.16 or higher) and MongoDB (3.4 or higher) on your dev box

    * Node.js: https://nodejs.org
    * MongoDB: https://docs.mongodb.com/manual/administration/install-community

1. Execute `mongod` to start the MongoDB daemon if it's not already running (read the installation instructions above if you are new to MongoDB or have issues running it)

1. Run `npm install -g @angular/cli nodemon` to install the Angular CLI and nodemon.

1. Run `npm install --save @angular/material @angular/cdk` to install the Angular Material UI

1. Run `npm install` at the project root to install the app dependencies

1. Run the following task to build the Angular app (and watch for any changes you make) and copy the built code to the `public` folder: 

    `ng build --watch`

1. Development Mode: Run `npm run server` in a separate console window to start the Node.js server
1. Browse to http://localhost:4200

1. LIVE Mode: Run `npm start` in a separate terminal window to build the TypeScript, watch for changes and launch the web server
1. Browse to http://localhost:4200

// production environment build command
ng build --prod


## Running the Application with Docker

1. Install Node.js (10.16 or higher) and Docker for Mac/Windows or Docker Toolbox - https://www.docker.com/products/overview

1. Open `config/config.development.json` and change the host from `localhost` to `mongodb`

1. Run `npm install`

1. Run `ng build --watch`

1. Open another command window and navigate to this application's root folder in the command window

1. Run `docker-compose build` to build the images

1. Run `docker-compose up` to run the containers

1. Navigate to http://localhost:3000

