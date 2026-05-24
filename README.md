# MedSafe Lens

An AI-powered patient-facing web application that transforms raw medication alerts into personalized, clinically contextualized risk assessments.

## Overview

MedSafe Lens helps patients understand medication risks through:
- **Evidence-based visualizations** (icon arrays, risk ladders)
- **Emotionally calibrated metaphors** for better comprehension
- **Interactive "What If" scenarios** to explore different treatment options
- **Personalized risk assessments** based on individual patient factors

## Key Features

- 🎯 **Personalized Risk Assessment**: Input your medications and health conditions to get tailored risk information
- 📊 **Visual Risk Communication**: Icon arrays and risk ladders make complex data easy to understand
- 💬 **Plain Language Explanations**: Medical information translated into everyday language
- 🌍 **Multilingual Support**: Available in multiple languages with RTL support for Hebrew
- 📄 **Doctor Brief Generator**: Create printable summaries to discuss with healthcare providers
- 🔒 **Privacy-First**: Runs entirely in the browser - no backend, no data collection

## Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend Framework | React 18+ with TypeScript |
| Build Tool | Vite |
| State Management | Zustand |
| Internationalization | i18next |
| Visualization | SVG + D3.js |
| PDF Generation | jsPDF + html2canvas |
| Testing | Vitest + React Testing Library + Playwright |
| Package Manager | pnpm |

## Project Structure

```
MedSafe-Lens/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks
│   ├── stores/             # Zustand state stores
│   ├── data/               # Pre-curated JSON data
│   ├── i18n/               # Internationalization files
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── tests/                  # Test files
└── docs/                   # Documentation
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd MedSafe-Lens

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
```

## AI Agent Development Approach

This project leverages a multi-agent AI system where specialized AI agents collaborate to handle:
- 🤖 **Data Agent**: Curates medication and side effect data
- 💻 **Development Agent**: Implements core features
- 🏥 **Validation Agent**: Ensures clinical accuracy
- 🎨 **Design Agent**: Creates UI/UX components
- 🧪 **Testing Agent**: Performs quality assurance
- 📝 **Content Agent**: Generates user-facing content

## Documentation

- [AI Agent Plan](./MedSafe_Lens_AI_Agent_Plan.md) - Comprehensive implementation plan
- [Implementation Plan](./MedSafe_Lens_Implementation_Plan.md) - Detailed technical specifications

## Deployment

The application is designed for deployment on:
- **Vercel** or **Netlify** for automatic deployments from Git
- **Global CDN** for fast worldwide access
- **Client-side only** - no backend infrastructure required

## Privacy & Security

- ✅ No backend server - all processing happens in the browser
- ✅ No patient data is collected or stored externally
- ✅ Privacy-focused analytics (Plausible/Fathom)
- ✅ Anonymized error monitoring via Sentry

## License

[Specify License]

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

---

**MedSafe Lens** - Making medication safety information accessible and understandable for everyone.