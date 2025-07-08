import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'

const ErrorPage = () => {
  const [searchParams] = useSearchParams()
  const errorMessage = searchParams.get('message') || 'An error occurred'
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-blue-50 to-purple-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100 text-center">
        <h1 className="text-2xl font-bold text-error mb-4 font-display">Authentication Error</h1>
        <p className="text-gray-700 mb-6 font-body">{errorMessage}</p>
        <Link to="/login" className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-light transition-colors font-body">
          Return to Login
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage