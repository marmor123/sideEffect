import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../stores/useAppStore'

export default function DoctorBrief() {
  const { t, i18n } = useTranslation()
  const { medications, personalFactors } = useAppStore()
  const [isGenerated, setIsGenerated] = useState(false)

  if (medications.length === 0) {
    return null
  }

  const handleGenerate = () => {
    setIsGenerated(true)
    // In production, this would generate a PDF using jsPDF + html2canvas
  }

  const handleDownload = () => {
    // In production, this would trigger the PDF download
    alert(i18n.language === 'he' 
      ? 'הורדת PDF תתבצע בקרוב...' 
      : 'PDF download will be available soon...')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {t('doctorBrief.title')}
      </h2>
      
      <p className="text-gray-600 mb-6">
        {t('doctorBrief.description')}
      </p>

      {!isGenerated ? (
        <button
          onClick={handleGenerate}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          {t('doctorBrief.generateButton')}
        </button>
      ) : (
        <div className="space-y-4">
          {/* Generated Summary Preview */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-3">
              {i18n.language === 'he' ? 'סיכום למרשם' : 'Medication Summary'}
            </h3>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">
                  {i18n.language === 'he' ? 'תרופות נוכחיות:' : 'Current Medications:'}
                </span>
                <ul className="mt-1 ml-4 list-disc text-gray-600">
                  {medications.map(med => (
                    <li key={med.id}>{med.name}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <span className="font-medium text-gray-700">
                  {i18n.language === 'he' ? 'גורמים אישיים:' : 'Personal Factors:'}
                </span>
                <p className="mt-1 text-gray-600">
                  {i18n.language === 'he'
                    ? `גיל: ${personalFactors.age}, מין: ${personalFactors.sex === 'male' ? 'זכר' : 'נקבה'}`
                    : `Age: ${personalFactors.age}, Sex: ${personalFactors.sex}`}
                </p>
              </div>
              
              <div className="pt-2 border-t">
                <p className="text-gray-600 italic">
                  {i18n.language === 'he'
                    ? 'יש לדון בתופעות הלוואי ובסיכונים עם הרופא המטפל.'
                    : 'Please discuss side effects and risks with your healthcare provider.'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t('doctorBrief.downloadButton')}
          </button>

          <button
            onClick={() => setIsGenerated(false)}
            className="w-full px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            {i18n.language === 'he' ? 'צור מחדש' : 'Regenerate'}
          </button>
        </div>
      )}

      {/* Info note */}
      <div className="mt-6 p-3 bg-blue-50 border-l-4 border-blue-400">
        <p className="text-sm text-blue-800">
          {i18n.language === 'he'
            ? 'המידע נשמר בדפדפן שלך בלבד. אף נתון לא נשלח לשרתים חיצוניים.'
            : 'All information stays in your browser. No data is sent to external servers.'}
        </p>
      </div>
    </div>
  )
}
