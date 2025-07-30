'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Attack, Fighter } from '@/app/types/battle';

interface AttackAnimationProps {
  attack: Attack;
  target: Fighter;
  onComplete: () => void;
}

export default function AttackAnimation({ attack, target, onComplete }: AttackAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (animationPhase < 2) {
        setAnimationPhase(animationPhase + 1);
      } else {
        onComplete();
      }
    }, 200);
    
    return () => clearTimeout(timer);
  }, [animationPhase, onComplete]);
  
  // Position the animation over the target
  const targetPosition = target === 'trump' 
    ? 'top-16 right-16' 
    : 'bottom-16 left-16';
    
  const sprites = Array.from({ length: 3 }, (_, i) => (
    <div
      key={i}
      className={`absolute transition-all duration-200 ${
        animationPhase >= i ? 'opacity-100 scale-150' : 'opacity-0 scale-100'
      }`}
      style={{
        left: `${i * 30}px`,
        top: `${i * 20}px`,
        animationDelay: `${i * 100}ms`,
      }}
    >
      <Image
        src={`/assets/types/${attack.type}.png`}
        alt={`${attack.type} attack`}
        width={60}
        height={60}
        className="pixelated animate-spin"
      />
    </div>
  ));

  return (
    <div className={`absolute ${targetPosition} pointer-events-none z-20`}>
      <div className="relative">
        {sprites}
      </div>
    </div>
  );
}
