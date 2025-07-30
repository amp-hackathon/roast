'use client';

import { Fighter } from '@/app/types/battle';

interface HealthBarProps {
  fighter: Fighter;
  currentHealth: number;
  maxHealth: number;
  position: 'top-left' | 'bottom-right';
}

export default function HealthBar({ fighter, currentHealth, maxHealth, position }: HealthBarProps) {
  const healthPercentage = Math.max(0, (currentHealth / maxHealth) * 100);
  const name = fighter === 'trump' ? 'TRUMP' : 'ELON';
  
  const getHealthColor = () => {
    if (healthPercentage > 50) return 'bg-green-500';
    if (healthPercentage > 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const positionClasses = position === 'top-left' 
    ? 'top-4 left-4' 
    : 'bottom-4 right-4';

  return (
    <div className={`absolute ${positionClasses} bg-white/90 border-2 border-black rounded-lg p-3 min-w-48`}>
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold text-sm">{name}</span>
        <span className="text-xs font-mono">Lv.50</span>
      </div>
      
      <div className="mb-2">
        <div className="bg-gray-300 h-2 rounded-full border border-black">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${getHealthColor()}`}
            style={{ width: `${healthPercentage}%` }}
          />
        </div>
      </div>
      
      <div className="flex justify-between text-xs font-mono">
        <span>HP</span>
        <span>{Math.max(0, Math.round(currentHealth))} / {maxHealth}</span>
      </div>
      
      <div className="text-xs text-gray-600 mt-1">
        Diddy Points
      </div>
    </div>
  );
}
