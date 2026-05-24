import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../stores/useAppStore'

interface IconArrayProps {
  totalIcons?: number
  affectedCount?: number
  size?: 'small' | 'medium' | 'large'
}

export default function IconArray({ 
  totalIcons = 100, 
  affectedCount = 0,
  size = 'medium'
}: IconArrayProps) {
  const { t } = useTranslation()
  const { medications } = useAppStore()

  if (medications.length === 0) {
    return null
  }

  const sizeClasses = {
    small: 'w-2 h-2',
    medium: 'w-3 h-3',
    large: 'w-4 h-4'
  }

  // Generate seeded random positions for affected icons
  const generatePositions = () => {
    const positions = Array(totalIcons).fill(false)
    let placed = 0
    const seed = affectedCount * totalIcons // Simple seed based on counts
    
    while (placed < affectedCount && placed < totalIcons) {
      const pos = Math.floor((Math.sin(seed + placed) + 1) / 2 * totalIcons)
      if (!positions[pos]) {
        positions[pos] = true
        placed++
      }
    }
    
    return positions
  }

  const positions = generatePositions()

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {t('iconArray.title')}
      </h2>
      
      {affectedCount > 0 ? (
        <>
          <div className="mb-4 text-sm text-gray-600">
            <span className="font-medium text-blue-600">{affectedCount}</span>
            {' '}{t('iconArray.outOf')}{' '}
            <span className="font-medium">{totalIcons}</span>
          </div>
          
          <div className="grid grid-cols-10 gap-1 justify-center">
            {positions.map((isAffected, index) => (
              <div
                key={index}
                className={`${sizeClasses[size]} rounded-full ${
                  isAffected
                    ? 'bg-blue-600'
                    : 'bg-gray-200'
                }`}
                title={isAffected ? t('iconArray.affected') : t('iconArray.unaffected')}
              />
            ))}
          </div>
          
          <div className="mt-4 flex gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full bg-blue-600`} />
              <span>{t('iconArray.affected')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full bg-gray-200`} />
              <span>{t('iconArray.unaffected')}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {t('iconArray.title')} - {t('inputForm.searchPlaceholder')}
        </div>
      )}
    </div>
  )
}
