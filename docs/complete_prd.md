# Roast Battle Game - 90-MINUTE SPRINT PRD
**MAXIMUM SPEED PARALLEL DEVELOPMENT PLAN**

## Project Overview

### What We're Building
A Pokemon-style roast battle game where two players (Trump vs Elon) engage in turn-based insult combat. Players take turns delivering roasts, which are evaluated by AI and translated into Pokemon-style attacks with damage calculations. The first player to accumulate 100 "Diddy Points" slips in baby oil and loses.

### Key Constraints
- **⚡ CRITICAL TIMELINE**: 90 minutes ONLY
- **Technology**: Next.js (already set up)
- **Assets**: Pre-existing in `/assets/` directory
- **Scope**: ABSOLUTE MINIMUM VIABLE DEMO

## Game Mechanics

### Pre-Game Setup
1. **Coin Flip**: Virtual coin determines who goes first (P1 vs P2)
2. **Character Selection**: Trump vs Elon (predetermined matchup)
3. **Context Setting**: Brief pre-battle banter/context (optional for MVP)

### Core Game Loop
1. **Roast Input**: Current player submits text-based insult
2. **AI Evaluation**: Roast grader analyzes and scores the roast (see Roast Grader PRD)
3. **Attack Animation**: Pokemon-style battle animation plays
4. **Damage Application**: Diddy Points added based on roast strength (0-50+ points)
5. **Visual Feedback**: Baby oil accumulates at defender's feet
6. **Turn Switch**: Roles reverse, opponent's turn
7. **Win Condition**: First to 100 Diddy Points slips and loses

### Victory Conditions
- **Loss**: Accumulate 100+ Diddy Points (slip in baby oil)
- **Win**: Opponent reaches 100 Diddy Points first

## Technical Architecture

### Technology Stack
- **Framework**: Next.js (full-stack solution)
- **Frontend**: React components with CSS animations
- **Backend**: Next.js API routes
- **AI Integration**: Roast grader system (already defined in separate PRD)
- **Assets**: Pre-made Pokemon-esque images in `/assets/`

### Project Structure
```
/
├── assets/
│   ├── fighters/           # Character sprites (facing-left, facing-right)
│   ├── scenes/            # Background images
│   ├── music/             # Background audio
│   └── sound_effects/     # Battle sounds
├── src/
│   ├── components/        # React components
│   ├── pages/            # Next.js pages
│   ├── api/              # API routes
│   └── styles/           # CSS/styling
└── docs/                 # Project documentation
```

### Available Assets
- **Fighter Sprites**: Trump and Elon (normal + defeated states, left/right facing)
- **Backgrounds**: America, intro, and perspective scenes
- **Audio**: Background music ("Punchlines and Uppercuts")
- **Sound Effects**: Crowd reactions (cheer, boo, "oooooh")

## User Interface Design

### Game Screen Layout
```
┌─────────────────────────────────────────────┐
│  [Background Scene]                         │
│                                             │
│  [Trump Sprite]    VS    [Elon Sprite]     │
│                                             │
│  [Baby Oil Pool]         [Baby Oil Pool]   │
│  Diddy Points: 45        Diddy Points: 23  │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ [Roast Input Box]                   │   │
│  │ "Enter your roast here..."          │   │
│  └─────────────────────────────────────┘   │
│                [ROAST!] Button              │
│                                             │
│  [Combat Log / Previous Roasts]             │
└─────────────────────────────────────────────┘
```

### Key UI Components
1. **Battle Arena**: Pokemon-style split screen with fighters
2. **Health/Points Display**: Diddy Points counter for each player
3. **Baby Oil Visual**: Animated pools that grow with damage
4. **Roast Input**: Large text area for entering insults
5. **Combat Log**: Scrollable history of previous roasts and results
6. **Audio Controls**: Background music and sound effect toggles

## Feature Specifications

### 🎯 ABSOLUTE MINIMUM FEATURES (90 MINUTES)
**CUT EVERYTHING NON-ESSENTIAL**

1. **CORE LOOP ONLY**
   - Text input for roasts
   - "Submit Roast" button
   - Turn alternation (Trump → Elon → Trump)
   - Damage accumulation
   - "You Win/Lose" message at 100 points

2. **BARE VISUAL ELEMENTS**
   - Two static fighter images
   - Two numbers showing Diddy Points
   - Basic background image
   - Current player indicator

3. **ZERO POLISH**
   - No animations
   - No sound (unless Agent 4 has extra time)
   - No fancy CSS
   - No baby oil visualization
   - No combat log

### 🚫 FEATURES TO CUT (SAVE TIME)
- Pre-game coin flip
- Context setting
- Animated attacks
- Baby oil pools
- Audio system
- Combat history
- Type effectiveness messages
- Victory animations

## ⚡ PARALLEL EXECUTION PLAN (90 MINUTES)

### 🚀 AGENT DEPLOYMENT STRATEGY
**Deploy 3-4 agents simultaneously for maximum parallel development**

