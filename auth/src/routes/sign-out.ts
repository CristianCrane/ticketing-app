import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req, res) => {
  res.status(201).send('signout')
})

export {router as signOutRouter }