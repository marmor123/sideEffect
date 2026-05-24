import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../stores/useAppStore'

export default function RiskLadder() {
  const { t } = useTranslation()
  const { medications } = useAppStore()

  if (medications.length === 0) {
    return null
  }

  // Sample risk data - will be replaced with actual calculations
  const risks = [
    { label: t('riskLadder.yourRisk'), value: 2, color: 'bg-red-500' },
    { label: t('riskLadder.backgroundRisk'), value: 10, color: 'bg-gray-400' },
    { label: t('riskLadder.untreatedDisease'), value: 50, color: 'bg-orange-500' }
  ]

  const maxValue = Math.max(...risks.map(r => r.value))

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {t('riskLadder.title')}
      </h2>
      
      <div className="space-y-4">
        {risks.map((risk, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">{risk.label}</span>
              <span className="text-gray-900 font-medium">{risk.value}/1000</span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${risk.color} transition-all duration-500`}
                style={{ width: `${(risk.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-xs text-gray-500">
        <p>{t('footer.disclaimer')}</p>
      </div>
    </div>
  )
}
