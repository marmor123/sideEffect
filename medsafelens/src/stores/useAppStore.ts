import { create } from 'zustand'
import type { Medication, PersonalFactors, MetaphorCategory } from '../types'

interface AppState {
  // Medications
  medications: Medication[]
  addMedication: (med: Medication) => void
  removeMedication: (id: string) => void
  
  // Personal factors
  personalFactors: PersonalFactors
  updatePersonalFactors: (factors: Partial<PersonalFactors>) => void
  
  // Metaphor preference
  metaphorCategory: MetaphorCategory
  setMetaphorCategory: (category: MetaphorCategory) => void
  
  // What If scenarios
  whatIfScenarios: {
    isStoppingDrug: Record<string, boolean>
    isAddingDrug: string[]
    hasG6PD: boolean
    isPregnant: boolean
  }
  toggleStopDrug: (medId: string) => void
  toggleAddDrug: (medId: string) => void
  setG6PDStatus: (hasG6PD: boolean) => void
  setPregnancyStatus: (isPregnant: boolean) => void
  
  // Analysis results
  calculatedRisks: any[]
  setCalculatedRisks: (risks: any[]) => void
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  medications: [],
  personalFactors: {
    age: 50,
    sex: 'male',
    isPregnant: false,
    hasG6PD: false
  },
  metaphorCategory: 'everyday',
  whatIfScenarios: {
    isStoppingDrug: {},
    isAddingDrug: [],
    hasG6PD: false,
    isPregnant: false
  },
  calculatedRisks: [],
  
  // Actions
  addMedication: (med) =>
    set((state) => ({
      medications: [...state.medications, med]
    })),
    
  removeMedication: (id) =>
    set((state) => ({
      medications: state.medications.filter((m) => m.id !== id)
    })),
    
  updatePersonalFactors: (factors) =>
    set((state) => ({
      personalFactors: { ...state.personalFactors, ...factors }
    })),
    
  setMetaphorCategory: (category) =>
    set({ metaphorCategory: category }),
    
  toggleStopDrug: (medId) =>
    set((state) => ({
      whatIfScenarios: {
        ...state.whatIfScenarios,
        isStoppingDrug: {
          ...state.whatIfScenarios.isStoppingDrug,
          [medId]: !state.whatIfScenarios.isStoppingDrug[medId]
        }
      }
    })),
    
  toggleAddDrug: (medId) =>
    set((state) => ({
      whatIfScenarios: {
        ...state.whatIfScenarios,
        isAddingDrug: state.whatIfScenarios.isAddingDrug.includes(medId)
          ? state.whatIfScenarios.isAddingDrug.filter((id) => id !== medId)
          : [...state.whatIfScenarios.isAddingDrug, medId]
      }
    })),
    
  setG6PDStatus: (hasG6PD) =>
    set((state) => ({
      whatIfScenarios: { ...state.whatIfScenarios, hasG6PD }
    })),
    
  setPregnancyStatus: (isPregnant) =>
    set((state) => ({
      whatIfScenarios: { ...state.whatIfScenarios, isPregnant }
    })),
    
  setCalculatedRisks: (risks) =>
    set({ calculatedRisks: risks })
}))
