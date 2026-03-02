# Joshua Segatt - Senior Frontend Engineer Portfolio

A modern, high-performance web portfolio built to showcase technical expertise, scalable architecture, and premium user experiences. Designed with a focus on fluid animations, responsive layouts, and robust component design.

## Architecture & Tech Stack

- **Core**: React 18 / TypeScript
- **Styling**: Tailwind CSS (Utility-first, Custom Design Tokens)
- **Animations**: Framer Motion (Orchestrated physics-based animations)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite (Lightning-fast HMR and optimized production builds)

## Design Philosophy

- **Zero-Compromise UI**: Pixel-perfect implementation with deep attention to micro-interactions.
- **Component-Driven**: Modular, reusable architecture following SOLID principles where applicable.
- **Performance First**: Optimized asset delivery, minimal re-renders, and efficient CSS payload.
- **Fluid Typography & Spacing**: Adaptive scaling across all device viewports.

## Core Features

- **Interactive Project Lab**: A dynamic, multi-step proposal generator with integrated complexity calculation.
- **Blueprint Scanner**: An animated, faux-analytical UI component demonstrating complex state management and sequenced animations.
- **Responsive Hero Section**: Tailored visual hierarchy supporting dynamic content presentation.
- **Form Integration**: Client-side form handling and payload formatting via EmailJS.

## Getting Started

To run this project locally for review or development:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Structure Overview

```text
src/
├── components/          # Reusable UI components (Hero, ProjectLab, BlueprintScanner)
├── App.tsx              # Root application component and routing configuration
├── index.css            # Global stylesheet and Tailwind directives
├── main.tsx             # Application entry point
└── tailwind.config.js   # Custom theme tokens and design system configuration
```

## Deployment

Configured for seamless deployment via Netlify or Vercel using standard React/Vite build presets.

```bash
Build Command: npm run build
Publish Directory: dist
```

---
*Built by Joshua Segatt.*
