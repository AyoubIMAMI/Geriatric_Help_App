const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Stat', {
    residentId: Joi.string().required(),
    quizzId: Joi.string().required()
})
