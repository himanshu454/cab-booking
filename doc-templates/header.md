This repo contains the code for the Cab-Booking Module.

## Prerequisites

-   Install NodeJS, if not installed

          * curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
          * sudo apt-get install nodejs

-   Install npm, if not installed

          * sudo apt-get install npm

## Configure .env - Place .env file in config folder(/config/.env)

    SERVICE_NAME=cab-booking
    MONGOURI
    PORT
    IP
    ADMIN_EMAIL
    ADMIN_PASSWORD
    JWT_SECRET

## To run the project

Steps to run it as a service.

    Step 0: Configure .env

    Step 1: npm install

    Step 2: npm run dev (For development)

## Seed Script

    Configure env (ADMIN_EMAIL AND ADMIN_PASSWORD)
    Path - ./scripts/create-admin.js
    Run this script to create an admin who will register driver and cabs

## To lint the project

Steps to lint the project before commiting.

    * npm run lint

## Generate Docs

To generate apidocs run the below command.

    * npm run generate-docs

To see the apidocs follow the below steps.

    * Start the project - npm run dev
    * Hit the url - http://serverurl/documentation
