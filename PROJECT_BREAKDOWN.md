# AI Voice Keyboard Web App - Project Breakdown

## 1. Introduction to Project Goals

### Project Overview
The AI Voice Keyboard is a minimalistic web application that enables users to transcribe voice to text in real-time using OpenAI's Whisper API. The application focuses on providing a clean, efficient interface for voice-to-text conversion with support for custom dictionary entries for specialized terminology.

### Core Objectives
- **Real-time Voice Transcription**: Convert spoken audio to text using OpenAI Whisper API
- **User Authentication**: Secure user accounts with registration and login functionality
- **Custom Dictionary**: Allow users to add, edit, and manage special word spellings
- **Minimalistic Design**: Clean, intuitive UI that prioritizes ease of use
- **Data Persistence**: Save transcription history and dictionary entries per user

### User Personas

#### Primary Persona: Professional Writer
- **Needs**: Fast, accurate transcription for note-taking and content creation
- **Pain Points**: Generic transcription services don't understand specialized terminology
- **Goals**: Quick access to transcriptions, ability to customize word recognition

#### Secondary Persona: Medical/Technical Professional
- **Needs**: Accurate transcription of technical terms and jargon
- **Pain Points**: Standard transcription services misspell technical terms
- **Goals**: Custom dictionary for domain-specific vocabulary, reliable transcription

### Success Metrics
- Transcription accuracy rate > 95% for clear audio
- Average transcription time < 5 seconds for 30-second audio clips
- User retention rate > 70% after first week
- Dictionary usage rate > 40% of active users

---

## 2. Technology Stack

### Frontend Technologies

#### **Next.js 14+ (App Router)**
- **Purpose**: React framework with server-side rendering and API routes
- **Why**: Built-in API routes eliminate need for separate backend server, excellent performance, SEO-friendly
- **Key Features**: Server Components, Route Handlers, built-in optimizations

#### **TypeScript**
- **Purpose**: Type-safe JavaScript for better code quality
- **Why**: Reduces bugs, improves developer experience, better IDE support

#### **ShadCN UI**
- **Purpose**: High-quality, accessible component library
- **Why**: Customizable, modern design system, built on Radix UI primitives
- **Components Needed**: Button, Input, Card, Dialog, Toast, Form components

#### **Tailwind CSS**
- **Purpose**: Utility-first CSS framework
- **Why**: Rapid UI development, consistent design, minimal CSS footprint
- **Usage**: Styling all components, responsive design

#### **React Hook Form**
- **Purpose**: Performant form library
- **Why**: Minimal re-renders, easy validation, great TypeScript support

#### **Zod**
- **Purpose**: TypeScript-first schema validation
- **Why**: Type-safe validation, works seamlessly with React Hook Form

#### **Recorder.js / MediaRecorder API**
- **Purpose**: Browser-based audio recording
- **Why**: Native browser support, no external dependencies, real-time audio capture

### Backend Technologies

#### **Next.js API Routes (Route Handlers)**
- **Purpose**: Server-side API endpoints
- **Why**: Unified codebase, no separate server needed, built-in middleware support

#### **PostgreSQL**
- **Purpose**: Relational database for persistent data storage
- **Why**: Robust, ACID-compliant, excellent for structured data, supports JSON for flexible schemas
- **Hosting Options**: Supabase, Neon, Railway, or self-hosted

#### **Prisma ORM**
- **Purpose**: Type-safe database client and migration tool
- **Why**: Excellent TypeScript support, automatic migrations, type inference

#### **NextAuth.js (Auth.js)**
- **Purpose**: Authentication and session management
- **Why**: Secure, flexible, supports multiple providers, built for Next.js

#### **OpenAI API (Whisper)**
- **Purpose**: Speech-to-text transcription
- **Why**: State-of-the-art accuracy, supports multiple languages, handles various audio formats

#### **AWS S3 / Cloudinary / Uploadthing**
- **Purpose**: Audio file storage (optional, for longer recordings)
- **Why**: Scalable storage, CDN delivery, cost-effective for large files

### Development Tools

#### **ESLint & Prettier**
- **Purpose**: Code quality and formatting
- **Why**: Consistent code style, catch errors early

#### **Vitest / Jest**
- **Purpose**: Unit and integration testing
- **Why**: Fast test runner, great TypeScript support

#### **Playwright / Cypress**
- **Purpose**: End-to-end testing
- **Why**: Test real user interactions, browser automation

