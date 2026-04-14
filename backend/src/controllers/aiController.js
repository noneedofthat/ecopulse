import { GoogleGenerativeAI } from '@google/generative-ai'
import axios from 'axios'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GUARDIAN_BASE  = 'https://content.guardianapis.com'
const GUARDIAN_KEY   = process.env.GUARDIAN_API_KEY

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

/**
 * POST /api/ai/summary
 * Body: { articleId: string }
 * Streams AI-generated summary of the article using Server-Sent Events (SSE)
 */
export async function generateSummary(req, res) {
  try {
    const { articleId } = req.body

    if (!articleId) {
      return res.status(400).json({ error: 'articleId is required' })
    }

    // Decode the base64 article ID to get Guardian content path
    const contentPath = Buffer.from(articleId, 'base64').toString('utf8')

    // Fetch full article body from Guardian API
    const { data } = await axios.get(`${GUARDIAN_BASE}/${contentPath}`, {
      params: {
        'api-key':     GUARDIAN_KEY,
        'show-fields': 'bodyText,headline,trailText',
      },
    })

    const article = data.response.content
    const bodyText = article.fields?.bodyText || article.fields?.trailText || ''
    
    if (!bodyText) {
      return res.status(404).json({ error: 'Article content not found' })
    }

    // Strip HTML tags from body text
    const cleanText = bodyText.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    
    // Prepare prompt for Gemini
    const prompt = `You are an environmental news summarizer. Provide a concise summary of the following article in exactly 4-5 sentences. Focus on the most important facts and environmental impact. Use clear, accessible language.

Article Title: ${article.webTitle}

Article Content:
${cleanText.slice(0, 8000)}

Summary (4-5 sentences only):`

    // Set up SSE headers
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    // Initialize Gemini model
    // Using gemini-2.5-flash for latest and fastest performance
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    // Stream the response
    const result = await model.generateContentStream(prompt)

    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      if (chunkText) {
        // Send chunk as SSE event
        res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`)
      }
    }

    // Send completion signal
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
    res.end()

  } catch (err) {
    console.error('[AI Summary Error]', err.message)
    
    // If headers already sent (streaming started), we can't send JSON error
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: 'Summary generation failed' })}\n\n`)
      res.end()
    } else {
      res.status(500).json({ 
        error: 'Failed to generate summary',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      })
    }
  }
}
