export interface Medication {
  id: string
  name: string
  brandNames?: string[]
  dosage?: string
  frequency?: string
}

export interface SideEffect {
  effect: string
  absoluteRiskIncrement: number
  clinicalUrgency: 'benign' | 'actionable' | 'serious'
  riskMagnitudeText: string
  hasMetaphor: boolean
}

export interface DrugInteraction {
  drugPair: [string, string]
  interactionType: 'major' | 'moderate' | 'minor'
  riskMultiplier: number
  description: string
}

export interface Metaphor {
  urgencyTier: 'benign' | 'actionable' | 'serious'
  interestCategory: MetaphorCategory
  metaphorText: string
  emotionalValence: 'positive' | 'neutral' | 'negative'
}

export type MetaphorCategory = 
  | 'sports'
  | 'gaming'
  | 'cooking'
  | 'music'
  | 'nature'
  | 'everyday'
  | 'travel'
  | 'technology'
  | 'family'
  | 'finance'

export interface PersonalFactors {
  age: number
  sex: 'male' | 'female'
  isPregnant: boolean
  hasG6PD: boolean
}

export interface RiskData {
  medication: Medication
  sideEffects: SideEffect[]
  interactions: DrugInteraction[]
  netBenefit?: string
}
