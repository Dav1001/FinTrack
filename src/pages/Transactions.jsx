import { useState, useEffect, useRef } from 'react'
import { transactions } from '../data/transactions'
import { categories } from '../data/categories'
import { formatCurrency, formatDate } from '../utils/formatters'
import { ArrowUpRight, ArrowDownRight, Search, X, ChevronDown, Tag, Filter, SearchX } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'

const categoryColors = {
  Revenue:    'bg-emerald-50  text-emerald-700  dark:bg-emerald-900/20  dark:text-emerald-400',
  Cloud:      'bg-sky-50      text-sky-700      dark:bg-sky-900/20      dark:text-sky-400',
  Software:   'bg-violet-50   text-violet-700   dark:bg-violet-900/20   dark:text-violet-400',
  Marketing:  'bg-purple-50   text-purple-700   dark:bg-purple-900/20   dark:text-purple-400',
  Payroll:    'bg-amber-50    text-amber-700    dark:bg-amber-900/20    dark:text-amber-400',
  Operations: 'bg-rose-50     text-rose-700     dark:bg-rose-900/20     dark:text-rose-400',
}

function FilterDropdown({ value, onChange, options, icon: Icon }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 transition-colors text-gray-700 dark:text-gray-300 font-medium min-w-[130px] justify-between"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-3.5 h-3.5 text-gray-400" />}
          <span>{value}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full mt-1.5 left-0 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl py-1 min-w-full overflow-hidden">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                value === opt
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function SortHeader({ label, field, sortField, sortDir, onSort, align = 'left' }) {
  const isActive = sortField === field
  return (
    <th
      onClick={() => onSort(field)}
      className={`px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer select-none hover:text-gray-900 dark:hover:text-white transition-colors group text-${align}`}
    >
      <div className={`flex items-center gap-1.5 ${align === 'right' ? 'justify-end' : ''}`}>
        {label}
        <span className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}>
          {isActive && sortDir === 'asc' ? '↑' : '↓'}
        </span>
      </div>
    </th>
  )
}

const TYPE_OPTIONS = ['All types', 'Income', 'Expense']

export default function Transactions() {
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('All')
  const [type, setType]           = useState('All types')
  const [sortField, setSortField] = useState('date')
  const [sortDir, setSortDir]     = useState('desc')

  function handleSort(field) {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  const typeFilter = type === 'Income' ? 'income' : type === 'Expense' ? 'expense' : 'all'

  const filtered = transactions
    .filter(tx => category === 'All' || tx.category === category)
    .filter(tx => typeFilter === 'all' || tx.type === typeFilter)
    .filter(tx => tx.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let cmp = 0
      if (sortField === 'date')        cmp = new Date(a.date) - new Date(b.date)
      if (sortField === 'description') cmp = a.description.localeCompare(b.description)
      if (sortField === 'category')    cmp = a.category.localeCompare(b.category)
      if (sortField === 'amount')      cmp = a.amount - b.amount
      return sortDir === 'asc' ? cmp : -cmp
    })

  const totalIn  = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalOut = Math.abs(filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0))

  return (
    <PageWrapper>
      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Transactions</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {transactions.length} total transactions
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Showing {filtered.length} of {transactions.length}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all placeholder:text-gray-400 text-gray-900 dark:text-white"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <FilterDropdown
            value={category}
            onChange={setCategory}
            options={categories}
            icon={Tag}
          />
          <FilterDropdown
            value={type}
            onChange={setType}
            options={TYPE_OPTIONS}
            icon={Filter}
          />
        </div>

        {(category !== 'All' || type !== 'All types') && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">Active filters:</span>
            {category !== 'All' && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400 border border-brand-200 dark:border-brand-800">
                {category}
                <button onClick={() => setCategory('All')} className="ml-0.5 hover:opacity-70">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {type !== 'All types' && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                {type === 'Income' ? 'Income only' : 'Expenses only'}
                <button onClick={() => setType('All types')} className="ml-0.5 hover:opacity-70">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <SortHeader label="Description" field="description" sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  <SortHeader label="Category"    field="category"    sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  <SortHeader label="Date"        field="date"        sortField={sortField} sortDir={sortDir} onSort={handleSort} />
                  <SortHeader label="Amount"      field="amount"      sortField={sortField} sortDir={sortDir} onSort={handleSort} align="right" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(tx => (
                  <tr key={tx.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg ${tx.type === 'income' ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                          {tx.type === 'income'
                            ? <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                            : <ArrowDownRight className="w-3 h-3 text-red-500" />
                          }
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{tx.description}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[tx.category] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'}`}>
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">{formatDate(tx.date)}</td>
                    <td className={`px-5 py-3.5 text-right font-semibold ${tx.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {tx.type === 'income' ? '+' : ''}{formatCurrency(tx.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                <SearchX className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">No transactions found</p>
              <p className="text-xs text-gray-400">Try adjusting your search or filters</p>
              <button
                onClick={() => { setSearch(''); setCategory('All'); setType('All types') }}
                className="mt-4 text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-xs text-gray-400">{filtered.length} transactions</span>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400">
                  Total in: <span className="text-emerald-600 font-medium">{formatCurrency(totalIn)}</span>
                </span>
                <span className="text-xs text-gray-400">
                  Total out: <span className="text-red-500 font-medium">{formatCurrency(totalOut)}</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