### Agent 1: Core Game Engine (30 minutes)
**PRIORITY: ABSOLUTE HIGHEST**
1. Create Next.js game page (`/pages/game.js`)
2. Implement basic game state (`useState` for turn tracking)
3. Simple turn-based input system
4. Mock roast evaluation (random 1-50 damage for now)
5. Win condition logic (first to 100 points loses)

### Agent 2: Roast Grader API (30 minutes)
**PRIORITY: HIGH - CAN WORK IN PARALLEL**
1. Create `/pages/api/roast-grader.js`
2. Implement the roast evaluation system from `roast_grader_prd.md`
3. Return proper damage scores and type classifications
4. Test with simple curl commands

### Agent 3: Visual Interface (45 minutes)
**PRIORITY: MEDIUM - PURELY VISUAL**
1. Create game UI layout with basic CSS
2. Display fighter sprites from `/assets/fighters/`
3. Show background from `/assets/scenes/`
4. Diddy Points counters
5. Simple baby oil visual indicator

### Agent 4: Integration & Polish (30 minutes)
**PRIORITY: FINAL ASSEMBLY**
1. Connect real roast grader API to game engine
2. Add sound effects from `/assets/sound_effects/`
3. Final testing and bug fixes
4. Victory/defeat screens

### ⏱️ TIMELINE BREAKDOWN
- **Minutes 0-30**: Agents 1, 2, 3 work in parallel
- **Minutes 30-45**: Agent 3 continues visual work while Agents 1&2 finish
- **Minutes 45-75**: Agent 4 integrates everything
- **Minutes 75-90**: Final testing, demo preparation

## API Integration

### Roast Grader Integration
```typescript
// API Call to Roast Grader
const evaluateRoast = async (roastText: string, target: 'trump' | 'musk') => {
  const response = await fetch('/api/roast-grader', {
    method: 'POST',
    body: JSON.stringify({ roastText, target })
  });
  
  return response.json(); // Returns RoastResult from roast_grader_prd.md
};
```

### Game State Management
```typescript
interface GameState {
  currentPlayer: 'trump' | 'elon';
  trumpDiddyPoints: number;
  elonDiddyPoints: number;
  gamePhase: 'setup' | 'battle' | 'gameover';
  combatLog: RoastResult[];
  winner?: 'trump' | 'elon';
}
```

## Success Criteria

### Technical Success
- [ ] Functional turn-based gameplay
- [ ] AI roast evaluation working
- [ ] Visual feedback for all game states
- [ ] Win/loss conditions implemented
- [ ] No critical bugs or crashes

### User Experience Success
- [ ] Intuitive interface requiring no explanation
- [ ] Engaging visual feedback
- [ ] Clear progression toward victory/defeat
- [ ] Entertaining roast evaluation results
- [ ] Smooth gameplay flow

### Hackathon Success
- [ ] Demonstrable working game in 2 hours
- [ ] All team members' contributions integrated
- [ ] Fun and engaging for audience demo
- [ ] Polished enough for presentation

## Risk Mitigation

### High Risk Items
1. **AI Integration Complexity**: Keep roast grader API simple, fallback to random scoring
2. **Asset Integration**: Test asset loading early, have backup placeholder images
3. **State Management**: Use simple React state, avoid complex state libraries
4. **Time Management**: Prioritize core functionality over polish

### Fallback Plans
- **No AI**: Use predetermined roast scoring algorithm
- **No Audio**: Focus on visual-only experience
- **No Animations**: Static sprite display with position changes
- **Simple UI**: Plain HTML/CSS instead of complex styling

## 🎯 DEFINITION OF DONE (90 MINUTES)

### ✅ SUCCESS = WORKING DEMO
A functional Next.js web application with:
1. **Input box** where players enter roasts
2. **Submit button** that triggers evaluation
3. **Turn alternation** between Trump and Elon
4. **Damage accumulation** toward 100 Diddy Points
5. **Win/Loss screen** when someone reaches 100

### 🚀 AGENT SPAWN COMMANDS

**Execute these 4 tasks in parallel immediately:**

```bash
# Agent 1: Core Game Engine
amp -x "Create /pages/game.js with basic turn-based roast battle game state management"

# Agent 2: Roast Grader API  
amp -x "Create /pages/api/roast-grader.js implementing the roast evaluation from docs/roast_grader_prd.md"

# Agent 3: Visual Interface
amp -x "Create game UI layout using assets from /assets/ directory with fighter sprites and basic styling"

# Agent 4: Integration (start after 30 min)
amp -x "Integrate roast grader API with game engine and add final polish"
```

### 🔥 EMERGENCY FALLBACKS
If any agent fails:
- **No AI**: Use `Math.floor(Math.random() * 50) + 1` for damage
- **No Assets**: Use text placeholders ("TRUMP" vs "ELON")  
- **No Styling**: Plain HTML with inline styles
- **No Polish**: Basic alert() for win/loss

**GOAL: WORKING > PRETTY**
