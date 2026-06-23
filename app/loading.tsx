"use client";

import React from 'react';
import { useLanguage } from '@/context/language-context';

export default function Loading() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      {/* Decorative leaf icon or logo placeholder */}
      <div className="relative flex items-center justify-center w-20 h-20 mb-4">
        {/* Outer glowing pulsing circle */}
        <div className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-950/30 animate-ping opacity-75"></div>
        {/* Inner spinning ring */}
        <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        {/* Central icon */}
        <svg
          className="w-10 h-10 text-emerald-600 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707-.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      </div>

      {/* Loading Text */}
      <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-300 animate-pulse">
        {t("loadingData")}
      </h3>
      <p className="text-xs text-muted-foreground mt-2 animate-pulse delay-75">
        {t("loadingPreparing")}
      </p>

      {/* Skeleton placeholders to simulate page structure below */}
      <div className="w-full max-w-4xl mt-8 space-y-4 opacity-30 animate-pulse">
        <div className="h-8 bg-muted rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-48 bg-muted rounded"></div>
          <div className="h-48 bg-muted rounded"></div>
          <div className="h-48 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
}
