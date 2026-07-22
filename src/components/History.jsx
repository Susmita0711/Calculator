export default function History({ history, onClear, onDelete, onUse }) {
  return (
    <div className="history-panel p-3 sm:p-4 flex flex-col h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, var(--accent-1), transparent 70%)`, opacity: 0.04 }} />

      <div className="flex items-center justify-between mb-3 shrink-0 relative">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: `linear-gradient(135deg, var(--accent-1), var(--accent-2))` }} />
          <h3 className="text-sm font-bold tracking-wide" style={{ color: 'var(--text-primary)' }}>History</h3>
          {history.length > 0 && (
            <span className="badge-pop text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm" style={{ background: `linear-gradient(135deg, var(--accent-1), var(--accent-2))` }}>
              {history.length}
            </span>
          )}
        </div>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-semibold transition-all duration-200 cursor-pointer px-2 py-1 rounded-lg"
            style={{ color: '#f87171' }}
            onMouseEnter={e => e.target.style.backgroundColor = 'rgba(239,68,68,0.08)'}
            onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
          >
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex-1 flex items-center justify-center relative">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner" style={{ background: `linear-gradient(135deg, var(--btn-fn-bg), var(--display-bg-2))` }}>
              <svg className="w-8 h-8" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>No calculations yet</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>Your history will appear here</p>
          </div>
        </div>
      ) : (
        <div className="space-y-1.5 overflow-y-auto flex-1 pr-1 premium-scroll">
          {history.map((item, i) => (
            <div
              key={item.id}
              className="history-item group flex items-center justify-between rounded-xl px-3 py-3 transition-all duration-200 cursor-pointer"
              style={{ animationDelay: `${i * 40}ms`, background: 'var(--history-item-bg)', border: '1px solid var(--history-item-border)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--history-item-hover-border)'; e.currentTarget.style.boxShadow = '0 4px 12px -4px var(--history-item-hover-shadow)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--history-item-border)'; e.currentTarget.style.boxShadow = 'none' }}
              onClick={() => onUse(item)}
            >
              <div className="flex-1 min-w-0 mr-2">
                <div className="text-[11px] font-mono truncate tracking-wide" style={{ color: 'var(--text-muted)' }}>{item.expression}</div>
                <div className="text-base font-mono font-bold" style={{ color: 'var(--text-primary)' }}>= {item.result}</div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(item.id) }}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg transition-all duration-200 cursor-pointer active:scale-90"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.backgroundColor = 'transparent' }}
                aria-label="Delete"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
