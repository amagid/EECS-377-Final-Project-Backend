const Promise = require('bluebird');
const APIError = require('../../../APIError');
const mqtt = require('../../../services/mqtt');

module.exports = {
    setState
};

function setState(options) {
    return mqtt.updateState(parseFloat(options.hue), parseFloat(options.saturation), parseFloat(options.brightness), parseBoolean(options.on));
}

function parseBoolean(input) {
    if (input === 'true' || input === true) {
        return true;
    } else if (input === 'false' || input === false) {
        return false;
    } else {
        return null;
    }
}
