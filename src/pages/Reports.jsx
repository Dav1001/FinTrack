import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { monthlyStats } from '../data/monthlyStats'
import { formatCurrency } from '../utils/formatters'
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'
import { CustomTooltip } from '../components/ui/CustomTooltip'

export default function Reports() {
  const totalRevenue  = monthlyStats.reduce((s, m) => s + m.revenue,  0)
  const totalExpenses = monthlyStats.reduce((s, m) => s + m.expenses, 0)
  const totalProfit   = monthlyStats.reduce((s, m) => s + m.profit,   0)

  const bestMonth    = monthlyStats.reduce((a, b) => b.revenue  > a.revenue  ? b : a)
  const worstMonth   = monthlyStats.reduce((a, b) => b.expenses > a.expenses ? b : a)
  const avgProfit    = Math.round(totalProfit / monthlyStats.length)

  const insights = [
    {
      icon: TrendingUp,
      label: 'Best revenue month',
      value: formatCurrency(bestMonth.revenue),
      sub: bestMonth.month + ' 2024',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: TrendingDown,
      label: 'Highest expense month',
      value: formatCurrency(worstMonth.expenses),
      sub: worstMonth.month + ' 2024',
      color: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-900/20',
      iconColor: 'text-rose-500 dark:text-rose-400',
    },
    {
      icon: BarChart3,
      label: 'Average monthly profit',
      value: formatCurrency(avgProfit),
      sub: 'Across all 12 months',
      color: 'text-brand-600',
      bg: 'bg-brand-50 dark:bg-brand-900/20',
      iconColor: 'text-brand-600 dark:text-brand-400',
    },
  ]

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Annual revenue',  value: totalRevenue,  color: 'text-brand-600'  },
            { label: 'Annual expenses', value: totalExpenses, color: 'text-red-500'     },
            { label: 'Annual profit',   value: totalProfit,   color: 'text-emerald-600' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
              <p className={`text-2xl font-semibold ${color}`}>{formatCurrency(value)}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Monthly profit breakdown</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={monthlyStats} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue"  fill="#6366f1" radius={[4,4,0,0]} name="Revenue"  />
              <Bar dataKey="expenses" fill="#f43f5e" radius={[4,4,0,0]} name="Expenses" />
              <Bar dataKey="profit"   fill="#10b981" radius={[4,4,0,0]} name="Profit"   />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Top insights</h3>
          <div className="grid grid-cols-3 gap-4">
            {insights.map(({ icon: Icon, label, value, sub, color, bg, iconColor }) => (
              <div key={label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
                  <div className={`p-2 rounded-lg ${bg}`}>
                    <Icon className={`w-4 h-4 ${iconColor}`} />
                  </div>
                </div>
                <p className={`text-xl font-semibold ${color} mb-1`}>{value}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
