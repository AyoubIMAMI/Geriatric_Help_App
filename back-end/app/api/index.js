const { Router } = require('express')
const ResidentRouter = require('./residents')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const Stat = require("./stats");


const router = new Router()
router.get('/status', (req, res) => res.status(200).json('okyeyaya'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/residents', ResidentRouter)
router.use('/stats', Stat)


module.exports = router
