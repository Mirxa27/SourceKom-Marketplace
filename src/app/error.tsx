'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <AlertTriangle className="w-20 h-20 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Something went wrong!</h2>
          <p className="text-muted-foreground">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>
            Try Again
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  )
}
