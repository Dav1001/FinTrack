import { formatCurrency } from '../../utils/formatters'

export function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl px-4 py-3 min-w-[160px]">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between gap-6 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-xs text-gray-500 dark:text-gray-400">{entry.name}</span>
          </div>
          <span className="text-xs font-semibold text-gray-900 dark:text-white">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

export function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const total = payload[0]?.payload?.total ?? 0
  const entry = payload[0]
  const pct = total > 0 ? ((entry.value / total) * 100).toFixed(1) : 0
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl px-4 py-3">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="w-2 h-2 rounded-full" style={{ background: entry.payload.color }} />
        <span className="text-xs font-semibold text-gray-900 dark:text-white">{entry.name}</span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{formatCurrency(entry.value)}</p>
      <p className="text-xs text-gray-400">{pct}% of total</p>
    </div>
  )
}
