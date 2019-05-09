const Promise = require('bluebird');
const APIError = require('../../../APIError');
const mqtt = require('../../../services/mqtt');

module.exports = {
    setState
};

function setState(options) {
    return mqtt.updateState(parseFloat(options.hue), parseFloat(options.saturation), parseFloat(options.brightness), JSON.parse(options.on));
}
