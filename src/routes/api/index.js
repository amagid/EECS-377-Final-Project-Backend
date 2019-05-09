const express = require('express');
const mountLampi = require('./lampi');
const respond = require('../../middlewares/respond');

module.exports = function mountAPI(router) {
    router.get('/', respond((req, res) => 'Up and Running!'));

    const lampi = express.Router();
    mountLampi(lampi);
    router.use('/lampi', lampi);
};
