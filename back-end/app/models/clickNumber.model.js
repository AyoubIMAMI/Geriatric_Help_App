const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('ClickNumber', {
    residentId : Joi.number(),
    numberOfClicks:Joi.number(),
    numberOfPages:Joi.number(),
    numberOfGoodResponses:Joi.number(),
    numberOfBadResponses:Joi.number(),
    jour:Joi.number(),
    mois:Joi.number(),
    annee:Joi.number(),
    id:Joi.number()
})
