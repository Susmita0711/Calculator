<div align="center">

# Calculator Pro

A premium, feature-rich calculator built with React & Tailwind CSS

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## Features

### Core Calculator
- Basic operations: addition, subtraction, multiplication, division
- Percentage, sign toggle, backspace, clear all / clear entry
- Full keyboard support (0-9, operators, Enter, Backspace, Escape)

### Scientific Mode
- Toggle with the **SCI** button — shows 2 rows, expand arrow for 2 more
- Square, cube, square root, cube root
- Power (x^y), nth root (y√x)
- Trigonometry: sin, cos, tan
- Logarithms: ln, log
- Exponentials: e^x, 10^x
- Factorial, reciprocal, constants (π, e)

### History
- Tap the clock icon to view full calculation history
- Click any past result to load it back into the calculator
- Delete individual entries or clear all
- Persisted in `localStorage` (survives page refresh)

### 8 Beautiful Themes

| Theme | Style |
|-------|-------|
| Lavender | Soft purples (default) |
| Ocean | Blues & teals |
| Sunset | Warm oranges & reds |
| Emerald | Rich greens |
| Rose | Pinks & roses |
| Midnight | Dark blues & purples |
| Cyberpunk | Neon pink/cyan on dark |
| AMOLED Black | Pure black, minimal gray |

Tap the palette icon in the display to switch themes. Selection is saved to `localStorage`.

### Premium Design
- Glassmorphism card with animated spinning gradient border
- Floating animated background orbs
- 3D raised buttons with ripple click effect
- Shimmer gradient on the result display
- Staggered entrance animations
- Smooth accordion transitions for scientific panel
- Fully responsive (mobile + desktop)

---

## Getting Started

### Prerequisites
- Node.js 18+

### Installation

```bash
git clone https://github.com/Susmita0711/calculator.git
cd calculator
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0` - `9` | Input digit |
| `.` | Decimal point |
| `+` `-` `*` `/` | Operators |
| `Enter` / `=` | Calculate result |
| `Backspace` | Delete last digit |
| `Escape` | Clear all |
| `Delete` | Clear entry |
| `%` | Convert to percentage |

---

## Author

**Susmita Hazra** 
