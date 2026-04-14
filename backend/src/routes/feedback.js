/**
 * /api/feedback
 * Implemented in Increment 9 — Supabase persistence
 */
import { Router } from 'express'
const router = Router()

router.post('/', (_req, res) => {
  res.json({ message: 'Feedback — coming in Increment 9' })
})

export default router
