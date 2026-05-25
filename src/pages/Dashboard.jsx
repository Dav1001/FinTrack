import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import KPICard from '../components/dashboard/KPICard'
import RevenueChart from '../components/dashboard/RevenueChart'
import SpendingDonut from '../components/dashboard/SpendingDonut'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import PageWrapper from '../components/ui/PageWrapper'
import { monthlyStats } from '../data/monthlyStats'

const last7 = monthlyStats.slice(-7)

export default function Dashboard() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Financial overview — FY 2024</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Live data</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <KPICard
            title="Total revenue"  value={365200} change={12.5}  icon={DollarSign}   color="brand"
            sparkData={last7.map(m => m.revenue)}  sparkColor="#6366f1"
          />
          <KPICard
            title="Net profit"     value={274800} change={8.2}   icon={TrendingUp}   color="emerald"
            sparkData={last7.map(m => m.profit)}   sparkColor="#10b981"
          />
          <KPICard
            title="Total expenses" value={90400}  change={-3.1}  icon={TrendingDown} color="rose"
            sparkData={last7.map(m => m.expenses)} sparkColor="#f43f5e"
          />
          <KPICard
            title="Cash balance"   value={128500} change={5.7}   icon={Wallet}       color="violet"
            sparkData={last7.map(m => m.profit)}   sparkColor="#8b5cf6"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>
          <SpendingDonut />
        </div>

        <RecentTransactions />
      </div>
    </PageWrapper>
  )
}
