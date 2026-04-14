/**
 * /api/ai
 * Implemented in Increment 4 (summary) and Increment 7 (chatbot)
 * — Google Gemini API
 */
import { Router } from 'express'
import { generateSummary } from '../controllers/aiController.js'

const router = Router()

router.post('/summary', generateSummary)

router.post('/chat', (_req, res) => {
  res.json({ message: 'Chatbot — coming in Increment 7' })
})

export default router
