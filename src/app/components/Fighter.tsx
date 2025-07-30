'use client';

import Image from 'next/image';
import { Fighter as FighterType } from '@/app/types/battle';

interface FighterProps {
  fighter: FighterType;
  facing: 'left' | 'right';
  isDefeated?: boolean;
  isAnimating?: boolean;
  className?: string;
}

export default function Fighter({ fighter, facing, isDefeated = false, isAnimating = false, className = '' }: FighterProps) {
  const basePath = `/assets/fighters/facing-${facing}`;
  const imageName = isDefeated ? `${fighter}-defeated.png` : `${fighter}.png`;
  const imagePath = `${basePath}/${imageName}`;
  
  const animationClasses = isAnimating 
    ? 'animate-pulse transform scale-105' 
    : 'hover:scale-105 transition-transform duration-200';
    
  const floatAnimation = !isDefeated && !isAnimating 
    ? 'animate-bounce' 
    : '';

  return (
    <div className={`relative ${animationClasses} ${floatAnimation} ${className}`}>
      <Image
        src={imagePath}
        alt={`${fighter} ${facing} ${isDefeated ? 'defeated' : ''}`}
        width={200}
        height={200}
        className="pixelated"
        priority
      />
    </div>
  );
}
