const express = require('express'); // Express app
const router = express.Router(); // Router Logic
const {expressjwt: jwt} = require('express-jwt');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ["HS256"],
  });

// This is where we import the controllers we will route

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);
    
router
    .route('/trips')
    .get(tripsController.getAllTrips)
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/trip/:tripCode')
    .get(tripsController.getTripByCode)
    .put(auth, tripsController.tripsUpdateTrip)

router.route("/trips/:tripCode").get(tripsController.tripsFindByCode);

module.exports = router;