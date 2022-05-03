const {Router} = require("express");
const manageAllErrors = require('../../utils/routes/error-management')
const {ClickData} = require("../../models");
const {filterClicksByResident} = require("./manager");

const router = new Router()

router.get('/:residentId', (req, res) => {
    try {
        res.status(200).json(filterClicksByResident(req.params.residentId, req.params.quizId))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        const clickData = ClickData.create({...req.body })
        res.status(201).json(clickData)
    } catch (err) {
        manageAllErrors(res, err)
    }
})


module.exports = router
