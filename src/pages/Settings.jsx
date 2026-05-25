import PageWrapper from '../components/ui/PageWrapper'

export default function Settings() {
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
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-brand-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
