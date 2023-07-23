# hyperleger-indy-regov

The basic flow of api gateway to make calls to api of various suppliers and return standard form data to frontend.

## Solution Overview

First, when there is a new supplier that needs to be integrated into the system, you must add a new supplier with the data they provide, note that the supplier's code field is the field that I specified, so when adding it, you need to add it. the standard form because it will have the same name as the class that I will handle the logic in the code, Here is a sample request for adding a new supplier:
`{
    "name": "city-link",
    "code": "CityLink",
    "apiKey": "citylinkapikey",
    "url": "https://www.citylinkexpress.com/wp-json/wp/v2/getShippingRate"
}` and
`{
    "name": "J & T",
    "code": "JT",
    "apiKey": "jttestapikey",
    "url": "https://www.citylinkexpress.com/wp-json/wp/v2/getShippingRate"
}`

You can read, update or delete supplier which I created in my project

Because I only get the actual call data on `the city link's page (J&T's site they don't have a public access to access)`, so `instead of mocking the data for J&T I will take the City Link link to call J&T`. The important thing I want to show here is that when there are many new suppliers I will also be able to handle my project well

I will use api create Transaction to create request send to provider and hanlde it. This is the sample of request:

{
"origin_country": "MY",
"origin_state": "Kuala Lumpur",
"origin_postcode": 10000,
"destination_country": "MY",
"destination_state": "Perlis",
"destination_postcode": 10000,
"length": 39,
"width": 30,
"height": 50,
"selected_type": 1,
"parcel_weight": 4
}

## Installation

1. You need install docker and docker-compose follow docker documentation `https://docs.docker.com/engine/install`

2. Move to the directory containing the code and run command: `docker-compose up -d` to start project
3. Then you can access domain `localhost:2711/api` to view the swagger documantation
4. Call api to create new supplier and then create new transaction



eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwicm9sZSI6IlVTRVIifQ._ejexsLxujrjAOlef5LfU8GjPhigK96y9qtUcNaxEKc