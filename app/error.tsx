'use client'

import React, { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled Client Error:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
      {/* Error Icon */}
      <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-600">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      {/* Error Titles */}
      <h2 className="text-2xl font-bold text-foreground mb-2">Đã xảy ra sự cố ngoài ý muốn</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Hệ thống gặp lỗi trong quá trình xử lý. Chúng tôi xin lỗi vì sự bất tiện này.
      </p>

      {/* Error Details for debug (in development) */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="w-full max-w-2xl p-4 mb-6 text-left bg-muted border border-muted-foreground/10 rounded-md font-mono text-sm overflow-auto max-h-48 text-rose-600 dark:text-rose-400">
          <p className="font-semibold mb-1">Error Name: {error.name}</p>
          <p className="font-semibold mb-2">Message: {error.message}</p>
          {error.stack && <pre className="whitespace-pre-wrap">{error.stack}</pre>}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium rounded-md shadow-sm transition-colors duration-200"
        >
          Tải lại trang (Thử lại)
        </button>
        <a
          href="/"
          className="px-6 py-2.5 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-md transition-colors duration-200 border border-input"
        >
          Về trang chủ
        </a>
      </div>
    </div>
  )
}
