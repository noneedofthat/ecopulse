const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// Using Gemini 2.0 Flash - Latest and fastest model
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

/**
 * Summarize article content using Gemini AI
 * @param {string} title - Article title
 * @param {string} description - Article description
 * @param {string} content - Article content
 * @returns {Promise<string>} Summary text
 */
export async function summarizeArticle(title, description, content) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  try {
    console.log('Starting summarization...');
    console.log('API URL:', GEMINI_API_URL);
    console.log('API Key present:', !!GEMINI_API_KEY);

    const prompt = `Summarize in 2-3 sentences: ${title}. ${description || ''}`;

    console.log('Sending request to Gemini API...');
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
          topP: 0.95,
          topK: 40,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_NONE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_NONE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE'
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error response:', errorData);
      console.error('Response status:', response.status);
      console.error('Response statusText:', response.statusText);
      throw new Error(`API error: ${response.status} - ${errorData.error?.message || response.statusText || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Gemini API response:', JSON.stringify(data, null, 2));

    // Check for blocked content or safety issues
    if (data.promptFeedback?.blockReason) {
      console.error('Content blocked:', data.promptFeedback);
      throw new Error(`Content blocked: ${data.promptFeedback.blockReason}`);
    }

    // Check if candidates exist
    if (!data.candidates || data.candidates.length === 0) {
      console.error('No candidates in response:', data);
      throw new Error('No response candidates generated. The content may have been filtered.');
    }

    const candidate = data.candidates[0];
    console.log('First candidate:', JSON.stringify(candidate, null, 2));

    // Check finish reason - allow MAX_TOKENS if we have content
    if (candidate.finishReason &&
      candidate.finishReason !== 'STOP' &&
      candidate.finishReason !== 'MAX_TOKENS') {
      console.error('Unexpected finish reason:', candidate.finishReason);
      throw new Error(`Generation stopped: ${candidate.finishReason}`);
    }

    const summary = candidate?.content?.parts?.[0]?.text;

    if (!summary) {
      console.error('No summary text in response:', data);
      throw new Error('No summary generated - response format unexpected');
    }

    console.log('Summary generated successfully:', summary);
    if (candidate.finishReason === 'MAX_TOKENS') {
      console.warn('Summary was truncated due to MAX_TOKENS, but returning available content');
    }
    return summary.trim();
  } catch (error) {
    console.error('Error summarizing article:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
}

/**
 * Chat with Gemini AI about environmental topics
 * @param {string} message - User message
 * @param {Array} history - Chat history
 * @returns {Promise<string>} AI response
 */
export async function chatWithGemini(message, history = []) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  try {
    const systemPrompt = `You are an environmental expert assistant for EcoPulse, a platform dedicated to environmental awareness. 
Help users understand environmental issues, provide eco-friendly tips, and answer questions about climate change, wildlife, pollution, and sustainability. 
Be informative, encouraging, and action-oriented. Keep responses concise and helpful.`;

    // Build conversation history
    const contents = [];

    // Add system context as first user message
    if (history.length === 0) {
      contents.push({
        role: 'user',
        parts: [{ text: systemPrompt + '\n\nUser: ' + message }]
      });
    } else {
      // Add history
      history.forEach(msg => {
        contents.push({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.text }]
        });
      });
      // Add new message
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 500,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      throw new Error('No response generated');
    }

    return aiResponse.trim();
  } catch (error) {
    console.error('Error chatting with Gemini:', error);
    throw error;
  }
}
