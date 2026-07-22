import { useState, useEffect, useCallback } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { useTheme } from './context/ThemeContext'
import { useCalculator } from './hooks/useCalculator'
import Display from './components/Display'
import Keypad from './components/Keypad'
import History from './components/History'

function Calculator() {
  const calc = useCalculator()
  const { isDark } = useTheme()
  const [showHistory, setShowHistory] = useState(false)
  const [isScientific, setIsScientific] = useState(false)

  const handleKeyDown = useCallback((e) => {
    if (showHistory) return
    const key = e.key

    if (key >= '0' && key <= '9') { calc.inputDigit(parseInt(key)); return }
    if (key === '.') { calc.inputDecimal(); return }
    if (key === '+') { calc.handleOperator('+'); return }
    if (key === '-') { calc.handleOperator('−'); return }
    if (key === '*') { calc.handleOperator('×'); return }
    if (key === '/') { e.preventDefault(); calc.handleOperator('÷'); return }
    if (key === '%') { calc.inputPercent(); return }
    if (key === 'Enter' || key === '=') { calc.calculate(); return }
    if (key === 'Backspace') { calc.backspace(); return }
    if (key === 'Escape') { calc.clearAll(); return }
    if (key === 'Delete') { calc.clearEntry(); return }
  }, [showHistory, calc])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="app-bg min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="w-full max-w-sm relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2.5 backdrop-blur-md rounded-full px-5 py-2 mb-4" style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <div className="w-2 h-2 rounded-full" style={{ background: `linear-gradient(135deg, var(--accent-1), var(--accent-2))`, boxShadow: `0 0 8px var(--accent-1)` }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--text-secondary)' }}>Calculator Pro</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold heading-gradient tracking-tight leading-tight">
            Quick Calculate
          </h1>
          <p className="text-sm mt-2 font-medium" style={{ color: 'var(--text-muted)' }}>Precision calculations with elegant history</p>
        </div>

        {/* Calculator Card */}
        <div className="premium-card noise-overlay p-4 sm:p-5 flex flex-col" style={{ height: 'clamp(480px, 82vh, 600px)' }}>
          {/* Display */}
          <div className="shrink-0">
            <Display
              value={calc.display}
              expression={calc.expression}
              onHistoryToggle={() => setShowHistory(!showHistory)}
              showHistory={showHistory}
            />
          </div>

          {/* Scrollable content */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden mt-4 premium-scroll">
            {showHistory ? (
              <div className="h-full view-enter">
                <History
                  history={calc.history}
                  onClear={calc.clearHistory}
                  onDelete={calc.deleteHistoryItem}
                  onUse={(item) => {
                    calc.useHistoryResult(item)
                    setShowHistory(false)
                  }}
                />
              </div>
            ) : (
              <div className="view-enter">
                <Keypad
                  onDigit={calc.inputDigit}
                  onDecimal={calc.inputDecimal}
                  onOperator={calc.handleOperator}
                  onEquals={calc.calculate}
                  onClear={calc.clearAll}
                  onClearEntry={calc.clearEntry}
                  onBackspace={calc.backspace}
                  onToggleSign={calc.toggleSign}
                  onPercent={calc.inputPercent}
                  onScientific={calc.scientificOp}
                  isScientific={isScientific}
                  onToggleScientific={() => setIsScientific(!isScientific)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer accent */}
        <div className="flex justify-center mt-4">
          <div className="h-0.5 w-12 rounded-full" style={{ background: `linear-gradient(90deg, transparent, var(--accent-1), transparent)` }} />
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-2 mt-3 pb-4">
          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            <span>Built with</span>
            <svg className="w-3.5 h-3.5" style={{ color: 'var(--accent-1)' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <span>by Susmita</span>
          </div>
          <a
            href="https://github.com/Susmita0711"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium transition-all duration-200 cursor-pointer hover:opacity-80 active:scale-95"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Calculator />
    </ThemeProvider>
  )
}
