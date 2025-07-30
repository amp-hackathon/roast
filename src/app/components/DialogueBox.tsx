'use client';

import { DialogueLine } from '@/app/types/battle';

interface DialogueBoxProps {
  dialogue: DialogueLine;
  onNext: () => void;
  isLastDialogue: boolean;
}

export default function DialogueBox({ dialogue, onNext, isLastDialogue }: DialogueBoxProps) {
  const speakerName = dialogue.speaker === 'trump' ? 'Donald Trump' : 'Elon Musk';
  
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-4xl">
      <div className="bg-white/95 border-4 border-black rounded-lg p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg text-black">{speakerName}</h3>
          <span className="text-sm text-gray-800">{dialogue.date}</span>
        </div>
        
        <p className="text-base leading-relaxed mb-4 text-black">
          {dialogue.text}
        </p>
        
        <div className="flex justify-end">
          <button 
            onClick={onNext}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold transition-colors"
          >
            {isLastDialogue ? 'Start Battle!' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
