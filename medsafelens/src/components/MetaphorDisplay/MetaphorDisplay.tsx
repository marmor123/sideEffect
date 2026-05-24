import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../stores/useAppStore'

// Sample metaphors data - will be replaced with actual data from JSON
const SAMPLE_METAPHORS = [
  {
    urgencyTier: 'benign' as const,
    interestCategory: 'everyday' as const,
    metaphorText: {
      en: "This side effect is about as common as finding a penny on the sidewalk.",
      he: "תופעת לוואי זו נפוצה בערך כמו למצוא מטבע ברחוב."
    },
    emotionalValence: 'neutral' as const
  },
  {
    urgencyTier: 'actionable' as const,
    interestCategory: 'everyday' as const,
    metaphorText: {
      en: "About 1 in 100 people experience this - similar to the chance of having your flight delayed.",
      he: "כ-1 מתוך 100 אנשים חווים זאת - דומה לסיכוי שהטיסה שלך תתעכב."
    },
    emotionalValence: 'neutral' as const
  },
  {
    urgencyTier: 'serious' as const,
    interestCategory: 'everyday' as const,
    metaphorText: {
      en: "This is very rare - about as likely as being struck by lightning in a year.",
      he: "זה נדיר מאוד - בערך באותה הסתברות להיפגע מברק במהלך שנה."
    },
    emotionalValence: 'negative' as const
  }
]

export default function MetaphorDisplay() {
  const { t, i18n } = useTranslation()
  const { medications, metaphorCategory, personalFactors } = useAppStore()
  const [showAlternative, setShowAlternative] = useState(false)

  if (medications.length === 0) {
    return null
  }

  // Get metaphor based on urgency and interest
  const getMetaphor = () => {
    // For demo purposes, we'll use the first metaphor that matches the category
    // In production, this would be selected based on the specific risk being displayed
    const currentLang = i18n.language as 'en' | 'he'
    
    // Find metaphor matching user's preference
    const metaphor = SAMPLE_METAPHORS.find(
      m => m.interestCategory === metaphorCategory
    ) || SAMPLE_METAPHORS[0]

    return metaphor.metaphorText[currentLang]
  }

  const metaphor = getMetaphor()

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {t('metaphorDisplay.title')}
      </h2>
      
      {metaphor ? (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-800 text-lg leading-relaxed">
              {metaphor}
            </p>
          </div>
          
          <button
            onClick={() => setShowAlternative(!showAlternative)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2"
          >
            <span>{t('metaphorDisplay.alternativeMetaphor')}</span>
            <svg 
              className={`w-4 h-4 transition-transform ${showAlternative ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showAlternative && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm">
                {i18n.language === 'he' 
                  ? "מטאפורה חלופית תוצג כאן בהתבסס על הקטגוריה שבחרת."
                  : "Alternative metaphor will be shown here based on your selected category."}
              </p>
            </div>
          )}
          
          {/* Context info */}
          <div className="text-xs text-gray-500 mt-4">
            <p>
              {i18n.language === 'he'
                ? `העדפת מטאפורה: ${t(`inputForm.metaphorPreference.${metaphorCategory}`)} | גיל: ${personalFactors.age}`
                : `Metaphor preference: ${t(`inputForm.metaphorPreference.${metaphorCategory}`)} | Age: ${personalFactors.age}`}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {t('iconArray.title')} - {t('inputForm.searchPlaceholder')}
        </div>
      )}
    </div>
  )
}
