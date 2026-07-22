import { useRef, useCallback } from 'react'
import { memo } from 'react'

const baseStyles =
  'btn-3d ripple-container relative rounded-2xl font-semibold text-lg sm:text-xl h-14 sm:h-16 transition-all duration-200 select-none cursor-pointer flex items-center justify-center'

const variantStyles = {
  number: 'btn-num',
  operator: 'btn-op operator-glow',
  function: 'btn-fn',
  equals: 'btn-eq',
  danger: 'btn-danger',
  scientific: 'btn-sci text-sm sm:text-[13px] h-10 sm:h-11 font-bold tracking-wide',
  'scientific-toggle': 'btn-sci-toggle text-xs sm:text-[11px] tracking-widest font-extrabold uppercase',
  'scientific-active': 'btn-sci-active text-xs sm:text-[11px] tracking-widest font-extrabold uppercase',
}

const Button = memo(function Button({ label, onClick, variant = 'number', span = 1, className = '' }) {
  const btnRef = useRef(null)

  const handleClick = useCallback((e) => {
    const btn = btnRef.current
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = document.createElement('span')
    ripple.className = 'ripple'
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)

    onClick(label)
  }, [onClick, label])

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={`btn-3d ripple-container relative rounded-2xl font-semibold text-lg sm:text-xl h-14 sm:h-16 transition-all duration-200 select-none cursor-pointer flex items-center justify-center ${variantStyles[variant]} ${span === 2 ? 'col-span-2' : ''} ${className}`}
      aria-label={label}
    >
      {label}
    </button>
  )
})

export default Button
