/**
 * /api/auth
 * Implemented in Increment 8 — Passport.js + Supabase
 */
import { Router } from 'express'
const router = Router()

router.post('/register', (_req, res) => {
  res.json({ message: 'Auth — coming in Increment 8' })
})

router.post('/login', (_req, res) => {
  res.json({ message: 'Auth — coming in Increment 8' })
})

router.get('/google', (_req, res) => {
  res.json({ message: 'Google OAuth — coming in Increment 8' })
})

router.get('/me', (_req, res) => {
  res.json({ message: 'Auth — coming in Increment 8' })
})

export default router
