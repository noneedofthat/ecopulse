import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

/**
 * POST /api/chat/message
 * Body: { message: string, history: array }
 * Returns AI response
 */
export async function sendMessage(req, res, next) {
  try {
    const { message, history = [] } = req.body

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: `You are EcoBot, a friendly and knowledgeable environmental assistant for EcoPulse, a platform dedicated to environmental awareness and action.

About EcoPulse:
- EcoPulse is a web platform that provides real-time environmental news, AQI tracking, and conservation resources
- The platform has a News Feed with environmental articles from The Guardian API (searchable by location and topic)
- Users can check Air Quality Index (AQI) for any location worldwide on the AQI page
- The NGO page lists environmental organizations users can support
- Users can provide feedback through the Feedback page

Your role:
- Answer questions about climate change, sustainability, environmental issues, and conservation
- When users ask about news, direct them to the News Feed page where they can search for specific locations or topics
- When users ask about air quality, direct them to the AQI page where they can check any location
- When users ask about supporting causes, mention the NGO page
- Provide practical tips for reducing carbon footprint and living sustainably
- Explain environmental concepts in simple terms
- Encourage positive environmental action
- Be concise but informative (2-3 paragraphs max)
- Use a warm, encouraging, and educational tone

Guidelines:
- Keep responses under 200 words when possible
- Use simple language, avoid jargon
- Provide actionable advice when relevant
- Direct users to relevant EcoPulse features when appropriate
- Be optimistic but realistic about environmental challenges
- Never provide medical, legal, or financial advice
- If you don't know something, admit it honestly

Example responses:
- For news questions: "You can find the latest environmental news on our News Feed page! Use the search bar to look for news about [location/topic]. The feed is updated with articles from The Guardian covering climate, pollution, conservation, and more."
- For AQI questions: "Check out our AQI page to see real-time air quality data for [location]! You can search any city worldwide and see pollutant levels, historical trends, and more."
- For supporting causes: "Visit our NGO page to discover environmental organizations you can support! We've curated a list of both international and Indian NGOs working on wildlife, climate, forests, and more."`
    })

    // Convert history to Gemini format, excluding the initial assistant greeting
    // and ensuring first message is from user
    const chatHistory = history
      .filter(msg => msg.role !== 'system') // Remove system messages
      .slice(1) // Skip the initial assistant greeting
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }))

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory,
    })

    // Send message and get response
    const result = await chat.sendMessage(message)
    const response = result.response.text()

    res.json({
      response,
      timestamp: Date.now(),
    })
  } catch (err) {
    console.error('[Chat Error]', err.message)
    
    // Handle specific Gemini errors
    if (err.message?.includes('API key')) {
      return res.status(500).json({ 
        error: 'AI service configuration error',
        message: 'Please check API key configuration'
      })
    }
    
    res.status(500).json({ 
      error: 'Failed to get AI response',
      message: err.message 
    })
  }
}
