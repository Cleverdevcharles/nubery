import express from 'express'
const router = express.Router()

// middlewares
import { requireSignin } from '../middlewares'

// controller
import { create, read, update, remove, list } from '../controllers/sub'

// routes
router.post('/sub', requireSignin, create)
router.get('/subs', list)
router.get('/sub/:slug', read)
router.put('/sub/:slug', requireSignin, update)
router.delete('/sub/:slug', requireSignin, remove)

module.exports = router
