import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { monthlyStats } from '../../data/monthlyStats'
import { CustomTooltip } from '../ui/CustomTooltip'

const SERIES = [
  { key: 'revenue',  label: 'Revenue',  color: '#6366f1' },
  { key: 'expenses', label: 'Expenses', color: '#f43f5e' },
  { key: 'profit',   label: 'Profit',   color: '#10b981' },
]

const RANGES = ['3M', '6M', 'YTD', '1Y']

function getSlice(range) {
  switch (range) {
    case '3M': return monthlyStats.slice(-3)
    case '6M': return monthlyStats.slice(-6)
    case 'YTD': {
      const month = new Date().getMonth()
      return monthlyStats.slice(0, Math.max(month + 1, 1))
    }
    default: return monthlyStats
  }
}

export default function RevenueChart() {
  const [visible, setVisible] = useState({ revenue: true, expenses: true, profit: true })
  const [range, setRange] = useState('1Y')

  const data = getSlice(range)

  function toggleSeries(key) {
    setVisible(v => ({ ...v, [key]: !v[key] }))
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Revenue vs Expenses</h3>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            {SERIES.map(s => (
              <button
                key={s.key}
                onClick={() => toggleSeries(s.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border"
                style={visible[s.key]
                  ? { background: s.color + '15', borderColor: s.color, color: s.color }
                  : undefined
                }
                {...(!visible[s.key] ? {
                  className: 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 bg-transparent'
                } : {})}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: visible[s.key] ? s.color : '#9ca3af' }} />
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
            {RANGES.map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  range === r
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          {SERIES.map(s => (
            visible[s.key] && (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={2}
                dot={false}
                name={s.label}
              />
            )
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
