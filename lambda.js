/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const Alexa = require('alexa-sdk');
const https = require('http');

const APP_ID = 'amzn1.ask.skill.d83a0da4-1cb5-4f56-a0c0-631dd83871bd';

const SKILL_NAME = 'my lampi';
const HELP_MESSAGE = 'You can say to set the brightness, color, hue, saturation, or on state, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const handlers = {
    'LaunchRequest': function() {
        this.response.speak('Your Lampi is ready. What should I tell it to do?');
        this.emit(':responseReady');
    },
    'BrightnessIntnet': function() {
        const brightness = this.event.request.intent.slots.brightness.value;
        request('GET', 'ec2-18-214-47-188.compute-1.amazonaws.com', `/api/lampi/set-state?brightness=${brightness}`, {})
            .then(() => {
                return `Brightness set to ${brightness}`;
            }).catch(err => {
                return 'Command Failed. Please try again.';
            }).then((speechText) => {
                this.response.speak(speechText);
                this.emit(':responseReady');
            });
    },
    'HueIntent': function() {
        const hue = this.event.request.intent.slots.hue.value;
        request('GET', 'ec2-18-214-47-188.compute-1.amazonaws.com', `/api/lampi/set-state?hue=${hue}`, {})
            .then(() => {
                return `Hue set to ${hue}.`;
            }).catch(err => {
                return 'Command Failed. Please try again.';
            }).then((speechText) => {
                this.response.speak(speechText);
                this.emit(':responseReady');
            });
    },
    'SaturationIntent': function() {
        const saturation = this.event.request.intent.slots.saturation.value;
        request('GET', 'ec2-18-214-47-188.compute-1.amazonaws.com', `/api/lampi/set-state?saturation=${saturation}`, {})
            .then(() => {
                return `Saturation set to ${saturation}.`;
            }).catch(err => {
                return 'Command Failed. Please try again.';
            }).then((speechText) => {
                this.response.speak(speechText);
                this.emit(':responseReady');
            });
    },
    'ColorIntent': function() {
        const color = this.event.request.intent.slots.color.value;
        //dictionary to tranform a color to a numeric value for hue
        const speechText = `The color is now ${color}.`;
        this.response.speak(speechText);
        this.emit(':responseReady');
    },
    'TurnOnIntent': function() {
        request('GET', 'ec2-18-214-47-188.compute-1.amazonaws.com', '/api/lampi/set-state?on=true', {})
            .then(() => {
                return `Your lampi is now on.`;
            }).catch(err => {
                return 'Command Failed. Please try again.';
            }).then((speechText) => {
                this.response.speak(speechText);
                this.emit(':responseReady');
            });
    },
    'TurnOffIntent': function() {
        request('GET', 'ec2-18-214-47-188.compute-1.amazonaws.com', '/api/lampi/set-state?on=false', {})
            .then(() => {
                return `Your lampi is now off.`;
            }).catch(err => {
                return 'Command Failed. Please try again.';
            }).then((speechText) => {
                this.response.speak(speechText);
                this.emit(':responseReady');
            });
    },
    'MemeDetectiveIntent': function() {
        const speechText = `what, is this the murder weapon? Get off my dick!`;
        this.response.speak(speechText);
        this.emit(':responseReady');
    },
    'MemeColoradoIntent': function() {
        const speechText = `I'M A GIRAFFE!!!`;
        this.response.speak(speechText);
        this.emit(':responseReady');
    },
    'MemeBanananaIntent': function() {
        const speechText = `a bah nahnah nah next to a bah nahnah nah`;
        this.response.speak(speechText);
        this.emit(':responseReady');
    },
    'MemeLeftoversIntent': function() {
        const speechText = `who ate my brother's ass`;
        this.response.speak(speechText);
        this.emit(':responseReady');
    },
    'MemeWontonsIntent': function() {
        const speechText = `hho... the wontons`;
        this.response.speak(speechText);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function() {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function() {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function() {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};


function request(method, hostname, path, options) {
    return new Promise((resolve, reject) => {

        const settings = {
            hostname,
            port: 3001,
            path,
            method,
            headers: {}
        };

        Object.assign(settings, options);

        const req = https.request(settings, function(res) {
            res.setEncoding('utf8');

            let body = '';

            res.on('data', function(chunk) {
                body += chunk;
            });

            res.on('end', function() {
                if (res.statusCode != 200) {
                    reject(res);
                }
                else {
                    resolve(res);
                }
            });

        });

        req.on('error', function(e) {
            console.log("Error: " + e.message);
            reject(e);
        }); // write data to request body


        if (settings.data) {
            req.write(settings.data);
        }

        req.end();

    });
}

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

