# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Name**: AI Voice Keyboard (or your preferred name)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
4. Wait for project to be created (~2 minutes)

## Step 2: Get API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - (Optional) **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## Step 3: Set Environment Variables

1. Create a `.env.local` file in the project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

2. **Never commit** `.env.local` to git (it's already in `.gitignore`)

## Step 4: Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire contents of `supabase/schema.sql`
4. Click **Run** (or press Cmd/Ctrl + Enter)
5. Verify tables were created:
   - Go to **Table Editor**
   - You should see: `profiles`, `transcriptions`, `dictionary_entries`

## Step 5: Configure Auth Settings

1. Go to **Authentication** → **Settings**
2. Configure:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: Add `http://localhost:3000/**` and your production URL
3. Enable **Email** provider (enabled by default)

## Step 6: Test Authentication

1. Start your dev server: `npm run dev`
2. Navigate to `/register` and create an account
3. Check Supabase dashboard → **Authentication** → **Users** to see the new user
4. Check **Table Editor** → **profiles** to see the auto-created profile

## Database Schema Overview

### Tables

1. **profiles** (extends auth.users)
   - Stores additional user information
   - Auto-created when user signs up

2. **transcriptions**
   - Stores all user transcriptions
   - Linked to user via `user_id`
   - Includes audio metadata

3. **dictionary_entries**
   - Custom word spellings per user
   - Unique constraint on (user_id, word)

### Security (RLS)

- **Row Level Security (RLS)** is enabled on all tables
- Users can only access their own data
- Policies automatically enforce this

## Troubleshooting

### "Invalid API key" error
- Check that `.env.local` has correct values
- Restart dev server after changing env vars

### "User not found" after signup
- Check if trigger `on_auth_user_created` exists
- Re-run the schema SQL if needed

### RLS blocking queries
- Verify policies are created correctly
- Check that user is authenticated: `auth.uid()` should return user ID

## Next Steps

- Set up email templates in **Authentication** → **Email Templates**
- Configure password reset emails
- Add OAuth providers (Google, GitHub, etc.) if needed
- Set up storage buckets for audio files (if needed)

