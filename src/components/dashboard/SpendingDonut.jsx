import { PieChart, Pie, Cell, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts'
import { spendingByCategory } from '../../data/categories'
import { DonutTooltip } from '../ui/CustomTooltip'

const total = spendingByCategory.reduce((s, c) => s + c.value, 0)
const dataWithTotal = spendingByCategory.map(c => ({ ...c, total }))

function CentreLabel({ viewBox }) {
  const { cx, cy } = viewBox
  return (
    <g>
      <text x={cx} y={cy - 6} textAnchor="middle" fill="currentColor"
            style={{ fontSize: 18, fontWeight: 600 }} className="fill-gray-900 dark:fill-white">
        ${(total / 1000).toFixed(1)}k
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle"
            style={{ fontSize: 11, fill: '#9ca3af' }}>
        total spend
      </text>
    </g>
  )
}

export default function SpendingDonut() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Spending by category</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={dataWithTotal}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {spendingByCategory.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
            <Label content={<CentreLabel />} position="center" />
          </Pie>
          <Tooltip content={<DonutTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
