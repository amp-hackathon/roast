'use client';

import { useReducer, useEffect } from 'react';
import { BattleState, Fighter, Attack } from '@/app/types/battle';
import IntroScene from '@/app/components/IntroScene';
import BattleScene from '@/app/components/BattleScene';
import VictoryScreen from '@/app/components/VictoryScreen';
import { audioManager } from '@/app/utils/audioManager';

type BattleAction = 
  | { type: 'START_BATTLE' }
  | { type: 'ATTACK'; attack: Attack; effectiveness: number; finalDamage: number }
  | { type: 'VICTORY'; winner: Fighter }
  | { type: 'RESTART' };

// Initial state
const initialState: BattleState = {
  scene: 'intro',
  currentTurn: Math.random() > 0.5 ? 'trump' : 'elon', // 50-50 chance
  health: {
    trump: 100,
    elon: 100,
  },
  dialogueIndex: 0,
  isAnimating: false,
};

// Reducer for battle state management
function battleReducer(state: BattleState, action: BattleAction): BattleState {
  switch (action.type) {
    case 'START_BATTLE':
      return {
        ...state,
        scene: 'battle',
      };
      
    case 'ATTACK':
      const { attack, effectiveness, finalDamage } = action;
      const target = state.currentTurn === 'trump' ? 'elon' : 'trump';
      const newHealth = Math.max(0, state.health[target] - finalDamage);
      
      return {
        ...state,
        health: {
          ...state.health,
          [target]: newHealth,
        },
        currentTurn: state.currentTurn === 'trump' ? 'elon' : 'trump',
        lastAttack: {
          attacker: state.currentTurn,
          attack,
          effectiveness,
          finalDamage,
          message: effectiveness > 1 ? "It's super effective!" : effectiveness < 1 ? "It's not very effective..." : "It's effective!",
        },
      };
      
    case 'VICTORY':
      return {
        ...state,
        scene: 'victory',
        winner: action.winner,
      };
      
    case 'RESTART':
      return {
        ...initialState,
        currentTurn: Math.random() > 0.5 ? 'trump' : 'elon', // New random first turn
      };
      
    default:
      return state;
  }
}

export default function Home() {
  const [battleState, dispatch] = useReducer(battleReducer, initialState);
  
  // Handle audio based on scene changes
  useEffect(() => {
    if (battleState.scene === 'battle') {
      audioManager.startBattleMusic();
    } else if (battleState.scene === 'victory') {
      audioManager.stopBattleMusic();
      audioManager.playCheer();
    }
    
    return () => {
      // Cleanup audio when component unmounts
      if (battleState.scene === 'victory') {
        audioManager.cleanup();
      }
    };
  }, [battleState.scene]);
  
  const handleIntroComplete = () => {
    dispatch({ type: 'START_BATTLE' });
  };
  
  const handleAttack = (attack: Attack, effectiveness: number, finalDamage: number) => {
    dispatch({ type: 'ATTACK', attack, effectiveness, finalDamage });
  };
  
  const handleVictory = (winner: Fighter) => {
    dispatch({ type: 'VICTORY', winner });
  };
  
  const handleRestart = () => {
    audioManager.stopBattleMusic();
    dispatch({ type: 'RESTART' });
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {battleState.scene === 'intro' && (
        <IntroScene onComplete={handleIntroComplete} />
      )}
      
      {battleState.scene === 'battle' && (
        <BattleScene
          battleState={battleState}
          onAttack={handleAttack}
          onVictory={handleVictory}
        />
      )}
      
      {battleState.scene === 'victory' && battleState.winner && (
        <VictoryScreen
          winner={battleState.winner}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
