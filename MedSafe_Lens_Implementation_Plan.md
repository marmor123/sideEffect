# MedSafe Lens - Detailed Implementation Plan

## Executive Summary

**Project Goal:** Create a patient-facing web application that transforms raw medication alerts into personalized, clinically contextualized risk assessments for an Israeli hackathon.

**Theme:** "BEYOND ALERTS: Design solutions that provide clarity and context to raw data, turning confusing alerts into verified facts."

**Timeline:** 48-hour hackathon MVP

**Team Composition:** 2-3 developers + 1 clinical expert

---

## Phase 1: Pre-Hackathon Preparation (Critical - Complete Before Event)

### 1.1 Data Curation Checklist (Clinical Expert Responsibility)

#### Drug Information Collection
- [ ] Select 5-10 commonly prescribed Israeli medications across different classes:
  - Anticoagulants (e.g., Warfarin)
  - Antidiabetics (e.g., Metformin)
  - Statins
  - Common antibiotics
  - Other high-volume prescriptions

- [ ] For each drug, gather:
  - Generic name (unique ID)
  - Israeli brand names
  - Primary indication/condition treated

#### Side Effects & Risk Data
- [ ] For each drug, identify 3-5 most common/serious side effects
- [ ] Source absolute risk estimates (incidence per 100 or 1,000 patients/year) from:
  - FDA DailyMed database
  - SIDER Database
  - Peer-reviewed literature (PubMed systematic reviews/meta-analyses)
  - Israeli pharmacovigilance reports if available

- [ ] Document pharmacogenetic risk modifiers:
  - G6PD deficiency interactions
  - Pregnancy-related contraindications
  - Age-based risk adjustments

#### Drug-Drug Interactions Matrix
- [ ] Create interaction matrix for selected drug pairs
- [ ] Define interaction type and risk multiplier for each pair
- [ ] Sources: DrugBank, Micromedex, prescribing information

#### Untreated Disease Risk Data
- [ ] Source baseline disease risks without treatment:
  - Stroke risk in untreated atrial fibrillation
  - Complication rates in uncontrolled diabetes
  - Cardiovascular events without statin therapy
- [ ] Use clinical guidelines (AHA, ESC, Israeli MOH)

#### Reference Risks (Everyday Comparisons)
- [ ] Annual car accident risk (Israeli statistics preferred)
- [ ] Lightning strike probability
- [ ] Other relatable everyday risks

#### Metaphor Library Curation
Create 15-20 metaphors organized by:

| Urgency Tier | Interest Category | Example Metaphors |
|--------------|-------------------|-------------------|
| **Benign** | Cooking | Finding a four-leaf clover, burning toast |
| **Benign** | Sports | Missing an easy putt in golf |
| **Benign** | Gaming | Getting a common loot drop |
| **Actionable** | Cooking | Perfectly poaching three eggs |
| **Actionable** | Sports | Olympic athlete winning silver |
| **Actionable** | Gaming | Scoring a hole-in-one |
| **Serious** | Cooking | [Sober, direct comparison] |
| **Serious** | Sports | Hat-trick in Premier League match |
| **Serious** | Gaming | Rare boss encounter |

**Metaphor Tagging Requirements:**
- Each metaphor tagged with: urgency tier, interest category, emotional valence
- Ensure cultural appropriateness for Israeli audience
- Vet for psychological impact (avoid fear-inducing language for benign risks)

### 1.2 JSON Schema Definition

Create and validate the following schema with development team:

