<div align="center">

# EcoPulse

### Your Pulse on the Planet

Real-time environmental news, global air quality monitoring, and conservation resources powered by AI.

<br/>

![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)

<br/>

![Backend](https://img.shields.io/badge/Backend-Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Frontend](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<br/>

[![Live Demo](https://img.shields.io/badge/LIVE%20DEMO-Click%20Here-green?style=for-the-badge&logo=vercel&logoColor=white)](https://ecopulse-frontend-cqtc.vercel.app)

</div>

---

## Features

- Real-time environmental news from The Guardian API with search and filters
- Global AQI tracking with interactive maps and 7-day historical data
- AI-powered article summaries using Google Gemini
- Intelligent chatbot for environmental queries
- Curated NGO directory with donation links
- User authentication via Supabase (Google OAuth)
- Feedback system with database persistence

---

## Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | React 18, Vite 5, TailwindCSS, Zustand, React Router v6 |
| **Backend** | Node.js 18+, Express 4.x, Axios |
| **Database & Auth** | Supabase (PostgreSQL + Auth) |
| **APIs** | The Guardian API, Google Gemini 2.5 Flash, OpenWeatherMap API |
| **Maps & Charts** | React Leaflet, Recharts |
| **Deployment** | Vercel (Frontend), Railway (Backend) |

---

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

---

## Deployment

See [DEPLOY_QUICK_START.md](DEPLOY_QUICK_START.md) for deployment instructions.

**Live Demo:** [https://ecopulse-frontend-cqtc.vercel.app](https://ecopulse-frontend-cqtc.vercel.app)

---

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

---

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/news` - Fetch news articles
- `GET /api/aqi/current` - Current air quality
- `POST /api/ai/summary` - Generate AI summary
- `POST /api/chat/message` - Chat with AI
- `POST /api/feedback` - Submit feedback

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- The Guardian - Environmental news API
- Google Gemini - AI capabilities
- OpenWeatherMap - Air quality data
- Supabase - Backend infrastructure

---

<div align="center">

**Making environmental awareness accessible to everyone.**

<sub>Built with the MERN stack + Supabase</sub>

</div>
