# EcoPulse

**Your Pulse on the Planet** - Real-time environmental news, AQI tracking, and conservation resources.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/yourusername/ecopulse/graphs/commit-activity)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/yourusername/ecopulse)
[![Code Style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

---

## Overview

EcoPulse is a comprehensive environmental awareness platform that aggregates real-time environmental news, provides global air quality monitoring, and offers AI-powered insights. The platform combines multiple data sources and modern web technologies to deliver an intuitive user experience for environmental information and action.

### Key Capabilities

**News Aggregation**
- Real-time environmental news from The Guardian API
- Advanced search and filtering by location, category, and keywords
- Chronological and relevance-based sorting

**Air Quality Monitoring**
- Global AQI tracking for any location worldwide
- Real-time data from OpenWeatherMap API
- Interactive maps with click-to-explore functionality
- Historical trends with 7-day charts
- Comprehensive pollutant data (PM2.5, PM10, O3, NO2, SO2, CO)

**AI Integration**
- Article summarization using Google Gemini AI
- Real-time streaming responses
- Intelligent chatbot for environmental queries
- Context-aware assistance

**NGO Directory**
- Curated list of 15 environmental organizations
- International and regional coverage
- Categorized by focus area (Wildlife, Forest, Ocean, Climate, Renewable Energy)
- Direct donation links

**User Features**
- Secure authentication via Supabase and Google OAuth
- Structured feedback system with database persistence
- Responsive design optimized for all devices
- Row-level security for data protection

---

## Technology Stack

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 5.4.21
- **Styling**: TailwindCSS 3.4.1
- **State Management**: Zustand 4.5.0
- **Routing**: React Router DOM 6.21.3
- **HTTP Client**: Axios 1.6.7
- **Maps**: React Leaflet 4.2.1
- **Charts**: Recharts 2.12.0
- **Icons**: Lucide React 0.344.0

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express 4.18.2
- **Security**: Helmet 7.1.0, CORS 2.8.5
- **Rate Limiting**: Express Rate Limit 7.1.5
- **Logging**: Morgan 1.10.0
- **HTTP Client**: Axios 1.6.7

### Services & APIs
- **Database & Auth**: Supabase
- **News**: The Guardian Open Platform API
- **AI**: Google Gemini 2.5 Flash
- **Air Quality**: OpenWeatherMap API, AQICN API

---

## Project Structure

```
ecopulse/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Business logic for API endpoints
│   │   ├── routes/           # Express route definitions
│   │   ├── middleware/       # Authentication, rate limiting
│   │   └── server.js         # Application entry point
│   ├── .env.example          # Environment variables template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── auth/         # Authentication components
│   │   │   ├── chat/         # Chatbot components
│   │   │   ├── layout/       # Layout components (Navbar, Footer)
│   │   │   ├── news/         # News feed components
│   │   │   └── ngo/          # NGO directory components
│   │   ├── pages/            # Page-level components
│   │   ├── store/            # Zustand state management
│   │   ├── utils/            # Utility functions, API client
│   │   ├── lib/              # Third-party library configs
│   │   ├── data/             # Static data (NGO list)
│   │   └── App.jsx           # Root application component
│   ├── .env.example          # Environment variables template
│   └── package.json
│
├── docs/
│   ├── DEPLOYMENT.md         # Deployment instructions
│   └── SUPABASE_SETUP.md     # Database setup guide
│
├── supabase_feedback_table.sql  # Database schema
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- Supabase account
- API keys for external services

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecopulse.git
   cd ecopulse
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**
   
   **Backend** - Copy `backend/.env.example` to `backend/.env`:
   ```env
   PORT=4000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   JWT_SECRET=your_jwt_secret
   
   # API Keys
   GUARDIAN_API_KEY=your_guardian_api_key
   GEMINI_API_KEY=your_gemini_api_key
   OPENWEATHER_API_KEY=your_openweather_api_key
   AQICN_API_KEY=your_aqicn_api_key
   
   # Supabase
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   ```

   **Frontend** - Copy `frontend/.env.example` to `frontend/.env.local`:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Set up Supabase database**
   - Create a new project at https://supabase.com
   - Run the SQL script from `supabase_feedback_table.sql` in the SQL Editor
   - Enable Google OAuth provider in Authentication settings
   - Refer to `docs/SUPABASE_SETUP.md` for detailed instructions

6. **Start development servers**
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000
   - API Health Check: http://localhost:4000/api/health

---

## API Documentation

### News Endpoints

**GET** `/api/news`
- Fetch environmental news articles
- Query Parameters:
  - `page` (number): Page number for pagination
  - `q` (string): Search query
  - `section` (string): News category filter
  - `location` (string): Geographic filter
  - `orderBy` (string): Sort order (newest, oldest, relevance)

### AQI Endpoints

**GET** `/api/aqi/current`
- Get current air quality index for coordinates
- Query Parameters:
  - `lat` (number): Latitude
  - `lon` (number): Longitude

**GET** `/api/aqi/history`
- Retrieve historical AQI data
- Query Parameters:
  - `lat` (number): Latitude
  - `lon` (number): Longitude
  - `start` (timestamp): Start time (optional)
  - `end` (timestamp): End time (optional)

**GET** `/api/aqi/geocode`
- Convert city name to coordinates
- Query Parameters:
  - `city` (string): City name

### AI Endpoints

**POST** `/api/ai/summary`
- Generate article summary using AI
- Request Body:
  ```json
  {
    "title": "Article title",
    "body": "Article content"
  }
  ```
- Response: Server-Sent Events (SSE) stream

**POST** `/api/chat/message`
- Send message to AI chatbot
- Request Body:
  ```json
  {
    "message": "User message",
    "history": [{"role": "user", "content": "..."}]
  }
  ```

### Health Check

**GET** `/api/health`
- Check API status
- Response:
  ```json
  {
    "status": "ok",
    "service": "EcoPulse API",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
  ```

---

## Deployment

Comprehensive deployment instructions are available in `docs/DEPLOYMENT.md`.

### Recommended Hosting

- **Frontend**: Vercel (Free tier available)
- **Backend**: Render or Railway (Free tier available)
- **Database**: Supabase (Free tier: 500MB database, 50K MAU)

### Quick Deployment Steps

1. Deploy backend to Render/Railway
2. Deploy frontend to Vercel
3. Update environment variables with production URLs
4. Configure Supabase redirect URLs
5. Test all features in production

---

## Security

- Environment variables for sensitive data
- CORS configuration for cross-origin requests
- Rate limiting (200 requests per 15 minutes)
- Helmet.js security headers
- Supabase Row Level Security (RLS)
- Input validation and sanitization
- HTTPS enforcement in production

---

## Performance

- Code splitting with Vite
- Lazy loading for routes
- Image optimization
- Response caching
- Gzip compression
- Efficient API calls with request deduplication
- Optimized bundle size

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **The Guardian** - Environmental news API
- **Google Gemini** - AI capabilities for summaries and chatbot
- **OpenWeatherMap** - Air quality data
- **AQICN** - Alternative air quality data source
- **Supabase** - Backend infrastructure and authentication
- **Vercel** - Frontend hosting platform

---

## Contact

Project Link: [https://github.com/yourusername/ecopulse](https://github.com/yourusername/ecopulse)

---

**Making environmental awareness accessible to everyone.**
