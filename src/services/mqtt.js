const mqtt = require('mqtt');
const logger = require('./logger');
let client;

const deviceId = 'b827eb09466d';

const lampiState = {
    color: {
        h: 0.5,
        s: 0.5,
    },
    on: true,
    brightness: 0.5
};

function startServer() {
    client = mqtt.connect('mqtt://localhost');

    client.on('connect', function () {
        client.subscribe(`devices/${deviceId}/lamp/changed`, function (err) {
            logger.info({ message: 'MQTT Connected' });
        });
    });

    client.on('message', function (topic, message) {
        // message is Buffer
        //logger.info({ message: `Received message: ${message.toString()} on topic: ${topic}` });
        Object.assign(lampiState, JSON.parse(message.toString()));
        logger.info({message: `new state: ${JSON.stringify(lampiState)}`});
    });
}

function updateState(hue, saturation, brightness, on) {
    if (hue || hue === 0) {
        console.log('setting hue to ' + hue);
        lampiState.color.h = hue;
    }
    if (saturation || saturation === 0) {
        console.log('setting saturation to ' + saturation);
        lampiState.color.s = saturation;
    }
    if (on === true || on === false) {
        console.log('setting on to ' + on);
        lampiState.on = on;
    }
    if (brightness || brightness === 0) {
        console.log('setting brightness to ' + brightness);
        lampiState.brightness = brightness;
    }

    publishState();
}

function publishState() {
    lampiState.client = 'alexa';
    client.publish(`devices/${deviceId}/lamp/set_config`, JSON.stringify(lampiState));
}

module.exports = {
    startServer,
    publishState,
    updateState
};
