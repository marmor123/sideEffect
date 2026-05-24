import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import InputForm from './components/InputForm/InputForm'
import IconArray from './components/IconArray/IconArray'
import RiskLadder from './components/RiskLadder/RiskLadder'
import MetaphorDisplay from './components/MetaphorDisplay/MetaphorDisplay'
import WhatIfToggles from './components/WhatIfToggles/WhatIfToggles'
import DoctorBrief from './components/DoctorBrief/DoctorBrief'
import { useAppStore } from './stores/useAppStore'

function App() {
  const { t, i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'he' : 'en'
    i18n.changeLanguage(newLang)
    setCurrentLanguage(newLang)
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MedSafe Lens</h1>
              <p className="text-sm text-gray-600 mt-1">
                {t('header.subtitle')}
              </p>
            </div>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              {currentLanguage === 'en' ? 'עברית' : 'English'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Input Section */}
        <section className="mb-8">
          <InputForm />
        </section>

        {/* What If Scenarios */}
        <section className="mb-8">
          <WhatIfToggles />
        </section>

        {/* Results Section - Shown when medications are selected */}
        <section className="space-y-8">
          <IconArray />
          <RiskLadder />
          <MetaphorDisplay />
          <DoctorBrief />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600">
            {t('footer.disclaimer')}
          </p>
          <p className="text-center text-xs text-gray-500 mt-2">
            {t('footer.privacy')}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