```json
{
  "drugs": [
    {
      "id": "warfarin",
      "name": "Warfarin",
      "brandNames": ["Coumadin"],
      "indication": "Prevention of stroke in atrial fibrillation",
      "sideEffects": [
        {
          "effect": "Major Bleeding",
          "absoluteRiskIncrement": 0.002,
          "clinicalUrgency": "serious",
          "riskMagnitudeText": "1 in 500",
          "hasMetaphor": true
        }
      ]
    }
  ],
  "interactions": [
    {
      "drugPair": ["warfarin", "aspirin"],
      "interactionType": "increased_bleeding_risk",
      "riskMultiplier": 2.0,
      "description": "Combined use doubles bleeding risk"
    }
  ],
  "netBenefits": {
    "warfarin_atrial_fibrillation": {
      "untreatedDiseaseRisk": {
        "rate": 0.04,
        "denominator": "100",
        "description": "Annual stroke risk without anticoagulation"
      },
      "benefitDescription": "Reduces annual stroke risk by 64%",
      "netBenefitStatement": "3 strokes prevented for every 1 major bleed"
    }
  },
  "metaphors": {
    "benign": {
      "cooking": ["finding a four-leaf clover", "burning your toast"],
      "sports": ["missing an easy putt"],
      "gaming": ["common loot drop"]
    },
    "actionable": {
      "cooking": ["perfectly poaching three eggs"],
      "sports": ["Olympic athlete winning silver"],
      "gaming": ["hole-in-one in golf"]
    },
    "serious": {
      "sports": ["hat-trick in Premier League"],
      "gaming": ["rare boss encounter"]
    }
  },
  "referenceRisks": {
    "backgroundMortality": {
      "age_20_30_male": 0.001,
      "age_20_30_female": 0.0005,
      "age_40_50_male": 0.003,
      "age_40_50_female": 0.0015,
      "age_60_70_male": 0.01,
      "age_60_70_female": 0.006
    },
    "everyday": {
      "carAccident": 0.005,
      "lightningStrike": 0.000001
    }
  }
}
```

---

## Phase 2: 48-Hour Build Schedule

### Day 1: Foundation & Core Functionality (8:00 AM - 6:00 PM)

#### Morning Session (8:00 AM - 12:00 PM): Project Setup & Data Modeling

**Developer Tasks:**
- [ ] Initialize React project with Vite
  ```bash
  npm create vite@latest medsafelens -- --template react-ts
  cd medsafelens
  npm install
  ```

- [ ] Set up folder structure:
  ```
  src/
  ├── components/
  │   ├── InputForm.tsx
  │   ├── IconArray.tsx
  │   ├── RiskLadder.tsx
  │   ├── MetaphorDisplay.tsx
  │   ├── DoctorBrief.tsx
  │   └── WhatIfToggles.tsx
  ├── data/
  │   └── data.json
  ├── services/
  │   └── analysisService.ts
  ├── i18n/
  │   ├── config.ts
  │   ├── en.json
  │   └── he.json
  ├── hooks/
  ├── types/
  └── App.tsx
  ```

- [ ] Install dependencies:
  ```bash
  npm install i18next react-i18next zustand jspdf html2canvas
  npm install -D @types/jspdf
  ```

- [ ] Configure i18next for English/Hebrew bilingual support
  - Set up RTL support for Hebrew
  - Create translation keys for all UI elements

**Clinical Expert Tasks:**
- [ ] Finalize JSON schema (collaborate with developers)
- [ ] Populate `data.json` with mock data for 2 medications minimum:
  - Warfarin (anticoagulant example)
  - Metformin (antidiabetic example)
- [ ] Include for each:
  - 3-5 side effects with absolute risks
  - 1 drug-drug interaction
  - 2-3 net-benefit statements
  - 5-10 metaphors across categories

#### Afternoon Session (12:00 PM - 6:00 PM): Input Form & Analysis Logic

**Developer Tasks:**
- [ ] Build `<InputForm>` component with:
  - Medication input (text + add button, searchable dropdown if time permits)
  - Personal factors:
    - Age (number input)
    - Sex (dropdown: male/female)
    - Pregnancy status (checkbox)
    - G6PD deficiency (checkbox)
  - Interest category selector (dropdown: sports/gaming/cooking/music/nature)
  - "Analyse" button

