# AI Voice Keyboard

A minimalistic web application that allows users to transcribe voice to text using the OpenAI Whisper API. Built with Next.js, TypeScript, Tailwind CSS, and ShadCN UI.

## Features

- 🎤 **Real-time Voice Transcription** - Convert spoken audio to text using OpenAI Whisper API
- 🔐 **User Authentication** - Secure user accounts with registration and login
- 📚 **Custom Dictionary** - Add, edit, and manage special word spellings
- 🎨 **Minimalistic Design** - Clean, intuitive UI inspired by modern design patterns
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AI-Voice
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
AI-Voice/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── login/              # Login page (placeholder)
│   ├── register/           # Register page (placeholder)
│   └── globals.css         # Global styles
├── components/
│   └── ui/                 # ShadCN UI components
├── lib/
│   └── utils.ts            # Utility functions
└── PROJECT_BREAKDOWN.md    # Detailed project breakdown
```

## Current Status

✅ **Completed:**
- Project setup with Next.js, TypeScript, and Tailwind CSS
- ShadCN UI integration
- Landing page with hero section, features, and CTA
- Responsive navigation
- Modern, minimalistic design inspired by wisprflow.ai

🚧 **In Progress:**
- Authentication system
- Audio recording functionality
- OpenAI Whisper API integration

## Design Inspiration

The landing page design is inspired by [wisprflow.ai](https://wisprflow.ai), featuring:
- Clean hero section with compelling tagline
- Feature highlights with icons
- Step-by-step "How it works" section
- Strong call-to-action sections
- Modern gradient backgrounds and smooth animations

## Next Steps

1. Implement authentication (NextAuth.js)
2. Set up database (PostgreSQL with Prisma)
3. Build audio recording component
4. Integrate OpenAI Whisper API
5. Create dictionary management UI
6. Build transcription history page

## License

MIT

