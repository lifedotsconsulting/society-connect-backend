// Exporting all services including the existing auth.service and token.service
const authService = require('./auth.service');
const tokenService = require('./token.service');

const UserService = require('./UserService');
const FlatService = require('./FlatService');
const ComplaintService = require('./ComplaintService');
const VehicleService = require('./VehicleService');
const EventService = require('./EventService');

module.exports = {
    authService,
    tokenService,
    UserService,
    FlatService,
    ComplaintService,
    VehicleService,
    EventService
};
