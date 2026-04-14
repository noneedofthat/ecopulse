# EcoPulse

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org/)

A full-stack environmental awareness platform featuring real-time news aggregation, global air quality monitoring, AI-powered summaries, NGO directory, and intelligent chatbot. Built with React, Node.js, and Supabase.

## Features

- Real-time environmental news from The Guardian API with search and filters
- Global AQI tracking with interactive maps and 7-day historical data
- AI-powered article summaries using Google Gemini
- Intelligent chatbot for environmental queries
- Curated NGO directory with donation links
- User authentication via Supabase (Google OAuth)
- Feedback system with database persistence

## Tech Stack

**Frontend:** React, Vite, TailwindCSS, Zustand, React Router, Leaflet, Recharts  
**Backend:** Node.js, Express, Axios  
**Services:** Supabase, The Guardian API, Google Gemini AI, OpenWeatherMap API

## Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- API keys (Guardian, Gemini, OpenWeatherMap)

### Installation

1. Clone the repository
```bash
git clone https://github.com/noneedofthat/ecopulse.git
cd ecopulse
```

2. Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

3. Configure environment variables

**Backend** (`backend/.env`):
```env
PORT=4000
CLIENT_URL=http://localhost:5173
GUARDIAN_API_KEY=your_key
GEMINI_API_KEY=your_key
OPENWEATHER_API_KEY=your_key
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_KEY=your_key
```

**Frontend** (`frontend/.env.local`):
```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

4. Start development servers
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

5. Open http://localhost:5173

## Deployment

See [DEPLOY_QUICK_START.md](DEPLOY_QUICK_START.md) for deployment instructions.

**Live Demo:** [https://ecopulse-frontend-cqtc.vercel.app](https://ecopulse-frontend-cqtc.vercel.app)

## Project Structure

```
ecopulse/
├── backend/
│   ├── src/
│   │   ├── controllers/    # API logic
│   │   ├── routes/         # Express routes
│   │   └── server.js       # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # State management
│   │   └── utils/          # Utilities
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/news` - Fetch news articles
- `GET /api/aqi/current` - Current air quality
- `POST /api/ai/summary` - Generate AI summary
- `POST /api/chat/message` - Chat with AI
- `POST /api/feedback` - Submit feedback

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- The Guardian - Environmental news API
- Google Gemini - AI capabilities
- OpenWeatherMap - Air quality data
- Supabase - Backend infrastructure

---

**Making environmental awareness accessible to everyone.**
