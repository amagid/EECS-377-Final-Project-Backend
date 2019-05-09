const { check } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');
const regexes = require('../../../../config').get().regexes;


const setState = [
    check('hue').optional().isFloat(),
    check('saturation').optional().isFloat(),
    check('brightness').optional().isFloat(),
    check('on').optional().isBoolean()
];


module.exports = {
    setState
};
