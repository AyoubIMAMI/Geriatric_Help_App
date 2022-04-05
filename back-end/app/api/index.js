const { Router } = require('express')
const ResidentRouter = require('./residents')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')


const router = new Router()
router.get('/status', (req, res) => res.status(200).json('okyeyaya'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/residents', ResidentRouter)


module.exports = router