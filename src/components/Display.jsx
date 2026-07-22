import ThemePicker from './ThemePicker'

export default function Display({ value, expression, onHistoryToggle, showHistory }) {
  const displaySize =
    value.length > 12 ? 'text-2xl sm:text-3xl' :
    value.length > 8 ? 'text-3xl sm:text-4xl' :
    'text-4xl sm:text-5xl lg:text-6xl'

  return (
    <div className="display-panel p-5 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br pointer-events-none rounded-[1.1rem]" style={{ background: `linear-gradient(135deg, var(--accent-1), var(--accent-2))`, opacity: 0.03 }} />

      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs sm:text-sm font-mono h-5 truncate flex-1 mr-2 tracking-wide" style={{ color: 'var(--text-muted)' }}>
            {expression || '\u00A0'}
          </div>
          <div className="flex items-center gap-0.5">
            <ThemePicker />
            <button
              onClick={onHistoryToggle}
              className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 cursor-pointer group active:scale-90"
              aria-label={showHistory ? 'Back to calculator' : 'View history'}
            >
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: `linear-gradient(135deg, var(--accent-1), var(--accent-2))`, opacity: 0 }} />
              {showHistory ? (
                <svg className="w-5 h-5 transition-colors relative z-10" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              ) : (
                <svg className="w-5 h-5 transition-colors relative z-10" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M12 2a10 10 0 100 20 10 10 0 000-20z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`text-right font-mono font-bold ${displaySize} leading-tight truncate select-all shimmer-text shimmer-active`}
          aria-live="polite"
        >
          {value}
        </div>
      </div>
    </div>
  )
}