- [ ] Create state management with Zustand:
  ```typescript
  // store.ts
  import { create } from 'zustand'
  
  interface AppState {
    medications: string[]
    age: number | null
    sex: 'male' | 'female' | null
    isPregnant: boolean
    hasG6PD: boolean
    interestCategory: string
    results: AnalysisResults | null
    // actions...
  }
  ```

**Clinical Expert + Developers Collaboration:**
- [ ] Implement `analysisService.ts`:
  - Function: `analyzeRisk(userInput, drugData)`
  - Cross-reference medications against interaction matrix
  - Calculate absolute risk for each side effect
  - Apply risk modifiers (G6PD, pregnancy, age)
  - Retrieve net-benefit statements
  - Determine icon array denominator based on risk magnitude
  - Select appropriate metaphors for rare risks

**Logic Flow:**
```typescript
function analyzeRisk(input, data) {
  // 1. Find drug information
  const drugs = input.medications.map(id => 
    data.drugs.find(d => d.id === id)
  )
  
  // 2. Check interactions
  const interactions = findInteractions(input.medications, data.interactions)
  
  // 3. Calculate risks
  const sideEffectRisks = calculateAbsoluteRisks(drugs, interactions, input)
  
  // 4. Get net benefits
  const netBenefits = getNetBenefits(drugs, input.conditions, data.netBenefits)
  
  // 5. Select metaphors for rare risks
  const metaphors = selectMetaphors(sideEffectRisks, input.interestCategory, data.metaphors)
  
  // 6. Get reference risks
  const backgroundRisk = getBackgroundMortality(input.age, input.sex, data.referenceRisks)
  
  return { sideEffectRisks, interactions, netBenefits, metaphors, backgroundRisk }
}
```

---

### Day 2: Visualization Development & Polish (8:00 AM - 6:00 PM)

#### Morning Session (8:00 AM - 12:00 PM): Primary Visualizations

**Developer Tasks:**

##### Icon Array Component (`<IconArray>`)
- [ ] Implement SVG-based icon grid
- [ ] Support multiple denominators:
  - 100 icons (risks ≥ 1%)
  - 500 icons (risks 0.2% - 1%)
  - 5,000 icons (risks 0.02% - 0.2%)
  - 10,000 icons (risks < 0.02%)

- [ ] Key implementation details:
  ```typescript
  // IconArray.tsx
  const IconArray = ({ risk, totalIcons = 100 }) => {
    const affectedCount = Math.round(totalIcons * risk)
    const positions = generateRandomPositions(totalIcons, affectedCount)
    
    return (
      <svg viewBox="0 0 500 500">
        {positions.map((pos, i) => (
          <circle
            key={i}
            cx={pos.x}
            cy={pos.y}
            r={3}
            fill={i < affectedCount ? '#4A90E2' : '#E0E0E0'}
          />
        ))}
      </svg>
    )
  }
  
  // Random placement algorithm
  function generateRandomPositions(total, affected) {
    // Fisher-Yates shuffle for random distribution
    // Avoid clustering to prevent perceptual bias
  }
  ```

- [ ] Performance optimizations:
  - Use `<canvas>` for 5,000+ icon arrays if SVG causes lag
  - Implement viewport-based rendering for large arrays
  - Add loading states for complex visualizations

- [ ] Accessibility features:
  - Color contrast WCAG AA compliance
  - Alt text: "Icon array showing X out of Y people experience this side effect"
  - Screen reader descriptions

- [ ] Design considerations:
  - Use calm colors (avoid alarming red)
  - Subtle distinction between affected/unaffected icons
  - Clear labels showing exact numbers

##### Risk Ladder Component (`<RiskLadder>`)
- [ ] Build vertical ladder visualization
- [ ] Display risk categories:
  - Medication side effects (harm)
  - Drug interactions (harm)
  - Untreated disease risk (context)
  - Background mortality (baseline)
  - Everyday risks (relatability)

