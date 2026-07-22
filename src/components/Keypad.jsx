import { useState } from 'react'
import Button from './Button'

export default function Keypad({
  onDigit,
  onDecimal,
  onOperator,
  onEquals,
  onClear,
  onClearEntry,
  onBackspace,
  onToggleSign,
  onPercent,
  onScientific,
  isScientific,
  onToggleScientific,
}) {
  const [showMore, setShowMore] = useState(false)

  const handleButton = (label) => {
    switch (label) {
      case 'C': onClear(); break
      case 'CE': onClearEntry(); break
      case '⌫': onBackspace(); break
      case '±': onToggleSign(); break
      case '%': onPercent(); break
      case '.': onDecimal(); break
      case '=': onEquals(); break
      case 'SCI': onToggleScientific(); setShowMore(false); break
      case '+': case '−': case '×': case '÷': case 'x^y': case 'y√x':
        onOperator(label); break
      case 'x²': case 'x³': case '√x': case '∛x':
      case '1/x': case 'n!': case 'ln': case 'log':
      case 'sin': case 'cos': case 'tan':
      case 'eˣ': case '10ˣ': case 'π': case 'e':
        onScientific(label); break
      default:
        onDigit(parseInt(label, 10))
    }
  }

  return (
    <div>
      {/* Scientific panel */}
      <div className={`sci-panel ${isScientific ? 'open' : ''}`}>
        <div className="sci-panel-inner">
          <div className="pb-2.5 space-y-1.5">
            {/* Row 1 — always visible */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 sci-row-animate">
              <Button label="x²"  onClick={handleButton} variant="scientific" />
              <Button label="x³"  onClick={handleButton} variant="scientific" />
              <Button label="√x"  onClick={handleButton} variant="scientific" />
              <Button label="∛x"  onClick={handleButton} variant="scientific" />
            </div>
            {/* Row 2 — always visible */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 sci-row-animate">
              <Button label="1/x" onClick={handleButton} variant="scientific" />
              <Button label="n!"  onClick={handleButton} variant="scientific" />
              <Button label="x^y" onClick={handleButton} variant="scientific" />
              <Button label="y√x" onClick={handleButton} variant="scientific" />
            </div>

            {/* Expand arrow */}
            <button
              onClick={() => setShowMore(!showMore)}
              className="w-full flex items-center justify-center gap-1.5 py-1 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-indigo-500 hover:bg-indigo-50/50 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>{showMore ? 'Less' : 'More'}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Extra rows — hidden behind arrow */}
            <div className={`sci-extra-panel ${showMore ? 'open' : ''}`}>
              <div className="sci-panel-inner">
                <div className="space-y-1.5">
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2 sci-row-animate">
                    <Button label="sin" onClick={handleButton} variant="scientific" />
                    <Button label="cos" onClick={handleButton} variant="scientific" />
                    <Button label="tan" onClick={handleButton} variant="scientific" />
                    <Button label="ln"  onClick={handleButton} variant="scientific" />
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2 sci-row-animate">
                    <Button label="log"  onClick={handleButton} variant="scientific" />
                    <Button label="eˣ"  onClick={handleButton} variant="scientific" />
                    <Button label="10ˣ" onClick={handleButton} variant="scientific" />
                    <Button label="π"   onClick={handleButton} variant="scientific" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={`h-px mx-1 mb-2.5 bg-gradient-to-r from-transparent via-indigo-200/40 to-violet-200/40 transition-opacity duration-300 ${isScientific ? 'opacity-100' : 'opacity-0'}`} />

      {/* Standard keypad */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        <Button label="C"   onClick={handleButton} variant="danger" />
        <Button label="CE"  onClick={handleButton} variant="function" />
        <Button label="⌫"  onClick={handleButton} variant="function" />
        <Button label="÷"   onClick={handleButton} variant="operator" />

        <Button label="7" onClick={handleButton} />
        <Button label="8" onClick={handleButton} />
        <Button label="9" onClick={handleButton} />
        <Button label="×" onClick={handleButton} variant="operator" />

        <Button label="4" onClick={handleButton} />
        <Button label="5" onClick={handleButton} />
        <Button label="6" onClick={handleButton} />
        <Button label="−" onClick={handleButton} variant="operator" />

        <Button label="1" onClick={handleButton} />
        <Button label="2" onClick={handleButton} />
        <Button label="3" onClick={handleButton} />
        <Button label="+" onClick={handleButton} variant="operator" />

        <Button label="SCI" onClick={handleButton} variant={isScientific ? 'scientific-active' : 'scientific-toggle'} />
        <Button label="0"  onClick={handleButton} />
        <Button label="."  onClick={handleButton} />
        <Button label="="  onClick={handleButton} variant="equals" />
      </div>
    </div>
  )
}
