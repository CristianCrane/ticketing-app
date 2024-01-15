import express from 'express'

const router = express.Router()

router.post('/api/users/signup', (req, res) => {
  res.status(201).send('signup')
})

export {router as signUpRouter }