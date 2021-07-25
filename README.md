# CAB BOOKING

## Prerequisites

```closure
-   Install NodeJS, if not installed

          * curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
          * sudo apt-get install nodejs

-   Install npm, if not installed

          * sudo apt-get install npm

-   Install Mongodb, if not installed:

    ReferLink: https://www.mongodb.com/
```

## Configure .env - Place .env file in config folder(/config/.env)

```closure
    SERVICE_NAME=cab-booking
    MONGOURI
    PORT
    IP
    ADMIN_EMAIL
    ADMIN_PASSWORD
    JWT_SECRET
```

## To run the project

```closure
Steps to run it as a service.

    Step 0: Configure .env

    Step 1: npm install

    Step 2: npm run dev (For development)
```

## Seed Script

```closure
    Configure env (ADMIN_EMAIL AND ADMIN_PASSWORD)
    Path - ./scripts/create-admin.js
    Run this script to create an admin who will register driver and cabs
```

## Lint Project

```closure
npm run lint  # for cheking the lint error
npm run lint:fix # for fixing the minor lint error
```

## Generate Docs

```closure
To generate apidocs run the below command.

    * npm run generate-docs

To see the apidocs follow the below steps.

    * Start the project - npm run dev
    * Hit the url - http://serverurl/documentation

```

## Directory Structure:

```
ci/
    All the CI configurations that are needed on server
config/
    All the configurations that are needed on server
scripts/
    All the scripts that are run on server
log/
    Logs of the running server
src/
    domain/
        module/
            TBD
    infra/
        database/
            models/
                Exposes all the Database Models
        utils/
            logger.js
            errorHandler.js
			auth.js
			rateLimiting.js
			responseHandler.js
    interface/
        rest/
            module/
                .route.js
				.validation.js
package.json
README.md
apps.json
.huskyrc.js
.gitignore
.eslintrc.js
```

## PostMan Collection Link:

```
https://www.getpostman.com/collections/13a45fb89b5c943b0495

Test apis on postman.

```

## Added one sample unit test of rider register:

Used [Mocha](https://mochajs.org/)

```
To run the test, run the command below:

     * npm run test:unit
 (make sure configure (test.env) in config folder before running the test)
```

## Project Structure or How it is designed:

```
This project is devide into two modules, listed below:

     * Admin Module
	 * Rider/User Module (Booking Module)

* Admin Module:

    - In this admin register driver and cabs later which can be booked by riders for trip.
	- Admin can see the list of all the requested bookings.
	- Admin can confirm the requested booking.

* Rider/User Module:

	- Rider can register himself/herself in the app
	- Rider can request a booking for trip.
	- Rider can view all the nearbycabs upto 10 km. (We can set the limit, default limit I have taken 10km)
	- Rider can see the list of past trips also.

```
