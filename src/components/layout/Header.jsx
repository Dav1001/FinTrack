import { useLocation } from 'react-router-dom'
import { Bell, Sun, Moon } from 'lucide-react'

const pageMeta = {
  '/dashboard':    { title: 'Dashboard',    subtitle: 'Financial overview — FY 2024' },
  '/transactions': { title: 'Transactions', subtitle: 'All income and expenses'       },
  '/reports':      { title: 'Reports',      subtitle: 'Annual performance summary'    },
  '/settings':     { title: 'Settings',     subtitle: 'Account and preferences'       },
}

export default function Header({ theme, toggleTheme }) {
  const { pathname } = useLocation()
  const { title, subtitle } = pageMeta[pathname] || { title: 'FinTrack', subtitle: '' }

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
      <div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-500 rounded-full"></span>
        </button>
      </div>
    </header>
  )
}
