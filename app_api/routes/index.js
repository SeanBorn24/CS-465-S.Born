const express = require('express'); //express app
const router = express.Router(); //router logic

//This is where we import the contollers we will route
const tripsController = require('../controllers/trips');

//define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) //get method routes triplist
    .post(tripsController.tripsAddTrip); //post method adds a trip

// get method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;