- [ ] Implementation approach:
  ```typescript
  // RiskLadder.tsx
  const RiskLadder = ({ risks, backgroundRisk, untreatedRisk }) => {
    const allRisks = [
      ...risks.map(r => ({ ...r, type: 'harm' })),
      { ...untreatedRisk, type: 'disease', label: 'Risk without treatment' },
      { ...backgroundRisk, type: 'background', label: 'Normal annual risk' }
    ].sort((a, b) => b.rate - a.rate)
    
    return (
      <div className="risk-ladder">
        {allRisks.map(risk => (
          <div key={risk.label} className="ladder-item">
            <span className="label">{risk.label}</span>
            <div 
              className="bar" 
              style={{ width: `${normalizeToMax(risk.rate)}%` }}
            />
            <span className="value">{risk.magnitudeText}</span>
          </div>
        ))}
      </div>
    )
  }
  ```

- [ ] Visual design:
  - Color coding by risk type
  - Clear labels
  - Logarithmic scale if needed for wide risk ranges
  - Hover tooltips with explanations

**Clinical Expert Tasks:**
- [ ] Provide visual design specifications for risk ladder
- [ ] Define color scheme for different risk types
- [ ] Finalize reference points for demo scenarios
- [ ] Review icon array representations for accuracy

#### Afternoon Session (12:00 PM - 6:00 PM): Interactivity & Final Features

**Developer Tasks:**

##### Metaphor Engine Integration
- [ ] Implement rule-based selection logic:
  ```typescript
  // metaphorEngine.ts
  function selectMetaphor(risk, interestCategory, metaphorData) {
    // Step 1: Frequency check
    if (risk.absoluteRiskIncrement >= 0.0002) { // ≥ 1 in 5,000
      return null // Use icon array instead
    }
    
    // Step 2: Match urgency tier
    const urgencyPool = metaphorData[risk.clinicalUrgency]
    if (!urgencyPool) return null
    
    // Step 3: Filter by interest
    const interestPool = urgencyPool[interestCategory]
    if (!interestPool || interestPool.length === 0) {
      // Fallback to other categories
      return getFallbackMetaphor(risk)
    }
    
    // Step 4: Emotional valence check
    const appropriateMetaphors = interestPool.filter(
      m => isEmotionallyAligned(m, risk.clinicalUrgency)
    )
    
    // Step 5: Return random selection or fallback
    if (appropriateMetaphors.length > 0) {
      return randomChoice(appropriateMetaphors)
    }
    
    return `This risk is very rare, occurring in fewer than 1 in 5,000 people.`
  }
  ```

- [ ] Create `<MetaphorDisplay>` component
- [ ] Add interest category toggle with live updates

##### "What If" Scenario Toggles
- [ ] Build `<WhatIfToggles>` component with three options:
  - "What if I stop this drug?"
  - "What if I add another drug?"
  - "What if I have [genetic factor]?"

- [ ] Implement real-time recalculation:
  ```typescript
  // In main component
  const [scenarios, setScenarios] = useState({
    stoppingDrug: false,
    addingDrug: false,
    hasG6PD: false
  })
  
  useEffect(() => {
    const results = analyzeRisk({ ...input, ...scenarios }, data)
    setAnalysisResults(results)
  }, [scenarios, input])
  ```

- [ ] Update visualizations on toggle changes
- [ ] Show before/after comparison when relevant

##### Before & After View
- [ ] Create split-screen layout:
  - Left: Raw alert text (example from medication leaflet)
  - Right: MedSafe Lens visualization
- [ ] Add transition animation on "Analyse" click
- [ ] Prepare demo copy for raw alerts

##### Doctor Brief PDF Generation
- [ ] Implement jsPDF integration:
  ```typescript
  // DoctorBrief.tsx
  import jsPDF from 'jspdf'
  import html2canvas from 'html2canvas'
  
  const generateDoctorBrief = async (results) => {
    const element = document.getElementById('brief-content')
    const canvas = await html2canvas(element)
    const imgData = canvas.toDataURL('image/png')
    
    const pdf = new jsPDF()
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0)
    pdf.save('doctor-brief.pdf')
  }
  ```

