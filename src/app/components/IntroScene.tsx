'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { INTRO_DIALOGUE } from '@/app/data/dialogue';
import Fighter from './Fighter';
import DialogueBox from './DialogueBox';

interface IntroSceneProps {
  onComplete: () => void;
}

export default function IntroScene({ onComplete }: IntroSceneProps) {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [animationOffset, setAnimationOffset] = useState(0);
  
  // Simple side-to-side animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationOffset(prev => (prev + 1) % 60); // 60 frame cycle
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleNext = () => {
    if (currentDialogue < INTRO_DIALOGUE.length - 1) {
      setCurrentDialogue(currentDialogue + 1);
    } else {
      onComplete();
    }
  };
  
  const animationStyle = {
    transform: `translateX(${Math.sin(animationOffset * 0.1) * 5}px)`,
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <Image
        src="/assets/scenes/background-intro.png"
        alt="Intro Scene"
        fill
        className="object-cover pixelated"
        priority
      />
      
      {/* Fighters with gentle animation */}
      <div 
        className="absolute top-16 right-16"
        style={animationStyle}
      >
        <Fighter 
          fighter="trump"
          facing="left"
          isAnimating={INTRO_DIALOGUE[currentDialogue]?.speaker === 'trump'}
        />
      </div>
      
      <div 
        className="absolute bottom-16 left-16"
        style={{
          transform: `translateX(${Math.sin((animationOffset + 30) * 0.1) * 5}px)`,
        }}
      >
        <Fighter 
          fighter="elon"
          facing="right"
          isAnimating={INTRO_DIALOGUE[currentDialogue]?.speaker === 'elon'}
        />
      </div>
      
      {/* Dialogue */}
      <DialogueBox
        dialogue={INTRO_DIALOGUE[currentDialogue]}
        onNext={handleNext}
        isLastDialogue={currentDialogue === INTRO_DIALOGUE.length - 1}
      />
      
      {/* Progress indicator */}
      <div className="absolute top-4 right-4 bg-white/80 rounded-lg px-3 py-1">
        <span className="text-sm font-mono text-gray-900">
          {currentDialogue + 1} / {INTRO_DIALOGUE.length}
        </span>
      </div>
    </div>
  );
}
