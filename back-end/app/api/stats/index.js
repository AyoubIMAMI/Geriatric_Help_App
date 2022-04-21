const { Router } = require('express')

const { Stat } = require('../../models/')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
    try {
        res.status(200).json(Stat.get())
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.get('/:statId', (req, res) => {
    try {
        res.status(200).json(Stat.getById(req.params.statId))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.post('/', (req, res) => {
    try {
        const stat = Stat.create({...req.body })
        res.status(201).json(stat)
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.put('/:statId', (req, res) => {
    try {
        res.status(200).json(Stat.update(req.params.statId, req.body))
    } catch (err) {
        manageAllErrors(res, err)
    }
})

router.delete('/:statId', (req, res) => {
    try {
        Stat.delete(req.params.statId)
        res.status(204).end()
    } catch (err) {
        manageAllErrors(res, err)
    }
})

module.exports = router
