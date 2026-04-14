import 'dotenv/config'
import express  from 'express'
import cors     from 'cors'
import helmet   from 'helmet'
import morgan   from 'morgan'
import rateLimit from 'express-rate-limit'

// Route imports (stubs ready for each increment)
import newsRouter     from './routes/news.js'
import aqiRouter      from './routes/aqi.js'
import aiRouter       from './routes/ai.js'
import chatRouter     from './routes/chat.js'
import authRouter     from './routes/auth.js'
import feedbackRouter from './routes/feedback.js'

const app  = express()
const PORT = process.env.PORT || 4000

// ── Trust proxy (required for Railway/Render/Heroku) ──────────────────────
app.set('trust proxy', 1)

// ── Security & parsing middleware ──────────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin:      process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Logging ────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

// ── Global rate limiter ────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max:      200,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { error: 'Too many requests. Please try again later.' },
})
app.use('/api', limiter)

// ── Health check ───────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status:    'ok',
    service:   'EcoPulse API',
    timestamp: new Date().toISOString(),
  })
})

// ── Feature routes ─────────────────────────────────────────────────────────
app.use('/api/news',     newsRouter)
app.use('/api/aqi',      aqiRouter)
app.use('/api/ai',       aiRouter)
app.use('/api/chat',     chatRouter)
app.use('/api/auth',     authRouter)
app.use('/api/feedback', feedbackRouter)

// ── 404 handler ────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ── Global error handler ───────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[EcoPulse Error]', err.message)
  res.status(err.status || 500).json({
    error:   err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

// ── Start ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌿 EcoPulse API running on http://localhost:${PORT}`)
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`)
})

export default app
