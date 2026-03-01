const express = require('express');
const authRoute = require('./auth.routes');
const userRoute = require('./user.routes');
const flatRoute = require('./flat.routes');
const complaintRoute = require('./complaint.routes');
const vehicleRoute = require('./vehicle.routes');
const eventRoute = require('./event.routes');

const router = express.Router();

// Define routes
const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/flats',
        route: flatRoute,
    },
    {
        path: '/complaints',
        route: complaintRoute,
    },
    {
        path: '/vehicles',
        route: vehicleRoute,
    },
    {
        path: '/events',
        route: eventRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