- [ ] Design one-page summary layout:
  - Patient demographics
  - Current medications
  - Key risks requiring attention (top 3-5)
  - Net benefit summary
  - Questions for doctor discussion

**Clinical Expert Tasks:**
- [ ] Curate final metaphor set (15-20 total)
- [ ] Add metaphors to `data.json` with proper tagging
- [ ] Write "Doctor Brief" content template
- [ ] Prepare raw alert examples for Before & After view
- [ ] Validate all risk calculations and comparisons

---

### Day 3: Refinement & Demo Rehearsal (8:00 AM - 12:00 PM)

#### Testing & Polish
- [ ] End-to-end testing with various input combinations
- [ ] Bug fixes and edge case handling
- [ ] Performance optimization:
  - Test icon array rendering on low-end devices
  - Optimize bundle size
  - Lazy load heavy components if needed

- [ ] Hebrew RTL testing:
  - Verify text direction in all components
  - Check SVG rendering with RTL layout
  - Test form inputs and dropdowns
  - Ensure proper alignment in risk ladder

- [ ] Responsive design checks:
  - Desktop (1920x1080)
  - Laptop (1366x768)
  - Tablet (768x1024)

- [ ] Microcopy refinement:
  - Clear button labels
  - Helpful error messages
  - Accessible form descriptions

- [ ] Doctor Brief PDF quality check:
  - Readability
  - Proper formatting
  - All critical info included

#### Demo Rehearsal

**5-Minute Demo Script:**

**1. Introduction (30 seconds)**
> "Hi, we're from MedSafe Lens. We're tackling a major patient safety issue: patients are overwhelmed by confusing medication alerts, leading to anxiety and poor decision-making. Our solution transforms these alerts into clear, personalized risk facts."

**2. Show the Problem (45 seconds)**
- Display Before & After view
- Show noisy text-based warning: *"May cause muscle pain, weakness, or tenderness"*
> "This is the raw data a patient sees. It's vague and alarming."

**3. Present the Solution (90 seconds)**
- Click "Analyse" button
- Narrate as visualization appears:
> "With MedSafe Lens, you see the absolute risk. This icon array shows that for this drug, about 5 out of 100 people might experience this. The risk ladder then places this in context. Here's the background risk for someone your age, and here's the risk of the condition we're treating. You can immediately see the balance of benefits and harms."

**4. Demonstrate Interactivity (60 seconds)**
- Toggle "What if I stop this drug?"
> "Let's say you're concerned about this side effect. Toggling 'What if I stop this drug?' instantly shows you the risk of the untreated disease. Now you can weigh the two risks directly."
- Toggle genetic factor or add drug scenario
> "We can also personalize for your specific situation—like genetic factors or drug combinations."

**5. Highlight the Nuances (30 seconds)**
- Cycle through interest categories
> "For extremely rare risks, we use simple, calibrated metaphors. This prevents information overload while still conveying the rarity in a relatable way."

**6. Conclude with Utility (45 seconds)**
- Generate and display Doctor Brief
> "Finally, we know patients need to discuss this with their doctors. So we generate a one-page 'Doctor Brief' summarizing only the key points requiring attention. This empowers patients to have informed conversations."

**7. Closing Statement (15 seconds)**
> "MedSafe Lens turns confusing alerts into verified, contextualized facts, putting patients back in control of their health decisions."

**Rehearsal Checklist:**
- [ ] Practice timing (target: 4:30-5:00 minutes)
- [ ] Prepare backup screenshots/video in case of technical issues
- [ ] Assign roles: who presents which section
- [ ] Anticipate judge questions:
  - "How did you source the risk data?"
  - "What about integration with healthcare systems?"
  - "How do you handle languages beyond Hebrew/English?"
  - "What's your validation strategy?"

