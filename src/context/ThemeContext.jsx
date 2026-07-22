import { createContext, useContext, useState, useEffect } from 'react'
import { themes } from '../themes'

const ThemeContext = createContext()

const STORAGE_KEY = 'calculator_theme'

function loadTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && themes[stored]) return stored
  } catch {}
  return 'lavender'
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(loadTheme)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, themeId)
    const theme = themes[themeId]
    if (!theme) return
    const root = document.documentElement
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    root.setAttribute('data-theme', themeId)
  }, [themeId])

  const theme = themes[themeId]

  return (
    <ThemeContext.Provider value={{ themeId, theme, setThemeId, isDark: theme?.dark ?? false }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
