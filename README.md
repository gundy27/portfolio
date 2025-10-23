# Dan Gunderson's Portfolio Website

A modern portfolio website with RAG-powered chatbot, content management system, and resource library. Built with Next.js 16, React 19, Supabase, and featuring a hexagon motif design.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **UI Components**: shadcn/ui (custom hexagon theme)
- **Backend**: Supabase (Auth, Database, Storage)
- **RAG Chatbot**: Python FastAPI with ai-utils libraries
- **Deployment**: Vercel

## Features

- 🤖 RAG-powered chatbot with page citation support
- 📚 Case studies with rich media galleries
- 📦 Resources library with downloadable templates
- 📅 Interactive timeline view
- 🎨 CMS dashboard for content management
- 🔐 Supabase authentication
- 🎯 Hexagon-themed minimal design
- 📱 Fully responsive (desktop + mobile)

## Getting Started

### Prerequisites

- Node.js >= 18
- Python >= 3.11
- Supabase account
- OpenAI API key

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the migration file to create tables:
   - Go to SQL Editor in Supabase Dashboard
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Execute the SQL
3. Create storage buckets:
   - Go to Storage in Supabase Dashboard
   - Create public buckets: `case-studies`, `resources`, `media`, `profile-images`
4. Set up authentication:
   - Go to Authentication → Providers
   - Enable Email provider
   - Create your admin user account

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# RAG Backend
NEXT_PUBLIC_RAG_API_URL=http://localhost:8000

# OpenAI (for RAG backend)
OPENAI_API_KEY=your-openai-api-key
```

Get your Supabase keys from: Project Settings → API

### 4. Set Up RAG Backend

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload --port 8000
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
portfolio/
├── app/                        # Next.js app router
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage
│   ├── case-studies/          # Case studies pages
│   ├── resources/             # Resources library
│   ├── timeline/              # Timeline view
│   ├── dashboard/             # CMS dashboard
│   └── api/                   # API routes
├── components/                # React components
│   ├── ui/                    # shadcn/ui components
│   ├── chatbot/               # Chatbot components
│   ├── case-studies/          # Case study components
│   ├── resources/             # Resource components
│   ├── timeline/              # Timeline components
│   └── dashboard/             # Dashboard components
├── lib/                       # Utilities
│   ├── supabase/              # Supabase clients
│   ├── hooks/                 # Custom React hooks
│   └── utils/                 # Helper functions
├── backend/                   # Python RAG API
├── supabase/                  # Database migrations
└── public/                    # Static assets
```

## Development

### Running Locally

```bash
# Frontend
npm run dev

# Backend (in separate terminal)
cd backend
poetry run uvicorn app.main:app --reload --port 8000
```

### Database Migrations

To modify the database schema:
1. Create a new migration file in `supabase/migrations/`
2. Run it via Supabase Dashboard SQL Editor

### Adding Content

Log in to the dashboard at `/dashboard` to:
- Add case studies
- Upload resources
- Manage timeline events
- Update profile information
- View chatbot analytics

## Deployment

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables in Vercel project settings
4. Deploy

### Deploy Backend

Options:
- Vercel Serverless Functions
- Railway
- Render
- AWS Lambda

## Design System

### Colors

- **Primary**: Blue (#3b82f6)
- **Secondary**: Purple (#8b5cf6)
- **Accent**: Cyan (#06b6d4)
- **Background**: Dark slate (#0f172a)

### Hexagon Utilities

```tsx
// Hexagon clip path
<div className="clip-hexagon">...</div>

// Hexagon pattern background
<div className="hexagon-pattern">...</div>

// Text gradient
<h1 className="text-gradient">...</h1>

// Glass morphism
<div className="glass">...</div>
```

## RAG Chatbot

The chatbot uses your ai-utils RAG template and can:
- Answer questions about your work
- Cite specific page sections
- Stream responses in real-time
- Log conversations for analytics

## License

Private - All rights reserved

## Author

Dan Gunderson - [dan@gundy.io](mailto:dan@gundy.io)