---

## 3. Database Design

### Schema Overview

The database will consist of four main tables: `users`, `transcriptions`, `dictionary_entries`, and `sessions` (managed by NextAuth).

### Table: `users`
Stores user account information (managed by NextAuth, extended with custom fields).

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique user identifier |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| `name` | VARCHAR(255) | NULLABLE | User's display name |
| `emailVerified` | TIMESTAMP | NULLABLE | Email verification timestamp |
| `image` | VARCHAR(500) | NULLABLE | Profile image URL |
| `createdAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Account creation date |
| `updatedAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

### Table: `transcriptions`
Stores user transcription history.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique transcription ID |
| `userId` | UUID | FOREIGN KEY → users.id, NOT NULL | Owner of transcription |
| `text` | TEXT | NOT NULL | Transcribed text content |
| `audioUrl` | VARCHAR(500) | NULLABLE | URL to audio file (if stored) |
| `audioDuration` | INTEGER | NULLABLE | Duration in seconds |
| `language` | VARCHAR(10) | NULLABLE | Detected language code |
| `confidence` | DECIMAL(5,2) | NULLABLE | Confidence score (0-100) |
| `createdAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Transcription timestamp |
| `updatedAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_transcriptions_userId` on `userId`
- `idx_transcriptions_createdAt` on `createdAt` (DESC)

### Table: `dictionary_entries`
Stores custom word spellings for each user.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique dictionary entry ID |
| `userId` | UUID | FOREIGN KEY → users.id, NOT NULL | Owner of dictionary entry |
| `word` | VARCHAR(255) | NOT NULL | The word/phrase to recognize |
| `spelling` | VARCHAR(255) | NOT NULL | Preferred spelling/transcription |
| `context` | TEXT | NULLABLE | Optional context or notes |
| `createdAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Entry creation date |
| `updatedAt` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_dictionary_userId` on `userId`
- `idx_dictionary_word` on `word` (for search)
- **Unique Constraint**: `(userId, word)` - one spelling per word per user

### Table: `accounts` (NextAuth)
OAuth account information.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Account ID |
| `userId` | UUID | FOREIGN KEY → users.id | Associated user |
| `type` | VARCHAR(50) | NOT NULL | Provider type (oauth, email, etc.) |
| `provider` | VARCHAR(50) | NOT NULL | Provider name |
| `providerAccountId` | VARCHAR(255) | NOT NULL | Provider's user ID |
| `refresh_token` | TEXT | NULLABLE | OAuth refresh token |
| `access_token` | TEXT | NULLABLE | OAuth access token |
| `expires_at` | INTEGER | NULLABLE | Token expiration |
| `token_type` | VARCHAR(50) | NULLABLE | Token type |
| `scope` | VARCHAR(255) | NULLABLE | OAuth scope |
| `id_token` | TEXT | NULLABLE | OpenID token |

**Unique Constraint**: `(provider, providerAccountId)`

### Table: `sessions` (NextAuth)
User session information.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Session ID |
| `sessionToken` | VARCHAR(255) | UNIQUE, NOT NULL | Session token |
| `userId` | UUID | FOREIGN KEY → users.id, NOT NULL | Associated user |
| `expires` | TIMESTAMP | NOT NULL | Session expiration |

### Table: `verification_tokens` (NextAuth)
Email verification tokens.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `identifier` | VARCHAR(255) | NOT NULL | Email or identifier |
| `token` | VARCHAR(255) | UNIQUE, NOT NULL | Verification token |
| `expires` | TIMESTAMP | NOT NULL | Token expiration |

**Unique Constraint**: `(identifier, token)`

### Database Relationships

```
users (1) ──< (many) transcriptions
users (1) ──< (many) dictionary_entries
users (1) ──< (many) accounts
users (1) ──< (many) sessions
```

---

## 4. Backend API Endpoints

### Authentication Endpoints

#### `POST /api/auth/register`
- **Purpose**: Register a new user account
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123",
    "name": "John Doe"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "session": { ... }
  }
  ```
- **Error Handling**: 400 (validation), 409 (email exists)

