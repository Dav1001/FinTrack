import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, BarChart3, Settings, TrendingUp } from 'lucide-react'

const nav = [
  { to: '/dashboard',    icon: LayoutDashboard,  label: 'Dashboard'     },
  { to: '/transactions', icon: ArrowLeftRight,   label: 'Transactions'  },
  { to: '/reports',      icon: BarChart3,         label: 'Reports'       },
  { to: '/settings',     icon: Settings,          label: 'Settings'      },
]

export default function Sidebar() {
  return (
    <aside className="w-64 hidden md:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
        <TrendingUp className="w-6 h-6 text-brand-600 mr-2" />
        <span className="font-semibold text-lg text-gray-900 dark:text-white">FinTrack</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${isActive
                ? 'bg-brand-50 dark:bg-brand-700/20 dark:text-brand-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-semibold">DH</div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Davit H.</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
