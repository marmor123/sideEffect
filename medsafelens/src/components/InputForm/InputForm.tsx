import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../stores/useAppStore'
import type { Medication, MetaphorCategory } from '../../types'

const METAPHOR_CATEGORIES: { value: MetaphorCategory; label: string }[] = [
  { value: 'sports', label: 'Sports' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'music', label: 'Music' },
  { value: 'nature', label: 'Nature' },
  { value: 'everyday', label: 'Everyday' }
]

export default function InputForm() {
  const { t, i18n } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  
  const {
    medications,
    addMedication,
    removeMedication,
    personalFactors,
    updatePersonalFactors,
    metaphorCategory,
    setMetaphorCategory
  } = useAppStore()

  const handleAddMedication = () => {
    if (!searchTerm.trim()) return
    
    const newMed: Medication = {
      id: Date.now().toString(),
      name: searchTerm.trim(),
      dosage: '',
      frequency: ''
    }
    
    addMedication(newMed)
    setSearchTerm('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddMedication()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {t('inputForm.title')}
      </h2>

      {/* Medication Search */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('inputForm.searchPlaceholder')}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          dir={i18n.language === 'he' ? 'rtl' : 'ltr'}
        />
        <button
          onClick={handleAddMedication}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {t('inputForm.addButton')}
        </button>
      </div>

      {/* Medication List */}
      {medications.length > 0 && (
        <div className="mb-6 space-y-2">
          {medications.map((med) => (
            <div
              key={med.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
            >
              <span className="text-gray-900">{med.name}</span>
              <button
                onClick={() => removeMedication(med.id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                {t('inputForm.removeButton')}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Personal Factors */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          {t('inputForm.personalFactors.title')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('inputForm.personalFactors.age')}
            </label>
            <input
              type="number"
              value={personalFactors.age}
              onChange={(e) => updatePersonalFactors({ age: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              min="0"
              max="120"
            />
          </div>

          {/* Sex */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('inputForm.personalFactors.sex')}
            </label>
            <select
              value={personalFactors.sex}
              onChange={(e) => updatePersonalFactors({ sex: e.target.value as 'male' | 'female' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">{t('inputForm.personalFactors.male')}</option>
              <option value="female">{t('inputForm.personalFactors.female')}</option>
            </select>
          </div>

          {/* Pregnancy */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="pregnancy"
              checked={personalFactors.isPregnant}
              onChange={(e) => updatePersonalFactors({ isPregnant: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="pregnancy" className="ml-2 text-sm text-gray-700">
              {t('inputForm.personalFactors.pregnancy')}
            </label>
          </div>

          {/* G6PD */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="g6pd"
              checked={personalFactors.hasG6PD}
              onChange={(e) => updatePersonalFactors({ hasG6PD: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="g6pd" className="ml-2 text-sm text-gray-700">
              {t('inputForm.personalFactors.g6pd')}
            </label>
          </div>
        </div>
      </div>

      {/* Metaphor Preference */}
      <div className="border-t pt-4 mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('inputForm.metaphorPreference.label')}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {METAPHOR_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setMetaphorCategory(cat.value)}
              className={`px-3 py-2 text-sm rounded-md transition-colors ${
                metaphorCategory === cat.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t(`inputForm.metaphorPreference.${cat.value}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
