const { Router } = require('express')

const { Resident } = require('../../models/')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json(Resident.get())
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:residentId', (req, res) => {
    try {
        res.status(200).json(Resident.getById(req.params.residentId))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        const resident = Resident.create({...req.body })
        res.status(201).json(resident)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:residentId', (req, res) => {
    try {
        res.status(200).json(Resident.update(req.params.residentId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:residentId', (req, res) => {
    try {
        Resident.delete(req.params.residentId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router