# Interview Prep Dashboard

An interactive dashboard for managing and tracking interview preparation progress, built with React, TypeScript, and Tailwind CSS.

## 📋 Key Features

### Content Management

- **Knowledge Categorization:**
  - Technical
  - Behavioral
  - Technologies
  - Problem-solving methodology
- **Topic Structure:**
  - Core concepts
  - Common interview questions
  - Best practices/patterns
  - Code examples (for technical topics)
  - Difficulty levels (Easy, Medium, Hard)

### Spaced Repetition System

- SuperMemo/Anki-like algorithm implementation
- Review intervals:
  - 1 day → 3 days → 7 days → 14 days → 30 days → 90 days
- Confidence-based progression
- Daily review queue generation

### Progress Tracking

- Topic mastery level (0-100%)
- Review history
- Strengths/weaknesses analysis
- Study streak tracking
- Visual progress indicators

### Web Application Features

- User authentication
- Responsive dashboard
- Study session interface
- Progress visualization
- Topic management interface
- Review scheduling calendar

## 🛠️ Tech Stack

- **Frontend:**
  - React 18+
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Vite
- **Backend:**
  - Node.js/Express
  - JWT authentication
- **Databases:**
  - PostgreSQL (user data & progress)
  - MongoDB (content & questions)

## 🎯 Project Milestones

### Core Features

- [x] Basic React dashboard component
- [ ] Database schema design
- [ ] Spaced repetition algorithm implementation
- [x] Review session interface
- [ ] Local storage implementation for progress persistence
- [x] View transition animations

### UI Components

- [x] Category details component
- [x] Interactive card navigation
- [x] Detailed category view
- [ ] Review scheduling system

### Animations & Interactions

- [x] Page transitions
- [ ] Loading state animations
- [x] Interactive element hover effects

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd interview-prep

# Install dependencies
npm install

# Start development server
npm run dev
```
