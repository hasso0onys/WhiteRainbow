'use client'

import { useEffect } from 'react'

export default function ScrollToTop() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
    
    // Also ensure it stays at top after any initial render
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
    
    return () => clearTimeout(timeout)
  }, [])

  return null
}

