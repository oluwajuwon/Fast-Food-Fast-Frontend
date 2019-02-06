# Fast-Food-Fast-Frontend
A food delivery service application for a restaurant, to enable a restaurant manage customer orders better and deliver fast food items to customers in a 'Split Second' - https://faster-food-fastapp.herokuapp.com


[![Build Status](https://travis-ci.org/oluwajuwon/Fast-Food-Fast-Frontend.svg?branch=develop)](https://travis-ci.org/oluwajuwon/Fast-Food-Fast-Frontend)
[![Coverage Status](https://coveralls.io/repos/github/oluwajuwon/Fast-Food-Fast-Frontend/badge.svg?branch=develop)](https://coveralls.io/github/oluwajuwon/Fast-Food-Fast-Frontend?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/2038617f9892ec2f621d/maintainability)](https://codeclimate.com/github/oluwajuwon/Fast-Food-Fast-Frontend/maintainability)



FFF has 2 categories of users - Customers and Admin

# Features
 ## Customer features
   - Create an account and log in
   - Ability to order for food
   - Ability to see history of ordered foods
   - Ability to delete an order

 ## Admin features (Will be available in the next update)
   - Add, edit or delete the fast-food items
   - See a list of all fast-food items
   - See a list of orders
   - Accept and decline orders
   - Mark orders as completed

## The API for the app
https://fastfood-fast-app.herokuapp.com/api/v1/
 
## Pivotal Tracker 
The project is being managed using pivotal tracker management tool, click the link below to view the stories:
https://www.pivotaltracker.com/n/projects/2193674
    
## Technology
  - Frontend - 
      - ReactJs - Frontend javascript library for building user interfaces
      - Redux (for state management) - It is a predictable state container for JavaScript apps
      - CSS
  - Serverside
      - Node Js - It's an open source server environment built on Chrome's V8 JavaScript engine
      - Express js -  A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. This is used in this application for routing to endpoints.
  
## How to install
  ```
  //  Clone the app
  git clone https://github.com/oluwajuwon/Fast-Food-Fast-Frontend.git
    
  //  Switch to directory
  cd Fast-Food-Fast-Frontend

  //  Install Package dependencies
  npm install

  //  Start the application
  npm run start:dev

  //  View, test and use the API endpoints
  navigate to localhost:5000
  
```
## Testing
  To test the app Run `npm run test:client`
  
### Test Tools
 - Jest - An open JavaScript testing library maintained by facebook
 - React testing library - It's a very light-weight solution for testing React components
