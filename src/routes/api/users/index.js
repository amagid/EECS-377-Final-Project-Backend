const users = require('./users');
const validate = require('../../../middlewares/validate');
const validators = require('./validators');
const respond = require('../../../middlewares/respond');

module.exports = function mountUsers(router) {

    router.post('/create',
        validate(validators.createUser),
        respond((req, res) => users.createUser(req.body, req.user)));

};
