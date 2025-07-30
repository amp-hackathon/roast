'use client';

import { Fighter } from '@/app/types/battle';

interface VictoryScreenProps {
  winner: Fighter;
  onRestart: () => void;
}

export default function VictoryScreen({ winner, onRestart }: VictoryScreenProps) {
  const winnerName = winner === 'trump' ? 'TRUMP' : 'ELON';
  
  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="bg-white border-8 border-yellow-400 rounded-3xl p-12 shadow-2xl">
          <div className="text-6xl font-bold text-yellow-600 mb-4 animate-pulse">
            🏆
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            {winnerName} WINS!
          </h1>
          
          <h2 className="text-2xl text-gray-600 mb-8">
            The Ultimate King of Pettiness!
          </h2>
          
          <div className="space-y-4">
            <div className="text-lg text-gray-700">
              {winner === 'trump' 
                ? "The Art of the Deal strikes again!" 
                : "Innovation and chaos triumph!"}
            </div>
            
            <button
              onClick={onRestart}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-xl transition-colors"
            >
              Battle Again
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-white text-center">
          <p className="text-sm opacity-80">
            Press any key or click to restart
          </p>
        </div>
      </div>
    </div>
  );
}
