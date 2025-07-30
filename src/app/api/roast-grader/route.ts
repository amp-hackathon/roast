import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type RoastType = 'Fire' | 'Water' | 'Electric' | 'Psychic' | 'Dark' | 'Normal' | 'Flying' | 'Ground';

export interface RoastResult {
  roastText: string;
  target: 'trump' | 'elon';
  type: RoastType;
  baseDamage: number;
  typeEffectiveness: number;
  finalDamage: number;
  explanation: string;
}

const TARGET_WEAKNESSES = {
  trump: {
    weakTo: ['Psychic', 'Water'] as RoastType[],
    resistsTo: ['Fire', 'Dark'] as RoastType[]
  },
  elon: {
    weakTo: ['Ground', 'Normal'] as RoastType[],
    resistsTo: ['Electric', 'Flying'] as RoastType[]
  }
};

function calculateTypeEffectiveness(roastType: RoastType, target: 'trump' | 'elon'): number {
  const targetProfile = TARGET_WEAKNESSES[target];
  
  if (targetProfile.weakTo.includes(roastType)) {
    return 1.5; // Super effective
  } else if (targetProfile.resistsTo.includes(roastType)) {
    return 0.75; // Not very effective  
  } else {
    return 1.0; // Normal effectiveness
  }
}

function getEffectivenessMessage(effectiveness: number): string {
  if (effectiveness > 1) {
    return "It's super effective!";
  } else if (effectiveness < 1) {
    return "It's not very effective...";
  } else {
    return "It's normally effective.";
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Roast Grader API is running' });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roastText, target } = body;

    if (!roastText || !target) {
      return NextResponse.json(
        { error: 'Missing roastText or target' },
        { status: 400 }
      );
    }

    if (!['trump', 'elon'].includes(target)) {
      return NextResponse.json(
        { error: 'Target must be either "trump" or "elon"' },
        { status: 400 }
      );
    }

    // For testing without OpenAI API key, use a mock response
    let aiResult;
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
      // Mock AI response for testing
      const mockTypes: RoastType[] = ['Fire', 'Water', 'Electric', 'Psychic', 'Dark', 'Normal', 'Flying', 'Ground'];
      const randomType = mockTypes[Math.floor(Math.random() * mockTypes.length)];
      const randomDamage = Math.floor(Math.random() * 21) + 25; // 25-45
      
      aiResult = {
        type: randomType,
        baseDamage: randomDamage,
        reasoning: `Mock analysis: This roast appears to be a ${randomType.toLowerCase()} type attack with moderate effectiveness.`
      };
    } else {
      // Real AI implementation
      const aiPrompt = `
Analyze this roast targeting ${target === 'trump' ? 'Donald Trump' : 'Elon Musk'}: "${roastText}"

Classify it into ONE of these Pokemon-inspired types:
- Fire: Aggressive, direct burns
- Water: Smooth, flowing, sophisticated takedowns  
- Electric: Quick, shocking zingers and one-liners
- Psychic: Intellectual, IQ-based, educational background attacks
- Dark: Brutal, personal character assassination
- Normal: Standard, everyday roasts and generic insults
- Flying: High-level, aspirational, career/status-based roasts
- Ground: Down-to-earth, relatable burns from common person perspective

Also score the roast quality with base damage from 25-45 based on:
- Creativity and wit (25-35)
- Cultural relevance and timing (35-40) 
- Audience connection bonus (+5-10 for "average American" experiences)
- "Obvious truth" amplification (+3-8 for widely-recognized patterns)
- Punching up vs bullying modifier (+/-5)

Respond in this exact JSON format:
{
  "type": "[TYPE]",
  "baseDamage": [NUMBER],
  "reasoning": "[Brief explanation of type choice and damage score]"
}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system", 
            content: "You are a roast battle judge with expertise in Pokemon-style combat mechanics. Analyze roasts objectively and return only valid JSON."
          },
          {
            role: "user",
            content: aiPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 300
      });

      const aiResponse = completion.choices[0].message.content;
      
      if (!aiResponse) {
        throw new Error('No response from AI');
      }

      try {
        aiResult = JSON.parse(aiResponse);
      } catch (parseError) {
        throw new Error('Invalid JSON response from AI');
      }
    }

    const roastType: RoastType = aiResult.type;
    const baseDamage = Math.max(25, Math.min(45, aiResult.baseDamage));
    const typeEffectiveness = calculateTypeEffectiveness(roastType, target);
    const finalDamage = Math.round(baseDamage * typeEffectiveness);
    
    const explanation = `${aiResult.reasoning} ${getEffectivenessMessage(typeEffectiveness)}`;

    const result: RoastResult = {
      roastText,
      target,
      type: roastType,
      baseDamage,
      typeEffectiveness,
      finalDamage,
      explanation
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Roast grader error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
