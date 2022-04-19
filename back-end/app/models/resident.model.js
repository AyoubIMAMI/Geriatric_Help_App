const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Resident', {
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    picture: Joi.string().required(),
    handicap: Joi.string().required()
})
