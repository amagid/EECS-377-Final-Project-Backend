const mosca = require('mosca');
const config = require('../../config').get();
const logger = require('./logger');
const APIError = require('../APIError');

// Keep track of mosca server object for publishing later.
let _server;


/**
 * Start up the Mosca server. Server can be configured in the general
 * application configuration under mqtt.mosca.
 * 
 * @returns {mosca.Server} The Mosca server instance
 */
function startServer() {
    _server = new mosca.Server(config.mqtt.mosca);

    // fired when the mqtt server is ready
    const setup = function() {
        setUpMQTT();
        logger.info({ message: 'Mosca server is up and running' });
    }

    _server.on('ready', setup);

}

function setUpMQTT() {
    // Debug subscription to device Echo topic - echoes back what is received
    _server.subscribe("devices/+/lamp/changed", (topic, message, data) => {
        console.log(`Mosca received state change message: ${message} on topic: ${topic}`);
    });

    // Return mosca server instance
    return _server;
}

/**
 * Publish a message
 * @param {string} deviceId
 * @param {string} message
 * @returns {Promise}
 */
function publishState(deviceId, hue, saturation, brightness, on) {
    const message = JSON.stringify({
        color: {
            h: hue,
            s: saturation
        },
        on,
        brightness
    });
    return Promise.resolve().then(() => {
        const message = {
            topic: `devices/${deviceId}/lamp/changed`,
            payload: Buffer.from(message),
            qos: 2,
            retain: true
        };

        _server.publish(message);
    });

}


module.exports = {
    startServer,
    setUpMQTT,
    publishState
};
