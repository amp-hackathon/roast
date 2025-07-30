# PRD Critical Fixes Required

## 1. 🎯 DAMAGE SYSTEM FIX (High Priority)

**Problem**: Current 0-50+ damage could require 2-20+ roasts
**Solution**: Fixed damage ranges for predictable game length

```typescript
// REVISED DAMAGE SYSTEM
baseDamage: 25-45 (always decent damage)
typeEffectiveness: 0.8x, 1.0x, 1.2x (smaller variance)
finalDamage: 20-54 points per roast
RESULT: 2-3 good roasts = knockout (60-100+ points)
```

## 2. 📁 PROJECT STRUCTURE UPDATE

**Fix all file paths from Pages Router to App Router:**

```diff
- /pages/game.js          → /src/app/game/page.tsx
- /pages/api/roast-grader → /src/app/api/roast-grader/route.ts
```

## 3. 🎨 EXPLICIT ASSET USAGE GUIDE

**Add to PRD - When each asset is used:**

### Fighter Sprites
- `trump-left.png`: When Trump is left player 
- `trump-right.png`: When Trump is right player
- `trump-defeated.png`: When Trump loses (>100 points)
- `elon-left.png`: When Elon is left player
- `elon-right.png`: When Elon is right player  
- `elon-defeated.png`: When Elon loses (>100 points)

### Background Scenes
- `intro.png`: Game start screen
- `america.png`: Main battle background
- `perspective.png`: Victory/defeat screen

### Sound Effects
- `cheer.wav`: Good roast (35+ damage)
- `boo.wav`: Weak roast (<20 damage)  
- `oooooh.wav`: Super effective hit (1.2x multiplier)

## 4. 🎮 COMPLETE GAME FLOW SPEC

**Add missing initial state specification:**

```typescript
// GAME INITIALIZATION
const initialState = {
  currentPlayer: Math.random() > 0.5 ? 'trump' : 'elon',
  trumpDiddyPoints: 0,
  elonDiddyPoints: 0,
  gamePhase: 'battle', // Start directly in battle (skip setup)
  combatLog: [],
  turnCount: 0
}
```

## 5. 🔧 SIMPLIFIED API INTEGRATION

**Add fallback for roast grader failures:**

```typescript
// ROBUST API CALL
const evaluateRoast = async (roastText: string, target: string) => {
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

## 6. ⚡ AGENT COMMAND FIXES

**Update spawn commands with correct paths:**

```bash
# Agent 1: Core Game Engine
"Create /src/app/game/page.tsx with turn-based roast battle using Next.js App Router"

# Agent 2: Roast Grader API  
"Create /src/app/api/roast-grader/route.ts implementing roast evaluation with 25-45 damage range"

# Agent 3: Visual Interface
"Create game UI in /src/app/game/page.tsx using assets from /assets/ with fighter sprites and minimal styling"

# Agent 4: Integration
"Connect roast grader API to game engine, add asset integration and victory screens"
```

## 7. 🎯 VICTORY/DEFEAT SCREEN SPEC

**Add missing end-game specification:**

```typescript
// VICTORY SCREEN ELEMENTS
{
  background: '/assets/scenes/perspective.png',
  winner: 'trump' | 'elon',
  defeated_sprite: winner === 'trump' ? 'elon-defeated.png' : 'trump-defeated.png',
  victory_message: `${winner.toUpperCase()} WINS!`,
  final_score: `Trump: ${trumpDiddyPoints} | Elon: ${elonDiddyPoints}`,
  restart_button: true
}
```

## 8. 🔊 MINIMAL AUDIO IMPLEMENTATION

**If Agent 4 has time, add this simple audio:**

```typescript
// SIMPLE AUDIO SYSTEM
const playSound = (soundName: string) => {
  try {
    const audio = new Audio(`/assets/sound_effects/${soundName}.wav`);
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Fail silently
  } catch (error) {} // Fail silently
};

// Usage
if (finalDamage >= 35) playSound('cheer');
else if (finalDamage < 20) playSound('boo');
if (typeEffectiveness > 1.0) playSound('oooooh');
```

---

## ✅ PRIORITY ORDER FOR FIXES

1. **Update damage system** (25-45 base, 0.8-1.2x multipliers)
2. **Fix file paths** (App Router structure)  
3. **Add asset usage guide** (when to show which sprite)
4. **Add API fallback** (never break the game)
5. **Specify victory screens** (complete the game loop)
