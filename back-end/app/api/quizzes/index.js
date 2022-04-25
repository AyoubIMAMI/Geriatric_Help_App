const { Router } = require('express')

const { Quiz, Question, Answer} = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const QuestionsRouter = require('./questions')
const { buildQuizz, buildQuizzes } = require('./manager')
const Joi = require("joi");

const router = new Router()

router.use('/:quizId/questions', QuestionsRouter)

router.get('/', (req, res) => {
  try {
    const quizzes = buildQuizzes()
    res.status(200).json(quizzes)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    const quizz = buildQuizz(req.params.quizId)
    res.status(200).json(quizz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    let quiz= Quiz.create({theme: req.body.theme, name: req.body.name})
    //console.log(quiz)
    if (req.body.questions && req.body.questions.length > 0) {
      const questions = req.body.questions.map((question) => {
        const currentQuest=Question.create({ label: question.label, quizId: quiz.id })
        if (question.answers && question.answers.length > 0) {
          //console.log(question)
          const answers = question.answers.map((answer) => Answer.create({ value: answer.value,isCorrect: answer.isCorrect, questionId: currentQuest.id }))
          question = { ...question, answers }
        }
      })
      quiz = { ...quiz, questions }
    }
    res.status(201).json(quiz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})




router.put('/:quizId', (req, res) => {
  try {
    let quiz= Quiz.update(req.params.quizId,{theme: req.body.theme, name: req.body.name})
    //console.log(quiz)
    if (req.body.questions && req.body.questions.length > 0) {
      const questions = req.body.questions.map((question) => {
        const currentQuest=Question.update(question.id ,{label: question.label, quizId: quiz.id })
        if (question.answers && question.answers.length > 0) {
          //console.log(question)
          const answers = question.answers.map((answer) => Answer.update(answer.id,{ value: answer.value,isCorrect: answer.isCorrect, questionId: currentQuest.id }))
          question = { ...question, answers }
        }
      })
      quiz = { ...quiz, questions }
    }
    res.status(200).json(quiz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    Quiz.delete(req.params.quizId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:quizId/all', (req, res) => {
  try {
    questions=buildQuizz(req.params.quizId).questions
    Quiz.delete(req.params.quizId)
    console.log(questions)
    if (questions && questions.length > 0) {
      questions.map((question) => {
        answers=question.answers
        Question.delete(question.id)
        if (answers && answers.length > 0) {
          //console.log(question)
          question.answers.map((answer) => Answer.delete(answer.id))
        }
      })
    }
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
