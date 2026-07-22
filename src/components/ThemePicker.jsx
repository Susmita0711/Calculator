import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../context/ThemeContext'
import { themeList } from '../themes'

export default function ThemePicker() {
  const { themeId, setThemeId } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const btnRef = useRef(null)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (isOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setPos({
        top: rect.bottom + 8,
        left: Math.min(rect.left, window.innerWidth - 280),
      })
    }
  }, [isOpen])

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 cursor-pointer group active:scale-90"
        aria-label="Change theme"
      >
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: `linear-gradient(135deg, var(--accent-1), var(--accent-2))`, opacity: 0 }} />
        <svg className="w-5 h-5 transition-colors relative z-10" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      </button>

      {isOpen && createPortal(
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
          <div
            className="fixed z-[9999] p-3 rounded-2xl backdrop-blur-xl border shadow-[0_20px_60px_-12px_rgba(0,0,0,0.18)] view-enter"
            style={{
              top: pos.top,
              left: pos.left,
              width: '272px',
              background: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
            }}
          >
            <div className="text-xs font-bold tracking-widest uppercase mb-3 px-1" style={{ color: 'var(--text-muted)' }}>Choose Theme</div>
            <div className="grid grid-cols-4 gap-2">
              {themeList.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setThemeId(t.id); setIsOpen(false) }}
                  className={`group flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-90 ${
                    themeId === t.id ? 'ring-2 shadow-sm' : 'hover:opacity-90'
                  }`}
                  style={{
                    background: themeId === t.id ? 'var(--btn-fn-bg)' : 'transparent',
                    ringColor: themeId === t.id ? 'var(--accent-1)' : undefined,
                    ...(themeId === t.id ? { boxShadow: `0 0 0 2px var(--accent-1)` } : {}),
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl shadow-inner border border-black/5 transition-transform duration-200 group-hover:scale-110"
                    style={{ background: t.preview }}
                  />
                  <span className="text-[10px] font-semibold leading-tight text-center" style={{ color: themeId === t.id ? 'var(--accent-1)' : 'var(--text-muted)' }}>
                    {t.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  )
}
