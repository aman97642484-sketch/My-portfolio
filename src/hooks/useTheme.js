import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

// Keep this key in sync with the inline script in index.html.
const STORAGE_KEY = 'portfolio-theme'
const LIGHT_QUERY = '(prefers-color-scheme: light)'

// localStorage can throw in private windows or when site data is blocked.
function readSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // The theme still applies for this page view; it just won't persist.
  }
}

export function useTheme() {
  // index.html has already resolved the theme and set it before first paint.
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme ?? 'dark',
  )

  const applyTheme = useCallback((next) => {
    const commit = () => {
      flushSync(() => setTheme(next))
      document.documentElement.dataset.theme = next
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Cross-fades the whole page, including gradients, which CSS transitions
    // can't animate. Browsers without the API simply switch instantly.
    if (document.startViewTransition && !reduceMotion) {
      document.startViewTransition(commit)
    } else {
      commit()
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
    saveTheme(next)
    applyTheme(next)
  }, [applyTheme])

  // Until the visitor chooses a theme, keep following the system setting.
  useEffect(() => {
    const query = window.matchMedia(LIGHT_QUERY)
    const onChange = (event) => {
      if (!readSavedTheme()) applyTheme(event.matches ? 'light' : 'dark')
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [applyTheme])

  return { theme, toggleTheme }
}
