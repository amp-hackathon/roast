import { NextRequest, NextResponse } from 'next/server';

// Type definitions based on documentation
type RoastType = 'Fire' | 'Water' | 'Electric' | 'Psychic' | 'Dark' | 'Normal' | 'Flying' | 'Ground';
type Target = 'trump' | 'elon';

interface RoastResult {
  roastText: string;
  target: Target;
  type: RoastType;
  baseDamage: number;        // 25-45 range
  typeEffectiveness: number; // 0.8x, 1.0x, or 1.2x
  finalDamage: number;       // baseDamage * typeEffectiveness
  explanation: string;
}

interface RequestBody {
  roastText: string;
  target: Target;
}

// Type effectiveness mapping
const TYPE_EFFECTIVENESS: Record<Target, Record<RoastType, number>> = {
  trump: {
    // Trump is weak to intellectual/sophisticated roasts
    Psychic: 1.2,  // Intellectual roasts hit hard
    Water: 1.2,    // Smooth, sophisticated takedowns
    Flying: 1.0,   // Career attacks are normal
    Ground: 1.0,   // Common person perspective normal
    Electric: 1.0, // Quick zingers normal
    Normal: 1.0,   // Standard roasts normal
    Fire: 0.8,     // Used to aggressive attacks
    Dark: 0.8,     // Resists brutal personal attacks
  },
  elon: {
    // Elon is weak to down-to-earth, relatable attacks
    Ground: 1.2,   // Common person perspective effective
    Normal: 1.2,   // Everyday roasts hit hard
    Dark: 1.0,     // Personal attacks normal
    Psychic: 1.0,  // Intellectual roasts normal
    Water: 1.0,    // Sophisticated attacks normal
    Fire: 1.0,     // Aggressive attacks normal
    Electric: 0.8, // Tech roasts bounce off
    Flying: 0.8,   // Aspiration roasts bounce off
  }
};

// Fallback system that always returns valid damage
function generateFallbackResult(roastText: string, target: Target): RoastResult {
  const types: RoastType[] = ['Fire', 'Water', 'Electric', 'Psychic', 'Dark', 'Normal', 'Flying', 'Ground'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const baseDamage = 25 + Math.floor(Math.random() * 20); // 25-44 range
  const typeEffectiveness = TYPE_EFFECTIVENESS[target][randomType];
  
  return {
    roastText,
    target,
    type: randomType,
    baseDamage,
    typeEffectiveness,
    finalDamage: Math.round(baseDamage * typeEffectiveness),
    explanation: `A ${randomType.toLowerCase()} type roast with solid impact!`
  };
}

// Simple roast analysis algorithm
function analyzeRoast(roastText: string, target: Target): RoastResult {
  const text = roastText.toLowerCase();
  
  // Determine roast type based on keywords and content
  let type: RoastType = 'Normal'; // default
  
  if (text.includes('burn') || text.includes('fire') || text.includes('hot') || text.includes('flame')) {
    type = 'Fire';
  } else if (text.includes('smart') || text.includes('stupid') || text.includes('brain') || text.includes('iq') || text.includes('education')) {
    type = 'Psychic';
  } else if (text.includes('smooth') || text.includes('elegant') || text.includes('sophisticated') || text.includes('class')) {
    type = 'Water';
  } else if (text.includes('quick') || text.includes('fast') || text.includes('zap') || text.includes('shock')) {
    type = 'Electric';
  } else if (text.includes('dark') || text.includes('evil') || text.includes('cruel') || text.includes('brutal') || text.includes('destroy')) {
    type = 'Dark';
  } else if (text.includes('career') || text.includes('success') || text.includes('achievement') || text.includes('flying') || text.includes('high')) {
    type = 'Flying';
  } else if (text.includes('normal') || text.includes('average') || text.includes('regular') || text.includes('common') || text.includes('everyday')) {
    type = 'Ground';
  }
  
  // Calculate base damage (25-45) based on roast quality factors
  let baseDamage = 25;
  
  // Length bonus (longer roasts tend to be more thoughtful)
  if (roastText.length > 50) baseDamage += 3;
  if (roastText.length > 100) baseDamage += 3;
  
  // Creativity bonus (look for creative words/phrases)
  const creativePhrases = ['like', 'than', 'more', 'less', 'would', 'even', 'probably', 'definitely'];
  const creativeCount = creativePhrases.filter(phrase => text.includes(phrase)).length;
  baseDamage += Math.min(creativeCount * 2, 8);
  
  // Target-specific content bonus
  if (target === 'trump') {
    if (text.includes('twitter') || text.includes('tweet') || text.includes('social media')) baseDamage += 3;
    if (text.includes('business') || text.includes('deal') || text.includes('money')) baseDamage += 2;
    if (text.includes('hair') || text.includes('orange') || text.includes('tan')) baseDamage += 2;
  } else if (target === 'elon') {
    if (text.includes('tesla') || text.includes('spacex') || text.includes('mars') || text.includes('rocket')) baseDamage += 3;
    if (text.includes('twitter') || text.includes('x.com') || text.includes('social media')) baseDamage += 3;
    if (text.includes('meme') || text.includes('joke') || text.includes('funny')) baseDamage += 2;
  }
  
  // Cap the base damage at 45
  baseDamage = Math.min(baseDamage, 45);
  
  // Apply type effectiveness
  const typeEffectiveness = TYPE_EFFECTIVENESS[target][type];
  const finalDamage = Math.round(baseDamage * typeEffectiveness);
  
  // Generate explanation
  const effectivenessText = typeEffectiveness > 1.0 ? "It's super effective!" : 
                           typeEffectiveness < 1.0 ? "It's not very effective..." : 
                           "It's normally effective.";
  
  const explanation = `A ${type.toLowerCase()} type roast dealing ${baseDamage} base damage. ${effectivenessText}`;
  
  return {
    roastText,
    target,
    type,
    baseDamage,
    typeEffectiveness,
    finalDamage,
    explanation
  };
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: RequestBody = await request.json();
    
    // Validate request
    if (!body.roastText || typeof body.roastText !== 'string') {
      return NextResponse.json(
        { error: 'roastText is required and must be a string' },
        { status: 400 }
      );
    }
    
    if (body.roastText.length < 10) {
      return NextResponse.json(
        { error: 'roastText must be at least 10 characters long' },
        { status: 400 }
      );
    }
    
    if (!body.target || !['trump', 'elon'].includes(body.target)) {
      return NextResponse.json(
        { error: 'target must be either "trump" or "elon"' },
        { status: 400 }
      );
    }
    
    // Analyze the roast
    const result = analyzeRoast(body.roastText, body.target);
    
    // Return the result
    return NextResponse.json(result);
    
  } catch (error) {
    // Robust fallback - always return a valid result even on error
    console.error('Error in roast grader:', error);
    
    // Try to get request data for fallback
    let roastText = 'A roast was attempted';
    let target: Target = 'trump';
    
    try {
      const body = await request.json();
      if (body.roastText && typeof body.roastText === 'string' && body.roastText.length >= 10) {
        roastText = body.roastText;
      }
      if (body.target && ['trump', 'elon'].includes(body.target)) {
        target = body.target;
      }
    } catch {
      // If we can't parse the request, use defaults
    }
    
    // Generate fallback result with guaranteed valid damage
    const fallbackResult = generateFallbackResult(roastText, target);
    
    return NextResponse.json(fallbackResult);
  }
}
