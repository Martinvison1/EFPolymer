import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import html2canvas from 'html2canvas'
import { ExcelUploader, ExcelData } from '../components/ExcelUploader'
import { BIDashboard } from '../components/BIDashboard'
import { ChartBarIcon } from '@heroicons/react/24/outline'

export function DashboardPage() {
  useTranslation() // Hook must be called even if not used
  const [excelData, setExcelData] = useState<ExcelData | null>(null)
  const [error, setError] = useState<string>('')

  const handleDataLoaded = (data: ExcelData) => {
    setExcelData(data)
    setError('')
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
    setExcelData(null)
  }

  const handleExportSnapshot = async () => {
    const dashboardElement = document.getElementById('bi-dashboard')
    if (dashboardElement) {
      try {
        const canvas = await html2canvas(dashboardElement, {
          scale: 1,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#f9fafb'
        })
        
        // Create download link
        const link = document.createElement('a')
        link.download = `dashboard-snapshot-${new Date().toISOString().split('T')[0]}.png`
        link.href = canvas.toDataURL()
        link.click()
      } catch (error) {
        console.error('Export failed:', error)
        alert('Export failed. Please try again.')
      }
    }
  }

  // If no data loaded, show upload interface
  if (!excelData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <ChartBarIcon className="mx-auto h-12 w-12 text-blue-600" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900">Pipeline BI Dashboard</h1>
            <p className="mt-2 text-lg text-gray-600">
              Transform your Excel data into powerful visualizations
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="max-w-2xl mx-auto">
              <ExcelUploader 
                onDataLoaded={handleDataLoaded}
                onError={handleError}
              />
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="mt-8 border-t pt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Interactive Timeline</p>
                      <p className="text-sm text-gray-500">Visualize opportunity progression over time</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Revenue Analytics</p>
                      <p className="text-sm text-gray-500">Track revenue by stage, region, and time</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Product Metrics</p>
                      <p className="text-sm text-gray-500">Monitor kg quantities and distribution</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Export Snapshots</p>
                      <p className="text-sm text-gray-500">Save dashboard images for reports</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show BI Dashboard with data
  return <BIDashboard data={excelData} onExport={handleExportSnapshot} />
}