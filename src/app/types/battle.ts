export type RoastType = 'fire' | 'water' | 'electric' | 'psychic' | 'dark' | 'normal' | 'flying' | 'ground';

export type Fighter = 'trump' | 'elon';

export type GameScene = 'intro' | 'battle' | 'victory';

export interface Attack {
  id: string;
  name: string;
  roastText: string;
  type: RoastType;
  baseDamage: number;
}

export interface BattleState {
  scene: GameScene;
  currentTurn: Fighter;
  health: {
    trump: number;
    elon: number;
  };
  dialogueIndex: number;
  isAnimating: boolean;
  winner?: Fighter;
  lastAttack?: {
    attacker: Fighter;
    attack: Attack;
    effectiveness: number;
    finalDamage: number;
    message: string;
  };
}

export interface DialogueLine {
  speaker: Fighter;
  text: string;
  date: string;
}

// Type effectiveness chart
export const TYPE_EFFECTIVENESS: Record<Fighter, Record<RoastType, number>> = {
  trump: {
    fire: 0.8,      // Resists aggressive attacks
    water: 1.2,     // Weak to intellectual roasts
    electric: 1.0,
    psychic: 1.2,   // Weak to intellectual roasts  
    dark: 0.8,      // Resists brutal attacks
    normal: 1.0,
    flying: 1.0,
    ground: 1.0,
  },
  elon: {
    fire: 1.0,
    water: 1.0,
    electric: 0.8,  // Resists tech roasts
    psychic: 1.0,
    dark: 1.0,
    normal: 1.2,    // Weak to everyday person perspective
    flying: 0.8,    // Resists aspiration roasts
    ground: 1.2,    // Weak to down-to-earth burns
  },
};
