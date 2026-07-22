import { useState, useCallback, useEffect } from 'react'

const HISTORY_KEY = 'calculator_history'

function loadHistory() {
  try {
    const stored = localStorage.getItem(HISTORY_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function evaluate(a, op, b) {
  const x = parseFloat(a)
  const y = parseFloat(b)
  if (isNaN(x) || isNaN(y)) return 'Error'
  switch (op) {
    case '+': return x + y
    case '−': return x - y
    case '×': return x * y
    case '÷': return y === 0 ? 'Error' : x / y
    case '%': return y === 0 ? 'Error' : x % y
    case 'x^y': return Math.pow(x, y)
    case 'y√x': return y === 0 ? 'Error' : Math.pow(x, 1 / y)
    default: return y
  }
}

function formatNumber(num) {
  if (typeof num === 'string') return num
  if (!isFinite(num)) return 'Error'
  const str = String(num)
  if (str.length > 14) {
    const val = parseFloat(num.toPrecision(10))
    return String(val)
  }
  return str
}

export function useCalculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState(loadHistory)
  const [expression, setExpression] = useState('')

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  }, [history])

  const addToHistory = useCallback((expr, result) => {
    const entry = {
      id: Date.now(),
      expression: expr,
      result,
      timestamp: new Date().toLocaleString(),
    }
    setHistory(prev => [entry, ...prev].slice(0, 50))
  }, [])

  const inputDigit = useCallback((digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }, [display, waitingForOperand])

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
      return
    }
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }, [display, waitingForOperand])

  const toggleSign = useCallback(() => {
    if (display !== '0' && display !== 'Error') {
      setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display)
    }
  }, [display])

  const inputPercent = useCallback(() => {
    const value = parseFloat(display)
    if (!isNaN(value)) {
      setDisplay(formatNumber(value / 100))
    }
  }, [display])

  const handleOperator = useCallback((nextOp) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
      setExpression(`${formatNumber(inputValue)} ${nextOp}`)
    } else if (operation && !waitingForOperand) {
      const result = evaluate(previousValue, operation, inputValue)
      setPreviousValue(typeof result === 'string' ? null : result)
      setDisplay(formatNumber(result))
      setExpression(`${formatNumber(result)} ${nextOp}`)
    } else {
      setExpression(`${formatNumber(previousValue)} ${nextOp}`)
    }

    setOperation(nextOp)
    setWaitingForOperand(true)
  }, [display, previousValue, operation, waitingForOperand])

  const calculate = useCallback(() => {
    if (operation === null || previousValue === null) return

    const inputValue = parseFloat(display)
    const result = evaluate(previousValue, operation, inputValue)
    const resultStr = formatNumber(result)
    const expr = `${formatNumber(previousValue)} ${operation} ${formatNumber(inputValue)}`

    addToHistory(expr, resultStr)
    setDisplay(resultStr)
    setExpression('')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(true)
  }, [display, previousValue, operation, addToHistory])

  const clearAll = useCallback(() => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
    setExpression('')
  }, [])

  const clearEntry = useCallback(() => {
    setDisplay('0')
    setWaitingForOperand(false)
  }, [])

  const backspace = useCallback(() => {
    if (waitingForOperand) return
    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0')
    } else {
      setDisplay(display.slice(0, -1))
    }
  }, [display, waitingForOperand])

  // Scientific functions
  const scientificOp = useCallback((func) => {
    const value = parseFloat(display)
    if (isNaN(value)) return

    let result
    let label
    switch (func) {
      case 'x²':  result = value * value;       label = `sqr(${formatNumber(value)})`; break
      case 'x³':  result = value * value * value; label = `cube(${formatNumber(value)})`; break
      case '√x':  result = value < 0 ? 'Error' : Math.sqrt(value); label = `√(${formatNumber(value)})`; break
      case '∛x':  result = Math.cbrt(value);    label = `∛(${formatNumber(value)})`; break
      case '1/x': result = value === 0 ? 'Error' : 1 / value; label = `1/(${formatNumber(value)})`; break
      case 'n!':  {
        if (value < 0 || value !== Math.floor(value) || value > 170) {
          result = 'Error'
        } else {
          let f = 1
          for (let i = 2; i <= value; i++) f *= i
          result = f
        }
        label = `${formatNumber(value)}!`
        break
      }
      case 'ln':  result = value <= 0 ? 'Error' : Math.log(value);    label = `ln(${formatNumber(value)})`; break
      case 'log': result = value <= 0 ? 'Error' : Math.log10(value);  label = `log(${formatNumber(value)})`; break
      case 'sin': result = Math.sin(value * Math.PI / 180);  label = `sin(${formatNumber(value)}°)`; break
      case 'cos': result = Math.cos(value * Math.PI / 180);  label = `cos(${formatNumber(value)}°)`; break
      case 'tan': result = Math.abs(value % 180) === 90 ? 'Error' : Math.tan(value * Math.PI / 180); label = `tan(${formatNumber(value)}°)`; break
      case 'eˣ':  result = Math.exp(value);                  label = `e^(${formatNumber(value)})`; break
      case '10ˣ': result = Math.pow(10, value);              label = `10^(${formatNumber(value)})`; break
      case 'π':   result = Math.PI;  setDisplay(formatNumber(Math.PI)); setWaitingForOperand(true); return
      case 'e':   result = Math.E;   setDisplay(formatNumber(Math.E));  setWaitingForOperand(true); return
      default: return
    }

    const resultStr = formatNumber(result)
    addToHistory(label, resultStr)
    setDisplay(resultStr)
    setExpression(label)
    setWaitingForOperand(true)
  }, [display, addToHistory])

  const clearHistory = useCallback(() => {
    setHistory([])
    localStorage.removeItem(HISTORY_KEY)
  }, [])

  const deleteHistoryItem = useCallback((id) => {
    setHistory(prev => prev.filter(item => item.id !== id))
  }, [])

  const useHistoryResult = useCallback((item) => {
    setDisplay(item.result)
    setWaitingForOperand(false)
  }, [])

  return {
    display,
    expression,
    history,
    inputDigit,
    inputDecimal,
    toggleSign,
    inputPercent,
    handleOperator,
    calculate,
    clearAll,
    clearEntry,
    backspace,
    scientificOp,
    clearHistory,
    deleteHistoryItem,
    useHistoryResult,
  }
}
