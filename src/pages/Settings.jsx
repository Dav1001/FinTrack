import { useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'

export default function Settings() {
  const [currency, setCurrency]     = useState('USD — US Dollar')
  const [timezone, setTimezone]     = useState('UTC+4 — Yerevan, Dubai')
  const [activeTheme, setActiveTheme] = useState('light')

  const themes = [
    { key: 'light',  icon: Sun,     label: 'Light'  },
    { key: 'dark',   icon: Moon,    label: 'Dark'   },
    { key: 'system', icon: Monitor, label: 'System' },
  ]

  return (
    <PageWrapper>
      <div className="max-w-2xl space-y-6">

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Profile</h3>
          <div className="space-y-3">
            {[
              { label: 'Full name',     placeholder: 'Davit H.',          type: 'text'  },
              { label: 'Email address', placeholder: 'davit@example.com', type: 'email' },
              { label: 'Company',       placeholder: 'FinTrack Inc.',      type: 'text'  },
            ].map(({ label, placeholder, type }) => (
              <div key={label}>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            ))}
            <button className="mt-2 px-4 py-2 text-sm font-medium bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">
              Save changes
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Notifications</h3>
          <div className="space-y-3">
            {['Weekly summary email', 'Large transaction alerts', 'Monthly report'].map(label => (
              <div key={label} className="flex items-center justify-between py-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-brand-600" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Appearance</h3>
          <div className="space-y-5">

            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Theme</label>
              <div className="flex gap-2">
                {themes.map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTheme(key)}
                    className={`flex-1 flex flex-col items-center gap-2 py-3 px-2 rounded-xl border text-xs font-medium transition-all
                      ${activeTheme === key
                        ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400'
                        : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Currency</label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-brand-500"
              >
                {['USD — US Dollar', 'EUR — Euro', 'GBP — British Pound', 'AMD — Armenian Dram', 'JPY — Japanese Yen'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Timezone</label>
              <select
                value={timezone}
                onChange={e => setTimezone(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-brand-500"
              >
                {[
                  'UTC+0 — London',
                  'UTC+1 — Paris, Berlin',
                  'UTC+2 — Cairo, Helsinki',
                  'UTC+3 — Moscow',
                  'UTC+4 — Yerevan, Dubai',
                  'UTC+5:30 — Mumbai',
                  'UTC+8 — Beijing, Singapore',
                  'UTC-5 — New York',
                  'UTC-8 — Los Angeles',
                ].map(tz => (
                  <option key={tz}>{tz}</option>
                ))}
              </select>
            </div>

            <button className="px-4 py-2 text-sm font-medium bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">
              Save appearance
            </button>

          </div>
        </div>

      </div>
    </PageWrapper>
  )
}
