# TMR&D Technical Assignment

The basic flow of api gateway to make calls to third party providers and get return rate data to FE.

## Solution Overview

Whenever we want to integrate with a new provider, we need to add provider information to database.
This information must have the provider's code that's unique between providers. We will need this code later on when we want to pick any provider to interact.

Example of provider data that can be added:

```json
For CityLink: {
"name": "city-link",
"code": "CityLink",
"apiKey": "citylinkapikey",
"url": "https://www.citylinkexpress.com/wp-json/wp/v2/getShippingRate"
}

For JT: {
"name": "J & T",
"code": "JT",
"apiKey": "jttestapikey",
"url": "https://www.citylinkexpress.com/wp-json/wp/v2/getShippingRate"
}
```

_For JT provider, we are using the same url as CityLink provider as JT API is not open for any outside access. Therefore the rate data will be the same for both provider._

To be able to connect with any provider from a single request, we will need a data schema that can be match with any provider that we're integrating. Example of request data base on this schema like below:

```json
{
  "providerIds": [1],
  "departurePostCode": 10000,
  "arrivalPostCode": 10000,
  "departureStateName": "Kuala Lumpur",
  "departureCountryCode": "MY",
  "arrivalStateName": "Perlis",
  "arrivalCountryCode": "MY",
  "itemLength": 50,
  "itemWidth": 50,
  "itemHeight": 50,
  "itemWeight": 20,
  "addons": {}
}
```

## Project Directory Structure
I used design pattern singleton and dependency injection in my project, redis is caching database which help me hanlde the same request from client and avoid hitting many times into my database
1. Database: config connection to database, implement migration and seed data
2. Config: Mapping env into module
3. Common: Middlewares, interceptors, decorators,... These are the common parts for the whole project
4. Modules: contains all layers: - Controller: Receiving requests
                                 - Service: Handling logic 
                                 - Repository: Interacting with the database
                                 - Entity: Refers to a class that represents a specific model or object in the application's domain
5. Logs: Directory containing the project's logs

## Installation

1. Install docker and docker-compose follow [docker documentation](https://docs.docker.com/engine/install)
2. Move to the directory containing the code and run command: `docker-compose up -d` to start project
3. Access swagger documenation at `http://localhost:8989/api`. We need to authorize with JWT token to be able to connect to service:
   > eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwicm9sZSI6IkpvaG4gRG9lIn0.PlctSJVavVA8YPf-BpaMvAPMYTLB4EnqNZLFrZ4dPQg
4. Start making api call to [add providers](http://localhost:2711/api#/provider/ProvidersController_createProvider) and request for [rate calculation](http://localhost:2711/api#/rates/RatesController_createRate).

## Migration

### Generate new migration

1. Run command in terminal to generate new migration file:
   > npm run migration:genereate \<migration-name\>
2. New migration file will be generated inside src folder. You need to drag it into directory: `src/database/migrations`. Otherwise we cannot apply this migration file.

### Apply migration

Run command in terminal:

> npm run migration:run
