import { transactions } from '../../data/transactions'
import { formatCurrency, formatDate } from '../../utils/formatters'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function RecentTransactions() {
  const recent = transactions.slice(-5).reverse()

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Recent transactions</h3>
      <div className="space-y-3">
        {recent.map(tx => (
          <div key={tx.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-lg ${tx.type === 'income' ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                {tx.type === 'income'
                  ? <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                  : <ArrowDownRight className="w-3 h-3 text-red-500" />
                }
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{tx.description}</p>
                <p className="text-xs text-gray-400">{formatDate(tx.date)}</p>
              </div>
            </div>
            <span className={`text-sm font-semibold ${tx.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`}>
              {tx.type === 'income' ? '+' : ''}{formatCurrency(tx.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
