/**
 * /api/chat
 * Implemented in Increment 7 — Gemini chatbot
 */
import { Router } from 'express'
import { sendMessage } from '../controllers/chatController.js'

const router = Router()

router.post('/message', sendMessage)

export default router
