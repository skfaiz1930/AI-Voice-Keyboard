import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Mic } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user.email}
              </p>
            </div>
            <Link href="/api/auth/signout">
              <Button variant="outline">Sign out</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg border-2 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                  <Mic className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold">Transcribe</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Start transcribing your voice to text
              </p>
              <Button className="w-full">Start Recording</Button>
            </div>

            <div className="p-6 bg-white rounded-lg border-2 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Recent Transcriptions</h2>
              <p className="text-muted-foreground text-sm">
                No transcriptions yet. Start recording to see them here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

