import express from 'express'
const router = express.Router()

// middlewares
import { requireSignin } from '../middlewares'

// controller
import {
  create,
  read,
  update,
  remove,
  list,
  getSubs,
} from '../controllers/category'

// routes
router.post('/category', requireSignin, create)
router.get('/categories', list)
router.get('/category/:slug', read)
router.put('/category/:slug', requireSignin, update)
router.delete('/category/:slug', requireSignin, remove)
router.get('/category/subs/:_id', getSubs)

module.exports = router
