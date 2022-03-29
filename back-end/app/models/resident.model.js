const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Resident', {
    id: Joi.int().required(),
    name: Joi.string().required(),
    prenom: Joi.string().required(),
    picture: Joi.string().required(),
    handicap: Joi.int().required()
})