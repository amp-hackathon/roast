# Trump vs. Elon: The Ultimate Roast Battle - Pokemon Style Game

## Overview
A NextJS-based Pokemon-style battle game where Donald Trump and Elon Musk engage in an epic roast battle using the existing roast classification system. The game features two main scenes: an intro dialogue sequence and a turn-based battle with animated attacks and damage.

## Game Flow

### 1. Intro Scene
- **Background**: `background-america.png`
- **Character Positioning**: 
  - Elon: Bottom left, facing right (`facing-right/elon.png`)
  - Trump: Top right, facing left (`facing-left/trump.png`)
- **Dialogue**: Sequential display of transcript from `starting_scene_transcript.md`
- **Transition**: Fade to battle scene after final dialogue line

### 2. Battle Scene Setup
- **Background**: `background-best-perspective.png`
- **Character Positioning**: Same as intro (Elon bottom-left, Trump top-right)
- **Turn Order**: 50-50 random chance for first turn
- **Starting Health**: 100 Diddy Points each
- **Health Bars**: Displayed above characters with damage animations

### 3. Battle Mechanics

#### Attack Generation
- **AI-Generated Roasts**: Each character generates contextual roasts using the existing roast grader system
- **Attack Types**: Based on 8 Pokemon-style types (Fire, Water, Electric, Psychic, Dark, Normal, Flying, Ground)
- **Damage Calculation**: Following existing roast_grader_prd.md specifications (25-45 base damage + type effectiveness)

#### Type Effectiveness System
**Trump Weaknesses/Resistances:**
- Weak to: Psychic (1.2x), Water (1.2x) - intellectual roasts hit hard
- Resists: Fire (0.8x), Dark (0.8x) - used to aggressive attacks

**Elon Weaknesses/Resistances:**
- Weak to: Ground (1.2x), Normal (1.2x) - everyday person perspective effective  
- Resists: Electric (0.8x), Flying (0.8x) - tech/aspiration roasts bounce off

#### Animation Sequence
1. **Attack Phase**:
   - Attacking character slides forward (~100px)
   - Display roast text in speech bubble
   - Character returns to original position

2. **Impact Phase**:
   - Three type-matching sprites (`/assets/types/[type].png`) animate over the hit target
   - Sprites appear in sequence with 0.2s intervals
   - Each sprite fades in, scales up 1.5x, then fades out

3. **Damage Phase**:
   - Health bar animates downward over 1s
   - Effectiveness message displays: "It's super effective!" / "It's not very effective!" / "It's effective!"
   - Screen shake effect for super effective hits

### 4. Victory Conditions

#### Defeat Animation
- When character reaches 0 Diddy Points:
  - Standing character sprite fades out (0.5s)
  - Defeated variant fades in (`${character}-defeated.png`)
  - Winner remains standing

#### Victory Screen
- Large banner overlay: "[Winner] WINS!"
- Subtitle: "The Ultimate King of Pettiness!"
- Background dims with victory animation effects

## Technical Implementation

### Component Structure
```typescript
interface GameState {
  scene: 'intro' | 'battle' | 'victory';
  currentTurn: 'trump' | 'elon';
  health: {
    trump: number;
    elon: number;
  };
  dialogueIndex: number;
  isAnimating: boolean;
}

interface BattleResult {
  attacker: 'trump' | 'elon';
  roastText: string;
  attackType: RoastType;
  baseDamage: number;
  effectiveness: number;
  finalDamage: number;
  message: string;
}
```

### AI Integration
- **Roast Generation**: Use existing roast grader AI system
- **Context Awareness**: Generate attacks that reference current battle state
- **Personality**: Maintain character-specific speaking patterns
- **Escalation**: Roasts become more intense as health decreases

### Asset Management
- **Character Sprites**: 4 states per character (facing-left, facing-right, both defeated)
- **Type Animations**: 10 type sprites with scaling/fading animations
- **Background Images**: 2 scene backgrounds with smooth transitions
- **Audio**: Battle music and sound effects for attacks/damage

### Animation System
- **CSS Transitions**: For character movement and health bars
- **Framer Motion**: For complex type attack animations
- **State Management**: React state with useReducer for battle logic

### Responsive Design
- **Desktop**: Full-size character sprites and animations
- **Mobile**: Scaled sprites with touch-friendly UI
- **Accessibility**: Screen reader support for battle narration

## Success Metrics
- Engaging turn-based combat feels balanced
- Type effectiveness system creates strategic depth
- Character personalities shine through AI-generated roasts
- Smooth animations enhance Pokemon-style battle experience
- Intro sequence effectively sets up the rivalry narrative

## Future Enhancements
- Additional characters (other political/tech figures)
- Special moves with unique animations
- Tournament mode with multiple battles
- Player-vs-AI mode where users submit their own roasts
