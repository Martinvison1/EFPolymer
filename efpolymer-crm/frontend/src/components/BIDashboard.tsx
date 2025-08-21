import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import { ExcelData } from './ExcelUploader'

interface BIDashboardProps {
  data: ExcelData
  onExport: () => void
}

const REGION_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16']

export function BIDashboard({ data, onExport }: BIDashboardProps) {
  // Process data for various visualizations
  const pipelineData = Object.entries(
    data.opportunities.reduce((acc, opp) => {
      const stage = opp.stage || 'unknown'
      if (!acc[stage]) {
        acc[stage] = { stage: stage.replace('_', ' '), count: 0, revenue: 0, kg: 0 }
      }
      acc[stage].count += 1
      acc[stage].revenue += opp.amount || 0
      acc[stage].kg += opp.kgProduct || 0
      return acc
    }, {} as Record<string, any>)
  ).map(([_, value]) => value)

  const timelineData = data.opportunities
    .filter(opp => opp.expectedClose)
    .reduce((acc, opp) => {
      const month = new Date(opp.expectedClose).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      if (!acc[month]) {
        acc[month] = { month, opportunities: 0, revenue: 0, kg: 0 }
      }
      acc[month].opportunities += 1
      acc[month].revenue += opp.amount || 0
      acc[month].kg += opp.kgProduct || 0
      return acc
    }, {} as Record<string, any>)

  const sortedTimelineData = Object.values(timelineData).sort((a: any, b: any) => {
    return new Date(a.month).getTime() - new Date(b.month).getTime()
  })

  const regionData = Object.entries(
    data.opportunities.reduce((acc, opp) => {
      const region = opp.region || 'Unknown'
      if (!acc[region]) {
        acc[region] = { region, count: 0, revenue: 0, kg: 0 }
      }
      acc[region].count += 1
      acc[region].revenue += opp.amount || 0  
      acc[region].kg += opp.kgProduct || 0
      return acc
    }, {} as Record<string, any>)
  ).map(([_, value]) => value)

  const topOpportunities = [...data.opportunities]
    .sort((a, b) => (b.amount || 0) - (a.amount || 0))
    .slice(0, 10)

  return (
    <div id="bi-dashboard" className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center bg-white rounded-lg shadow-sm p-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pipeline BI Dashboard</h1>
          <p className="text-gray-600 mt-1">Interactive visualization of your sales pipeline</p>
        </div>
        <button
          onClick={onExport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Export Snapshot
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Opportunities</p>
              <p className="text-2xl font-bold text-gray-900">{data.summary.count}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">€{(data.summary.totalRevenue / 1000).toFixed(1)}K</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Product (Kg)</p>
              <p className="text-2xl font-bold text-gray-900">{(data.summary.totalKg / 1000).toFixed(1)}K</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-100">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
              <p className="text-2xl font-bold text-gray-900">€{Math.round(data.summary.totalRevenue / data.summary.count / 1000)}K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Pipeline Stage Analysis */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pipeline by Stage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" angle={-45} textAnchor="end" height={80} fontSize={12} />
              <YAxis />
              <Tooltip formatter={(value: any, name: string) => [
                name === 'revenue' ? `€${(value / 1000).toFixed(1)}K` : 
                name === 'kg' ? `${(value / 1000).toFixed(1)}K kg` : value,
                name === 'revenue' ? 'Revenue' : name === 'kg' ? 'Product (Kg)' : 'Count'
              ]} />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" name="Count" />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Timeline Forecast */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue Timeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={sortedTimelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`€${(value / 1000).toFixed(1)}K`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="#93c5fd" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Regional Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue by Region</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={regionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ region, percent }: any) => `${region} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="revenue"
              >
                {regionData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={REGION_COLORS[index % REGION_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => `€${(value / 1000).toFixed(1)}K`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Product Volume by Month */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Product Volume Timeline</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sortedTimelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: any) => `${(value / 1000).toFixed(1)}K kg`} />
              <Line type="monotone" dataKey="kg" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Opportunities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Opportunities</h2>
          <div className="space-y-3 max-h-250 overflow-y-auto">
            {topOpportunities.map((opp) => (
              <div key={opp.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 truncate">{opp.name}</p>
                  <p className="text-xs text-gray-500">{opp.stage?.replace('_', ' ')} • {opp.region}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-gray-900">€{(opp.amount / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-gray-500">{opp.kgProduct}kg</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}