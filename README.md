# 🌱 EcoPulse

A modern, human-centered web application that raises environmental awareness by aggregating and displaying real-time environment-related news.

## Features

- 📰 Real-time environmental news from The Guardian
- 🔐 Authentication (Email/Password + Google OAuth)
- 🎨 Nature-inspired design with green and white tones
- 🌓 Dark/Light mode toggle
- 💬 User feedback system
- 📱 Mobile-first responsive design
- ♿ WCAG 2.1 accessibility compliant
- ⚡ Fast loading with optimized performance

## Tech Stack

- **Frontend**: React 18+ with Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **News API**: The Guardian
- **Routing**: React Router
- **Icons**: Google Material Icons
- **Fonts**: Google Fonts (Inter/Poppins)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- The Guardian API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in your API keys:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables:
   - Get The Guardian API key from https://open-platform.theguardian.com/
   - Set up Firebase project and get credentials
   - Add all credentials to `.env` file

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at localhost

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
ecopulse/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── common/      # Shared components
│   │   ├── news/        # News feed components
│   │   ├── auth/        # Authentication components
│   │   ├── feedback/    # Feedback components
│   │   └── home/        # Home page components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── hooks/           # Custom React hooks
│   ├── context/         # React context providers
│   ├── utils/           # Utility functions
│   ├── config/          # Configuration files
│   └── styles/          # Global styles
├── .env.example         # Environment variables template
└── README.md
```

## Environment Variables

See `.env.example` for required environment variables:

- `VITE_NEWS_API_KEY` - The Guardian API key
- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID

## License

This project is open source and available under the MIT License.

## Acknowledgments

- News data provided by [The Guardian](https://open-platform.theguardian.com/)
- Icons from [Google Material Icons](https://fonts.google.com/icons)
- Fonts from [Google Fonts](https://fonts.google.com)
