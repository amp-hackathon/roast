'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BattleState, Fighter as FighterType, Attack } from '@/app/types/battle';
import { ATTACKS_BY_FIGHTER } from '@/app/data/attacks';
import { TYPE_EFFECTIVENESS } from '@/app/types/battle';
import Fighter from './Fighter';
import HealthBar from './HealthBar';
import AttackMenu from './AttackMenu';
import AttackAnimation from './AttackAnimation';
import { audioManager } from '@/app/utils/audioManager';

interface BattleSceneProps {
  battleState: BattleState;
  onAttack: (attack: Attack, effectiveness: number, finalDamage: number) => void;
  onVictory: (winner: FighterType) => void;
}

export default function BattleScene({ battleState, onAttack, onVictory }: BattleSceneProps) {
  const [selectedAttack, setSelectedAttack] = useState<Attack | null>(null);
  const [isAttacking, setIsAttacking] = useState(false);
  
  const currentFighter = battleState.currentTurn;
  const availableAttacks = ATTACKS_BY_FIGHTER[currentFighter];
  
  const handleAttackSelect = async (attack: Attack) => {
    if (isAttacking) return;
    
    setSelectedAttack(attack);
    setIsAttacking(true);
    
    // Calculate damage
    const target = currentFighter === 'trump' ? 'elon' : 'trump';
    const effectiveness = TYPE_EFFECTIVENESS[target][attack.type];
    const finalDamage = Math.round(attack.baseDamage * effectiveness);
    
    // Wait for attack animation
    setTimeout(() => {
      // Play sound effect based on effectiveness
      if (effectiveness > 1) {
        audioManager.playCheer(); // Super effective
      } else if (effectiveness < 1) {
        audioManager.playBoo(); // Not very effective
      } else {
        audioManager.playOoooh(); // Normal effectiveness
      }
      
      onAttack(attack, effectiveness, finalDamage);
      
      // Check for victory
      const newHealth = battleState.health[target] - finalDamage;
      if (newHealth <= 0) {
        setTimeout(() => onVictory(currentFighter), 1000);
      }
      
      setIsAttacking(false);
      setSelectedAttack(null);
    }, 2000);
  };
  
  const getEffectivenessMessage = (effectiveness: number): string => {
    if (effectiveness > 1) return "It's super effective!";
    if (effectiveness < 1) return "It's not very effective...";
    return "It's effective!";
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <Image
        src="/assets/scenes/background-america.png"
        alt="Battle Arena"
        fill
        className="object-cover pixelated"
        priority
      />
      
      {/* Health Bars */}
      <HealthBar 
        fighter="trump"
        currentHealth={battleState.health.trump}
        maxHealth={100}
        position="top-left"
      />
      <HealthBar 
        fighter="elon"
        currentHealth={battleState.health.elon}
        maxHealth={100}
        position="bottom-right"
      />
      
      {/* Fighters */}
      <div className="absolute top-16 right-16">
        <Fighter 
          fighter="trump"
          facing="left"
          isDefeated={battleState.health.trump <= 0}
          isAnimating={isAttacking && currentFighter === 'trump'}
        />
      </div>
      
      <div className="absolute bottom-16 left-16">
        <Fighter 
          fighter="elon"
          facing="right"
          isDefeated={battleState.health.elon <= 0}
          isAnimating={isAttacking && currentFighter === 'elon'}
        />
      </div>
      
      {/* Attack Animation */}
      {selectedAttack && (
        <AttackAnimation
          attack={selectedAttack}
          target={currentFighter === 'trump' ? 'elon' : 'trump'}
          onComplete={() => {}}
        />
      )}
      
      {/* Battle UI */}
      {!isAttacking && !battleState.winner && (
        <AttackMenu
          fighter={currentFighter}
          attacks={availableAttacks}
          onAttackSelect={handleAttackSelect}
        />
      )}
      
      {/* Last Attack Result */}
      {battleState.lastAttack && !isAttacking && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 border-2 border-black rounded-lg p-4">
          <p className="font-bold text-lg text-center text-black">
            {getEffectivenessMessage(battleState.lastAttack.effectiveness)}
          </p>
          <p className="text-center text-black">
            {battleState.lastAttack.finalDamage} damage!
          </p>
        </div>
      )}
    </div>
  );
}
