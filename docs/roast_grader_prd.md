# Roast Grader AI System - Hackathon MVP

## Overview
A simplified Pokemon-style roast battle game for the hackathon. Users submit roasts targeting either Donald Trump or Elon Musk, and the AI evaluates them with damage scores and type classifications.

## Core Features

### 1. Roast Input & Processing
- Text-based roast input via simple web form
- Two targets that automatically alternate: Donald Trump or Elon Musk
- Instant AI analysis and scoring

### 2. Roast Type Classification
Based on content analysis, classify roasts into Pokemon-inspired types:

| Type | Description | Examples |
|------|-------------|----------|
| **Fire** | Aggressive, direct burns | "Your career is more dead than..." |
| **Water** | Smooth, flowing insults | Subtle, sophisticated takedowns |
| **Electric** | Quick, shocking zingers | One-liners, rapid-fire burns |
| **Psychic** | Intellectual, mind-game roasts | IQ-based, educational background attacks |
| **Dark** | Brutal, personal attacks | Character assassination |
| **Normal** | Standard, everyday roasts | Generic insults, basic burns |
| **Flying** | High-level, aspirational attacks | Career/status-based roasts |
| **Ground** | Down-to-earth, relatable burns | Common person perspective |

#### 2.1. Default Roasts


### 3. Simplified Damage System
- **Base Damage**: AI assigns 25-45 based on overall roast quality
- **Type Effectiveness**: 1.2x (super effective), 1.0x (normal), 0.8x (not very effective)
- **Final Damage**: Base × Type Effectiveness

**Damage Scale Targets:**
- Good solid roast: 30-40 base damage
- With normal effectiveness (1.0x): 30-40 final damage ✓
- With super effective (1.2x): 36-48 final damage
- With not very effective (0.8x): 24-32 final damage
- **Target**: 2-3 good roasts ≈ 100 total health/damage (labeled as "Diddy Points")

### 4. Target Profiles (MVP)
**Donald Trump**
- Weak to: Psychic, Water (intellectual roasts hit hard)
- Resists: Fire, Dark (used to aggressive attacks)

**Elon Musk** 
- Weak to: Ground, Normal (everyday person perspective effective)
- Resists: Electric, Flying (tech/aspiration roasts bounce off)

## Technical Implementation

### Simple AI Flow
1. **Type Classification**: Single AI prompt to categorize roast type
2. **Damage Scoring**: AI evaluates quality and assigns base damage
3. **Type Effectiveness**: Apply hardcoded multipliers based on target

### API Structure
```typescript
interface RoastResult {
  roastText: string;
  target: 'trump' | 'elon';
  type: RoastType;
  baseDamage: number;        // 25-45 range
  typeEffectiveness: number; // 0.8x, 1.0x, or 1.2x
  finalDamage: number;       // baseDamage * typeEffectiveness
  explanation: string;
}
```

## User Experience Flow
1. User enters roast against either Trump or Elon (they alternate)
2. Click "Roast" button
3. Results display:
   - Roast type with Pokemon-style visual
   - Health/damage number (25-54 range) with "It's super effective!" style messages
   - Brief explanation of scoring

## AI System Prompt Guidelines

### 1. Audience Connection Bonus (+10-15% damage)
- **Reward**: Roasts that connect with "average American" experiences
- **Examples**: References to everyday struggles, common cultural touchstones

### 2. Cultural Event Recognition (+15-25% damage)
- **Reward**: References to well-known events, viral moments, popular culture
- **Examples**: Major news events, popular memes, cultural milestones

### 3. Underdog vs. Bullying Modifier (±20% damage)
- **Reward**: "Punching up" at powerful figures
- **Penalty**: Mean-spirited personal attacks on vulnerabilities

### 4. "Obvious Truth" Amplification (+5-10% damage)
- **Reward**: Roasts that voice what "everyone is already thinking"
- **Examples**: Calling out widely-recognized behavior patterns

## MVP Success Criteria
- AI can classify roast types consistently
- Damage calculations feel fair and engaging
- Users can easily submit roasts and see results
- Basic Pokemon-style visual feedback works
