const Promise = require('bluebird');
const APIError = require('../../../APIError');

module.exports = {
    createUser
};

function createUser(userData, currentUser) {
    return Promise.resolve(true);
}
