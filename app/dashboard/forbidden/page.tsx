'use client'

import { Button } from "@nextui-org/button"
import { useRouter } from 'next/navigation'

export default function ForbiddenPage() {
  const router = useRouter()

  const handleRetrySignIn = () => {
    // Redirect to the home page or trigger the sign-in modal
    router.push('/')
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Access Forbidden</h1>
      <p className="mb-6">You do not have permission to access this page. Please sign in to continue.</p>
      <Button color="primary" onPress={handleRetrySignIn}>
        Retry Sign In
      </Button>
    </div>
  )
}