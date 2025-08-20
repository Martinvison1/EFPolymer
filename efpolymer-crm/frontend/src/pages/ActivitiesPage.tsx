import { useTranslation } from 'react-i18next'

export function ActivitiesPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('nav.activities')}</h1>
          <p className="text-gray-600">Manage activities in your CRM</p>
        </div>
        
        <button className="btn btn-primary btn-md">
          {t('common.add')} Activities
        </button>
      </div>
      
      <div className="card">
        <div className="card-content">
          <p className="text-gray-500 text-center py-8">{t('common.noData')}</p>
          <p className="text-gray-400 text-center text-sm">
            Activities functionality will be implemented here
          </p>
        </div>
      </div>
    </div>
  )
}
