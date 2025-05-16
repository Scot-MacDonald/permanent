'use client'

import * as React from 'react'
import { Sun, Moon } from 'lucide-react'
import { Toggle } from '@radix-ui/react-toggle'
import { cn } from '@/utilities/ui'
import { Theme, themeLocalStorageKey, defaultTheme } from './types'

export const ThemeSelector: React.FC = () => {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme
    return (localStorage.getItem(themeLocalStorageKey) as Theme) ?? defaultTheme
  })

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(themeLocalStorageKey, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <Toggle
      pressed={theme === 'dark'}
      onPressedChange={toggleTheme}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center  text-foreground transition-colors hover: hover:text-accent-foreground ',
      )}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Toggle>
  )
}

export default ThemeSelector
