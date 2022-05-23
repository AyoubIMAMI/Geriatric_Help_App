const {Router} = require("express");
const manageAllErrors = require("../../utils/routes/error-management");
const {filterClickNumberByResident, filterClickNumberByDate} = require("./manager");
const Joi = require("joi");
const {ClickNumber} = require("../../models");

const router = new Router()


router.put('/:residentId/:annee/:mois/:jour', (req, res) => {
    try {
        let clickNumber=filterClickNumberByResident(req.params.residentId,req.params.annee,req.params.mois,req.params.jour)
        console.log(clickNumber)
        res.status(200).json(
            ClickNumber.update(clickNumber.id,{
            numberOfClicks:clickNumber.numberOfClicks+req.body.numberOfClicks,
            numberOfPages:clickNumber.numberOfPages+1,
            numberOfGoodResponses:clickNumber.numberOfGoodResponses+req.body.numberOfGoodResponses,
            numberOfBadResponses:clickNumber.numberOfBadResponses+req.body.numberOfBadResponses,
            })
        )
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/:residentId', (req, res) => {
    try {
        ClickNumber
        const clickNumber = ClickNumber.create({ ...req.body})
        res.status(201).json(clickNumber)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:residentId/:anneeA/:moisA/:jourA/:anneeB/:moisB/:jourB/', (req, res) => {
    date1=new Date(req.params.anneeA,req.params.moisA,req.params.jourA)
    date2=new Date(req.params.anneeB,req.params.moisB,req.params.jourB)
    try {
        res.status(200).json(
            filterClickNumberByDate(req.params.residentId,date1,date2)
        )
    } catch (err) {
        manageAllErrors(res, err)
    }
})


module.exports = router
