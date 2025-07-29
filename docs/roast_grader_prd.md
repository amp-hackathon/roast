# Roast Grader AI System - Product Requirements Document

## Overview
An AI-powered roast evaluation system inspired by Pokemon battle mechanics that analyzes written roasts, categorizes them by "type," and calculates damage values based on effectiveness against specific targets.

## Core Features

### 1. Roast Input & Processing
- **Primary**: Text-based roast input via web interface
- **Future**: Voice-to-text integration for verbal roasts
- Real-time analysis and instant results
- Support for roasts targeting public figures/celebrities

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

### 3. Damage Calculation System

#### Base Damage (1-100)
- **Creativity Score** (25%): Originality and cleverness
- **Accuracy Score** (25%): How well it applies to the target
- **Severity Score** (25%): Intensity of the burn
- **Delivery Score** (25%): Writing quality and timing

#### Type Effectiveness Multipliers
- **Super Effective** (2x): Type advantage against target's perceived weaknesses
- **Effective** (1.5x): Good matchup
- **Normal** (1x): Standard effectiveness
- **Not Very Effective** (0.5x): Poor matchup
- **No Effect** (0x): Target is immune to this type

#### Additional Modifiers
- **Accuracy Modifier**: ±20% based on factual correctness
- **Timeliness Modifier**: ±15% for current events relevance
- **Critical Hit**: 5% chance for 2x damage on exceptional roasts

### 4. Target Profile System
Each public figure has:
- **Weaknesses**: Types they're vulnerable to (2x damage)
- **Resistances**: Types they resist (0.5x damage)
- **Immunities**: Types that don't affect them (0x damage)
- **Stat Profile**: Base defense against different roast categories

## Technical Implementation

### AI Components
1. **NLP Classifier**: Determine roast type using GPT-4/Claude
2. **Sentiment Analyzer**: Measure severity and tone
3. **Fact Checker**: Verify accuracy of claims
4. **Creativity Evaluator**: Assess originality vs. common roast patterns

### Data Requirements
- Celebrity/public figure database with vulnerability profiles
- Roast training dataset categorized by type and effectiveness
- Real-time social media sentiment for timeliness scoring

### API Structure
```typescript
interface RoastAnalysis {
  roastText: string;
  targetPerson: string;
  type: RoastType;
  baseDamage: number;
  modifiers: {
    typeEffectiveness: number;
    accuracy: number;
    timeliness: number;
    criticalHit: boolean;
  };
  finalDamage: number;
  explanation: string;
}
```

## User Experience Flow
1. User enters roast text and selects target
2. AI analyzes roast in real-time (< 3 seconds)
3. System displays:
   - Roast type with visual indicator
   - Damage calculation breakdown
   - Type effectiveness explanation
   - Improvement suggestions
4. Results saved to user's "Roast History" with leaderboards

## Success Metrics
- **Accuracy**: 85%+ user agreement on type classification
- **Engagement**: Average session time > 5 minutes
- **Retention**: 60% weekly active users return
- **Performance**: < 3 second response time for analysis

## Future Enhancements
- Multi-target roast battles
- User-generated target profiles
- Roast combination system ("dual-type" roasts)
- Real-time roast battles between users
- Integration with social media platforms