---

## Technical Architecture Overview

### Stack Components

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | React 18 + TypeScript | UI component architecture |
| Build Tool | Vite | Fast development and optimized builds |
| State Management | Zustand | Lightweight global state |
| Internationalization | i18next + react-i18next | English/Hebrew support |
| PDF Generation | jsPDF + html2canvas | Doctor Brief export |
| Styling | CSS Modules or Tailwind | Component-scoped styles |
| Data Storage | In-memory JSON | Pre-curated dataset |

### Data Flow Architecture

```
┌─────────────────┐
│  data.json      │
│  (bundled)      │
└────────┬────────┘
         │ Load on startup
         ▼
┌─────────────────┐
│  Global State   │
│  (Zustand)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────────┐
│  <InputForm>    │────▶│  analysisService │
│  User Inputs    │     │  (logic engine)  │
└─────────────────┘     └────────┬─────────┘
                                 │ Process:
                                 │ - Drug lookup
                                 │ - Interaction check
                                 │ - Risk calculation
                                 │ - Metaphor selection
                                 ▼
                        ┌──────────────────┐
                        │  Results Object  │
                        └────────┬─────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│  <IconArray>    │   │  <RiskLadder>   │   │ <MetaphorDisplay│
│  Visualizes     │   │  Contextualizes │   │  Rare risks     │
│  absolute risk  │   │  compares risks │   │  Personalized   │
└─────────────────┘   └─────────────────┘   └─────────────────┘
```

### Component Hierarchy

```
App
├── Header (language toggle, title)
├── BeforeAfterView
│   ├── RawAlertPanel
│   └── MedSafeLensPanel
│       ├── InputForm
│       │   ├── MedicationInput
│       │   ├── PersonalFactors
│       │   └── InterestSelector
│       ├── AnalyseButton
│       ├── WhatIfToggles
│       ├── ResultsSection (conditional)
│       │   ├── IconArray (per risk)
│       │   ├── RiskLadder
│       │   └── MetaphorDisplay (for rare risks)
│       └── DoctorBriefButton
└── Footer
```

---

## Risk Mitigation Strategies

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Icon array performance issues | Medium | High | Use canvas for >5000 icons; implement virtual scrolling |
| Hebrew RTL layout bugs | High | Medium | Test early; use CSS logical properties; allocate extra time |
| PDF generation failures | Low | Medium | Have screenshot fallback; test on multiple browsers |
| State management complexity | Low | Low | Keep state minimal; use Zustand simplicity |
| Bundle size too large | Low | Low | Code splitting; lazy loading; image optimization |

### Content/Data Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Incomplete risk data | Medium | High | Focus on 2-3 drugs done well vs. many done poorly |
| Inaccurate risk estimates | Low | Critical | Clinical expert validates all numbers; cite sources |
| Culturally inappropriate metaphors | Medium | Medium | Test with native Hebrew speakers; avoid sensitive topics |
| Overwhelming user with information | Medium | Medium | Progressive disclosure; hide advanced details by default |

### Timeline Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Running out of time | High | Critical | Prioritize MVP features; cut nice-to-haves early |
| Team member unavailable | Medium | Medium | Cross-train on critical tasks; document as you go |
| Scope creep | High | High | Strict feature freeze after Day 1 afternoon |
| Demo technical failure | Medium | Critical | Record backup video; prepare static screenshots |

---

## Success Criteria

### MVP Must-Haves (Demo-Ready)
- [ ] Functional input form with medication entry and personal factors
- [ ] Working analysis logic for at least 2 medications
- [ ] Icon array visualization (at least 100-icon version)
- [ ] Risk ladder with 3+ reference points
- [ ] "What if" toggles that trigger recalculation
- [ ] Before & After view demonstrating transformation
- [ ] Doctor Brief PDF generation
- [ ] Bilingual support (English/Hebrew)
- [ ] Smooth 5-minute demo flow

