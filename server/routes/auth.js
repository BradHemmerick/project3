const jwt = require('express-jwt');
const config = require('./../../config')

const getToken = (req => req.headers.authorization);

const loginRequired = jwt({
    secret: config.secret,
    userProperty: "payload",
    getToken
});

module.exports = loginRequired