const lampi = require('./lampi');
const validate = require('../../../middlewares/validate');
const validators = require('./validators');
const respond = require('../../../middlewares/respond');

module.exports = function mountLampi(router) {

    router.get('/set-state',
        validate(validators.setState),
        respond((req, res) => lampi.setState(req.query)));

};
