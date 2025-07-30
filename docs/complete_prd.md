# Roast Battle Game - 90-MINUTE SPRINT PRD
**MAXIMUM SPEED PARALLEL DEVELOPMENT PLAN**

## Project Overview

### What We're Building
A Pokemon-style roast battle game where two players (Trump vs Elon) engage in turn-based insult combat. Players take turns delivering roasts, which are evaluated by AI and translated into Pokemon-style attacks with damage calculations. The first player to accumulate 100 damage (labeled as "Diddy Points") slips in baby oil and loses.

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
4. **Damage Application**: Damage added based on roast strength (25-54 points per roast)
5. **Visual Feedback**: Damage stat increases at defender's feet
6. **Turn Switch**: Roles reverse, opponent's turn
7. **Win Condition**: First to 100 damage slips and loses

### Victory Conditions
- **Loss**: Accumulate 100+ damage (slip in baby oil)
- **Win**: Opponent reaches 100 damage first

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
│   ├── app/              # Next.js App Router pages
│   │   ├── game/         # Game page
│   │   └── api/          # API routes
│   ├── components/       # React components
│   └── styles/           # CSS/styling
└── docs/                 # Project documentation
```

### Available Assets

#### Fighter Sprites Usage
- `trump-left.png`: When Trump is left player 
- `trump-right.png`: When Trump is right player
- `trump-defeated.png`: When Trump loses (>100 damage)
- `elon-left.png`: When Elon is left player
- `elon-right.png`: When Elon is right player  
- `elon-defeated.png`: When Elon loses (>100 damage)

#### Background Scenes Usage
- `intro.png`: Game start screen
- `america.png`: Main battle background
- `perspective.png`: Victory/defeat screen

#### Audio Usage
- **Background Music**: "Punchlines and Uppercuts" (continuous during battle)
- **Sound Effects**: 
  - `cheer.wav`: Good roast (35+ damage)
  - `boo.wav`: Weak roast (<25 damage)
  - `oooooh.wav`: Super effective hit (1.2x multiplier)

## User Interface Design

### Game Screen Layout
```
┌─────────────────────────────────────────────┐
│  [Background Scene]                         │
│                                             │
│  [Trump Sprite]    VS    [Elon Sprite]      │
│                                             │
│  [Health Bar]             [Health Bar]      │
│  Diddy Points: 45        Diddy Points: 23   │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ [Roast Input Box]                   │    │
│  │ "Enter your roast here..."          │    │
│  └─────────────────────────────────────┘    │
│                [ROAST!] Button              │
│                                             │
│  [Combat Log / Previous Roasts]             │
└─────────────────────────────────────────────┘
```

### Key UI Components
1. **Battle Arena**: Pokemon-style split screen with fighters
2. **Damage/Points Display**: Damage counter labeled as "Diddy Points" for each player
3. **Roast Input**: Large text area for entering insults
4. **Combat Log**: Scrollable history of previous roasts and results
5. **Audio Controls**: Background music and sound effect toggles

## Feature Specifications

### 🎯 ABSOLUTE MINIMUM FEATURES (90 MINUTES)
**CUT EVERYTHING NON-ESSENTIAL**

1. **CORE LOOP ONLY**
   - Text input for roasts
   - "Submit Roast" button
   - Turn alternation (Trump → Elon → Trump)
   - Damage accumulation
   - "You Win/Lose" message at 100 damage

2. **BARE VISUAL ELEMENTS**
   - Two static fighter images
   - Two numbers showing Diddy Points
   - Basic background image
   - Current player indicator
   - Super Effective/Not Very Effective Messages

3. **LOW POLISH**
   - No baby oil visualization
   - No combat log

### 🚫 FEATURES TO CUT (SAVE TIME)
- Context setting
- Animated attacks
- Baby oil pools
- Combat history
- Victory animations

## ⚡ PARALLEL EXECUTION PLAN (90 MINUTES)

### 🚀 AGENT DEPLOYMENT STRATEGY
**Deploy 3-4 agents simultaneously for maximum parallel development**

### Agent 1: Core Game Engine (30 minutes)
**PRIORITY: ABSOLUTE HIGHEST**
1. Create Next.js game page (`/src/app/game/page.tsx`)
2. Implement basic game state (`useState` for turn tracking)
3. Simple turn-based input system
4. Mock roast evaluation (25-45 base damage with 0.8x-1.2x multipliers)
5. Win condition logic (first to 100 damage loses)

### Agent 2: Roast Grader API (30 minutes)
**PRIORITY: HIGH - CAN WORK IN PARALLEL**
1. Create `/src/app/api/roast-grader/route.ts`
2. Implement the roast evaluation system from `roast_grader_prd.md`
3. Return proper damage scores (25-45 base) and type classifications
4. Include API fallback for reliability
5. Test with simple curl commands

### Agent 3: Visual Interface (45 minutes)
**PRIORITY: MEDIUM - PURELY VISUAL**
1. Create game UI layout with basic CSS
2. Display fighter sprites from `/assets/fighters/`
3. Show background from `/assets/scenes/`
4. Damage counters labeled as "Diddy Points"
5. Simple health bar indicator

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
// API Call to Roast Grader with Fallback
const evaluateRoast = async (roastText: string, target: 'trump' | 'elon') => {
  try {
    const response = await fetch('/api/roast-grader', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roastText, target })
    });
    return await response.json();
  } catch (error) {
    // FALLBACK: Always return playable damage
    return {
      baseDamage: 25 + Math.floor(Math.random() * 20), // 25-44
      typeEffectiveness: 1.0,
      finalDamage: 25 + Math.floor(Math.random() * 20),
      type: 'normal',
      explanation: 'Connection error - using default scoring'
    };
  }
};
```