#### `POST /api/auth/login`
- **Purpose**: Authenticate existing user
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```
- **Response**: `200 OK` with session token
- **Error Handling**: 401 (invalid credentials)

#### `POST /api/auth/logout`
- **Purpose**: End user session
- **Authentication**: Required (session token)
- **Response**: `200 OK`

#### `GET /api/auth/session`
- **Purpose**: Get current user session
- **Authentication**: Required
- **Response**: `200 OK`
  ```json
  {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
  ```

### Transcription Endpoints

#### `POST /api/transcribe`
- **Purpose**: Transcribe audio to text using Whisper API
- **Authentication**: Required
- **Request**: `multipart/form-data`
  - `audio`: Audio file (Blob/File)
  - `language` (optional): Language code (e.g., "en", "es")
  - `prompt` (optional): Context prompt for better accuracy
- **Processing**:
  1. Validate audio file (format, size limits)
  2. Apply user's dictionary entries as prompt context
  3. Call OpenAI Whisper API
  4. Post-process transcription with dictionary replacements
  5. Save to database
- **Response**: `200 OK`
  ```json
  {
    "id": "uuid",
    "text": "Transcribed text here...",
    "language": "en",
    "confidence": 95.5,
    "duration": 30,
    "createdAt": "2024-01-01T00:00:00Z"
  }
  ```
- **Error Handling**: 400 (invalid file), 413 (file too large), 500 (API error)

#### `GET /api/transcriptions`
- **Purpose**: Get user's transcription history
- **Authentication**: Required
- **Query Parameters**:
  - `page` (default: 1): Page number
  - `limit` (default: 20): Items per page
  - `search` (optional): Search in transcription text
- **Response**: `200 OK`
  ```json
  {
    "transcriptions": [
      {
        "id": "uuid",
        "text": "Transcribed text...",
        "createdAt": "2024-01-01T00:00:00Z",
        "duration": 30
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
  ```

#### `GET /api/transcriptions/[id]`
- **Purpose**: Get specific transcription by ID
- **Authentication**: Required
- **Authorization**: User must own the transcription
- **Response**: `200 OK` with full transcription object
- **Error Handling**: 404 (not found), 403 (forbidden)

#### `DELETE /api/transcriptions/[id]`
- **Purpose**: Delete a transcription
- **Authentication**: Required
- **Authorization**: User must own the transcription
- **Response**: `200 OK`
- **Error Handling**: 404 (not found), 403 (forbidden)

### Dictionary Endpoints

#### `GET /api/dictionary`
- **Purpose**: Get user's dictionary entries
- **Authentication**: Required
- **Query Parameters**:
  - `search` (optional): Filter by word
- **Response**: `200 OK`
  ```json
  {
    "entries": [
      {
        "id": "uuid",
        "word": "aspirin",
        "spelling": "Aspirin",
        "context": "Brand name medication",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
  ```

#### `POST /api/dictionary`
- **Purpose**: Create new dictionary entry
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "word": "aspirin",
    "spelling": "Aspirin",
    "context": "Brand name medication"
  }
  ```
- **Validation**: 
  - `word` and `spelling` required
  - Check for duplicate (userId + word)
- **Response**: `201 Created` with entry object
- **Error Handling**: 400 (validation), 409 (duplicate)

#### `PUT /api/dictionary/[id]`
- **Purpose**: Update dictionary entry
- **Authentication**: Required
- **Authorization**: User must own the entry
- **Request Body**: Same as POST
- **Response**: `200 OK` with updated entry
- **Error Handling**: 404 (not found), 403 (forbidden)

#### `DELETE /api/dictionary/[id]`
- **Purpose**: Delete dictionary entry
- **Authentication**: Required
- **Authorization**: User must own the entry
- **Response**: `200 OK`
- **Error Handling**: 404 (not found), 403 (forbidden)

### Utility Endpoints

#### `GET /api/health`
- **Purpose**: Health check endpoint
- **Response**: `200 OK`
  ```json
  {
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00Z"
  }
  ```

---

## 5. Frontend Development

### Application Structure

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── (dashboard)/
│   ├── layout.tsx
│   ├── page.tsx (Home/Transcribe)
│   ├── history/
│   │   └── page.tsx
│   └── dictionary/
│       └── page.tsx
├── api/
│   └── [endpoints as defined above]
├── components/
│   ├── ui/ (ShadCN components)
│   ├── audio/
│   │   ├── AudioRecorder.tsx
│   │   └── AudioPlayer.tsx
│   ├── transcription/
│   │   ├── TranscriptionCard.tsx
│   │   └── TranscriptionList.tsx
│   └── dictionary/
│       ├── DictionaryForm.tsx
│       └── DictionaryList.tsx
└── lib/
    ├── utils.ts
    ├── api.ts
    └── whisper.ts
```

### Core Components

#### 1. **AudioRecorder Component**
- **Purpose**: Record audio from microphone
- **Features**:
  - Start/Stop recording button
  - Visual recording indicator (waveform or timer)
  - Real-time audio level visualization
  - Audio format selection (WAV, MP3)
  - Maximum recording duration (e.g., 5 minutes)
- **State Management**:
  - Recording status (idle, recording, processing)
  - Audio blob/data
  - Recording duration
- **User Flow**:
  1. User clicks "Start Recording"
  2. Browser requests microphone permission
  3. Recording starts, visual feedback shown
  4. User clicks "Stop Recording"
  5. Audio blob is ready for transcription

#### 2. **TranscriptionDisplay Component**
- **Purpose**: Show transcribed text and allow editing
- **Features**:
  - Display transcribed text in editable textarea
  - Copy to clipboard button
  - Save transcription button
  - Apply dictionary corrections automatically
  - Formatting options (bold, italic for notes)
- **User Flow**:
  1. Transcription appears after processing
  2. User can edit text directly
  3. Dictionary entries automatically applied
  4. User saves or copies text

#### 3. **DictionaryManager Component**
- **Purpose**: Manage custom word spellings
- **Features**:
  - Add new word/spelling pair
  - Edit existing entries
  - Delete entries
  - Search/filter dictionary
  - Bulk import (CSV/JSON)
- **User Flow**:
  1. User navigates to Dictionary page
  2. Views list of existing entries
  3. Clicks "Add Entry" to create new
  4. Fills form (word, spelling, optional context)
  5. Saves entry
  6. Entry is immediately available for future transcriptions

#### 4. **TranscriptionHistory Component**
- **Purpose**: Display past transcriptions
- **Features**:
  - Paginated list of transcriptions
  - Search/filter functionality
  - Sort by date (newest/oldest)
  - Quick actions (copy, delete, view details)
  - Date grouping (Today, Yesterday, This Week, etc.)
- **User Flow**:
  1. User navigates to History page
  2. Sees paginated list of transcriptions
  3. Can search for specific text
  4. Clicks on transcription to view/edit
  5. Can delete unwanted transcriptions

### Navigation Structure

#### Main Navigation (Dashboard Layout)
```
┌─────────────────────────────────────┐
│  AI Voice Keyboard        [User Menu]│
├─────────────────────────────────────┤
│  [Transcribe] [History] [Dictionary]│
└─────────────────────────────────────┘
```

#### User Menu Dropdown
- Profile Settings
- Logout

### Page Layouts

#### **Home/Transcribe Page** (`/`)
- **Layout**: Centered, minimal design
- **Components**:
  - Large, prominent "Record" button
  - Transcription display area
  - Quick actions toolbar
- **Design Considerations**:
  - Focus on recording functionality
  - Clear visual hierarchy
  - Minimal distractions
  - Responsive: Mobile-first design

#### **History Page** (`/history`)
- **Layout**: Full-width list with sidebar filters
- **Components**:
  - Search bar
  - Filter options (date range, sort)
  - Transcription cards list
  - Pagination controls
- **Design Considerations**:
  - Efficient use of space
  - Quick scanning of transcriptions
  - Easy access to actions

#### **Dictionary Page** (`/dictionary`)
- **Layout**: Split view (form + list)
- **Components**:
  - Dictionary entry form (left/top)
  - Dictionary entries list (right/bottom)
  - Search/filter bar
- **Design Considerations**:
  - Easy to add entries while viewing list
  - Clear indication of active entries
  - Validation feedback

### User Flow Diagrams

#### Primary Flow: Voice Transcription
```
1. User lands on Home page
   ↓
2. Clicks "Start Recording"
   ↓
3. Grants microphone permission
   ↓
4. Speaks into microphone
   ↓
5. Clicks "Stop Recording"
   ↓
6. Audio is uploaded to server
   ↓
7. Server processes with Whisper API
   ↓
8. Dictionary entries applied
   ↓
9. Transcription displayed
   ↓
10. User edits/copies/saves text
```

#### Dictionary Management Flow
```
1. User navigates to Dictionary page
   ↓
2. Views existing entries
   ↓
3. Clicks "Add Entry"
   ↓
4. Fills form (word, spelling, context)
   ↓
5. Submits form
   ↓
6. Entry saved to database
   ↓
7. Entry appears in list
   ↓
8. Entry automatically used in future transcriptions
```

### Design System

#### Color Palette
- **Primary**: Blue (#3B82F6) - Actions, links
- **Secondary**: Gray (#6B7280) - Text, borders
- **Success**: Green (#10B981) - Success states
- **Error**: Red (#EF4444) - Errors, warnings
- **Background**: White/Light Gray (#FFFFFF, #F9FAFB)
- **Text**: Dark Gray (#111827) - Primary text

#### Typography
- **Heading**: Inter/Sans-serif, Bold
- **Body**: Inter/Sans-serif, Regular
- **Code/Monospace**: JetBrains Mono

#### Spacing
- Base unit: 4px
- Common spacing: 8px, 16px, 24px, 32px, 48px

#### Components Styling
- **Buttons**: Rounded corners (8px), padding (12px 24px)
- **Cards**: Subtle shadow, rounded corners (12px)
- **Inputs**: Border (1px), rounded (6px), focus ring
- **Icons**: 20px default size, consistent stroke width

### Responsive Design

#### Mobile (< 768px)
- Single column layout
- Full-width buttons
- Stacked components
- Bottom navigation bar (optional)

#### Tablet (768px - 1024px)
- Two-column layout where appropriate
- Adjusted spacing
- Touch-friendly targets (min 44px)

#### Desktop (> 1024px)
- Multi-column layouts
- Sidebar navigation
- Hover states
- Keyboard shortcuts

### Accessibility Considerations

- **ARIA Labels**: All interactive elements
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Semantic HTML, proper headings
- **Color Contrast**: WCAG AA compliance
- **Focus Indicators**: Clear focus states
- **Error Messages**: Descriptive, actionable

### Performance Optimizations

- **Code Splitting**: Route-based splitting
- **Image Optimization**: Next.js Image component
- **Audio Compression**: Client-side compression before upload
- **Lazy Loading**: Components loaded on demand
- **Caching**: API responses cached where appropriate
- **Debouncing**: Search inputs debounced

---

## 6. Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Project setup (Next.js, TypeScript, Tailwind)
- [ ] Database setup (PostgreSQL, Prisma)
- [ ] Authentication system (NextAuth)
- [ ] Basic UI components (ShadCN setup)
- [ ] Landing page and navigation

### Phase 2: Core Features (Week 2)
- [ ] Audio recording functionality
- [ ] File upload to server
- [ ] OpenAI Whisper API integration
- [ ] Basic transcription display
- [ ] Transcription history page

### Phase 3: Dictionary Feature (Week 3)
- [ ] Dictionary CRUD operations
- [ ] Dictionary application to transcriptions
- [ ] Dictionary management UI
- [ ] Search and filter functionality

### Phase 4: Polish & Optimization (Week 4)
- [ ] Error handling and validation
- [ ] Loading states and feedback
- [ ] Responsive design refinement
- [ ] Performance optimization
- [ ] Testing (unit, integration, E2E)

### Phase 5: Deployment (Week 5)
- [ ] Production database setup
- [ ] Environment configuration
- [ ] Deployment to Vercel/Railway
- [ ] Monitoring and analytics
- [ ] Documentation

---

## 7. Security Considerations

### Authentication
- Secure password hashing (bcrypt)
- JWT token expiration
- CSRF protection
- Rate limiting on auth endpoints

### API Security
- Input validation and sanitization
- File upload restrictions (type, size)
- Rate limiting on transcription endpoint
- API key security (environment variables)

### Data Privacy
- User data encryption at rest
- Secure audio file storage
- GDPR compliance considerations
- User data deletion capability

---

## 8. Future Enhancements

### Potential Features
- **Multi-language Support**: UI localization
- **Voice Commands**: Control app with voice
- **Export Options**: PDF, DOCX, TXT export
- **Collaboration**: Share transcriptions
- **Real-time Transcription**: WebSocket streaming
- **Mobile App**: React Native version
- **Offline Mode**: Service worker for offline use
- **Advanced Dictionary**: Context-aware suggestions
- **Analytics Dashboard**: Usage statistics

---

This breakdown provides a comprehensive roadmap for building the AI Voice Keyboard web application. Each section can be expanded with more detailed specifications as development progresses.