### Stretch Goals (If Time Permits)
- [ ] Searchable medication dropdown with autocomplete
- [ ] Full metaphor library (15-20 metaphors)
- [ ] Canvas-based icon arrays for better performance
- [ ] Additional drug-disease scenarios
- [ ] Enhanced visual polish and animations
- [ ] Mobile-responsive design
- [ ] Export/share functionality

### Non-Goals (Explicitly Out of Scope)
- ❌ Backend server or database
- ❌ EMR/EHR integration
- ❌ Barcode scanning
- ❌ LLM/AI-powered analysis
- ❌ User authentication
- ❌ Real-time collaboration
- ❌ Push notifications

---

## Post-Hackathon Roadmap (Future Phases)

### Phase 2: Enhanced MVP (1-2 months)
- Expand drug database to 50+ common Israeli medications
- Integrate with Israeli MOH open data APIs
- Add more sophisticated risk calculators (CHA₂DS₂-VASc, HAS-BLED)
- User testing with patient focus groups
- Iterate on metaphor library based on feedback

### Phase 3: Pilot Integration (3-6 months)
- Partner with single HMO clinic for pilot deployment
- Basic EMR integration via FHIR API
- Add clinician dashboard for monitoring patient engagement
- Collect outcome data: patient comprehension, adherence rates

### Phase 4: Scale & Commercialization (6-12 months)
- Full integration with major Israeli HMOs (Clalit, Maccabi, etc.)
- Pharmacy system integration for point-of-dispensing education
- Regulatory approval pathway exploration (FDA SaMD, EU MDR)
- Business model development (B2B2C through healthcare systems)

---

## Appendix A: Quick Reference Commands

### Project Initialization
```bash
npm create vite@latest medsafelens -- --template react-ts
cd medsafelens
npm install
npm install i18next react-i18next zustand jspdf html2canvas
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

### Useful Development Tools
```bash
# Type checking
npx tsc --noEmit

# Linting (if ESLint configured)
npm run lint

# Bundle analysis
npm install -D rollup-plugin-visualizer
```

---

## Appendix B: Key Research Citations from Source Document

- Icon arrays superiority: [[96,98,100,102,272]]
- Random icon placement benefits: [[97,100]]
- Color psychology in risk communication: [[95]]
- Risk ladder contextual framing: [[10,13,111,240]]
- Shared Decision-Making principles: [[179,223]]
- Metaphor calibration in health communication: [[40,41,139,194]]
- Client-side architecture for rapid prototyping: [[39,162]]
- JSON bundling strategy: [[191,19]]

---

## Appendix C: Contact & Resource List

### Data Sources
- FDA DailyMed: https://dailymed.nlm.nih.gov/
- SIDER Database: http://sideeffects.embl.de/
- DrugBank: https://www.drugbank.ca/
- Israeli Ministry of Health: https://www.health.gov.il/
- PubMed: https://pubmed.ncbi.nlm.nih.gov/

### Development Resources
- React Documentation: https://react.dev/
- Vite Documentation: https://vitejs.dev/
- i18next Documentation: https://www.i18next.com/
- Zustand Documentation: https://github.com/pmndrs/zustand
- jsPDF Documentation: https://rawgit.com/MrRio/jsPDF/master/docs/

### Design Resources
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Color Contrast Checker: https://webaim.org/resources/contrastchecker/
- SVG Optimization: https://jakearchibald.com/2014/07/svg-optimisation-tool/

---

**Document Version:** 1.0  
**Last Updated:** Based on research file analysis  
**Prepared For:** MedSafe Lens Hackathon Team  

---

*This plan is derived from the comprehensive research document "Beyond Alerts: A Feasibility Blueprint for MedSafe Lens" and is designed to guide the team through successful MVP development within the 48-hour hackathon timeframe.*
