import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency, formatPercent } from '../../utils/formatters'

function Sparkline({ data, color }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 80, h = 28
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function KPICard({ title, value, change, icon: Icon, color = 'brand', sparkData, sparkColor }) {
  const isPositive = change >= 0

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
        <div className={`p-2 rounded-lg bg-${color}-50 dark:bg-${color}-900/20`}>
          <Icon className={`w-4 h-4 text-${color}-600 dark:text-${color}-400`} />
        </div>
      </div>
      <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
        {formatCurrency(value)}
      </p>
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-1">
          {isPositive
            ? <TrendingUp className="w-3 h-3 text-emerald-500" />
            : <TrendingDown className="w-3 h-3 text-red-500" />
          }
          <span className={`text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
            {formatPercent(change)}
          </span>
          <span className="text-xs text-gray-400">vs last month</span>
        </div>
        {sparkData && <Sparkline data={sparkData} color={sparkColor} />}
      </div>
    </div>
  )
}