### Game State Management
```typescript
interface GameState {
  currentPlayer: 'trump' | 'elon';
  trumpHealth: number;        // Damage (labeled as "Diddy Points")
  elonHealth: number;         // Damage (labeled as "Diddy Points")
  gamePhase: 'battle' | 'gameover';  // Skip setup, start in battle
  combatLog: RoastResult[];
  winner?: 'trump' | 'elon';
  turnCount: number;
}

// Initial state
const initialState: GameState = {
  currentPlayer: Math.random() > 0.5 ? 'trump' : 'elon',
  trumpHealth: 0,
  elonHealth: 0,
  gamePhase: 'battle',
  combatLog: [],
  turnCount: 0
};
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
1. **AI Integration Complexity**: Keep roast grader API simple, fallback to 30 damage
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
4. **Damage accumulation** toward 100 (labeled as "Diddy Points")
5. **Win/Loss screen** when someone reaches 100 damage

### 🚀 AGENT SPAWN COMMANDS

**Execute these 4 tasks in parallel immediately:**

```bash
# Agent 1: Core Game Engine
amp -x "Create /src/app/game/page.tsx with turn-based roast battle using Next.js App Router and 25-45 damage system"

# Agent 2: Roast Grader API  
amp -x "Create /src/app/api/roast-grader/route.ts implementing roast evaluation with 25-45 base damage and API fallback"

# Agent 3: Visual Interface
amp -x "Create game UI in /src/app/game/page.tsx using assets from /assets/ with fighter sprites and damage counters"

# Agent 4: Integration (start after 30 min)
amp -x "Connect roast grader API to game engine, add asset integration and victory/defeat screens"
```

### 🔥 EMERGENCY FALLBACKS
If any agent fails:
- **No AI**: Use `25 + Math.floor(Math.random() * 20)` for damage (25-44)
- **No Assets**: Use text placeholders ("TRUMP" vs "ELON")  
- **No Styling**: Plain HTML with inline styles
- **No Polish**: Basic alert() for win/loss

**GOAL: WORKING > PRETTY**
