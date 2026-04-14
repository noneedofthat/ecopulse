/**
 * /api/news  — Guardian API proxy
 */
import { Router } from 'express'
import {
  getNews,
  getArticleById,
  getSearchSuggestions,
} from '../controllers/newsController.js'

const router = Router()

router.get('/suggestions', getSearchSuggestions)   // before /:id so it doesn't get caught
router.get('/',            getNews)
router.get('/:id',         getArticleById)

export default router
