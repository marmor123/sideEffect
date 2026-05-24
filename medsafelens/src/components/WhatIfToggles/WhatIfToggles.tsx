import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../stores/useAppStore'

export default function WhatIfToggles() {
  const { t } = useTranslation()
  const { medications, whatIfScenarios, toggleStopDrug, toggleAddDrug, setG6PDStatus, setPregnancyStatus } = useAppStore()
  const [isExpanded, setIsExpanded] = useState(false)

  if (medications.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {t('whatIf.title')}
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2"
        >
          <span>{isExpanded ? 'Hide' : 'Show'} Scenarios</span>
          <svg 
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Stop Drug Scenarios */}
          <div className="border-b pb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {t('whatIf.stopDrug')}
            </h3>
            <div className="space-y-2">
              {medications.map((med) => (
                <label key={med.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={whatIfScenarios.isStoppingDrug[med.id] || false}
                    onChange={() => toggleStopDrug(med.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">{med.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Add Drug Scenarios */}
          <div className="border-b pb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {t('whatIf.addDrug')}
            </h3>
            <div className="space-y-2">
              {medications.map((med) => (
                <label key={med.id} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={whatIfScenarios.isAddingDrug.includes(med.id)}
                    onChange={() => toggleAddDrug(med.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Add interaction with {med.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Genetic Factors */}
          <div className="border-b pb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              {t('whatIf.geneticFactor')}
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatIfScenarios.hasG6PD}
                  onChange={(e) => setG6PDStatus(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">G6PD Deficiency</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatIfScenarios.isPregnant}
                  onChange={(e) => setPregnancyStatus(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Pregnancy or breastfeeding</span>
              </label>
            </div>
          </div>

          {/* Info message */}
          <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
            <p className="text-sm text-yellow-800">
              These scenarios help you understand how different factors might affect your medication risks. 
              Always discuss any changes with your healthcare provider.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
