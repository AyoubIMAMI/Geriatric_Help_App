const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('ClickData', {
    x: Joi.number,
    y: Joi.number
})
