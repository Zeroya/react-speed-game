# Speed Game

A fast-paced reaction game where you compete against the computer. Click on highlighted cells before time runs out!

**[Play Online](https://zeroya.github.io/react-speed-game/)**

---

## About

Speed Game is a browser-based reaction time game built with React and TypeScript. The game challenges players to test their reflexes by clicking on randomly highlighted cells within a time limit. Each round, a cell lights up on the grid, and you must click it before the timer expires. If you're fast enough, you score a point. If not, the computer takes the round.

The game continues until one player reaches the winning score. The first to win more than half of the total rounds claims victory. Can you beat the computer?

---

## Features

### Gameplay
- **Competitive rounds** — Race against the computer in turn-based rounds
- **Auto-win detection** — Game ends automatically when a winner is mathematically determined
- **Give Up option** — Surrender anytime with the button or by pressing Q
- **Visual feedback** — Cells flash green for success, red for timeout

### Customization
- **Difficulty levels** — Choose from Easy (1500ms), Medium (1000ms), Hard (600ms), or set custom time
- **Grid shapes** — Play on different shapes: Square, Triangle, Diamond, Cross, Plus, Hexagon
- **Grid size** — Adjust the grid from 6x6 to 10x10 cells
- **Round count** — Set how many rounds per game (up to 20 or max cells in shape)
- **Zoom levels** — Three zoom options: Far, Medium, Close
- **Color themes** — Customize colors for default, highlighted, correct, and wrong states
- **Player name** — Personalize your game with a custom name

### Technical
- **Responsive design** — Works on desktop, tablet, and mobile devices
- **Smooth animations** — Countdown timer, screen flash effects, and modal transitions
- **State management** — Centralized game state with Redux Toolkit

---

## How to Play

1. Click **Start Game** to open the settings panel
2. Configure your preferences (difficulty, grid size, shape, etc.)
3. Click **Start** to begin
4. Watch the countdown: 3... 2... 1...
5. When a cell lights up (yellow/gold), click it as fast as you can!
6. Score points by clicking before the timer runs out
7. First to win the majority of rounds wins the game

**Tip:** Press **Q** at any time during gameplay to quickly give up.

---

## Tech Stack

- **React 18** — Component-based UI library with hooks
- **TypeScript** — Static typing for better developer experience
- **Redux Toolkit** — Predictable state management with Immer
- **Vite** — Fast build tool and development server
- **SCSS** — CSS preprocessor for maintainable styles
- **react-hook-form** — Performant form validation

---

## Project Structure

```
src/
├── components/          # React components
│   ├── Cell/           # Individual grid cell
│   ├── Countdown/      # 3-2-1 countdown display
│   ├── GameController/ # Game logic orchestrator
│   ├── GameGrid/       # Grid container with shape mask
│   ├── LeftPanel/      # Left sidebar with start button
│   ├── Modal/          # Reusable modal component
│   ├── RightPanel/     # Main game area
│   ├── ScoreBlock/     # Score display component
│   ├── ScreenFlash/    # Flash effect on round start
│   └── SettingsPanel/  # Game configuration form
├── store/              # Redux store configuration
│   └── reducers/       # State slices
├── types/              # TypeScript interfaces and enums
├── utils/              # Utility functions (shape generator)
├── hooks/              # Custom React hooks
├── constants/          # Game constants and presets
└── styles/             # Global SCSS styles
```

---

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/zeroya/react-speed-game.git
cd react-speed-game

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

---

## Documentation

- [Shape System](docs/SHAPES.md) — How grid shapes and masks work, adding new shapes
- [Technical Details](docs/TECHNICAL.md) — Error handling, performance optimizations
