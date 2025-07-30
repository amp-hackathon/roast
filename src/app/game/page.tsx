'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CombatLogEntry {
  player: 'trump' | 'elon';
  message: string;
  damage: number;
  timestamp: number;
}

interface GameState {
  currentPlayer: 'trump' | 'elon';
  trumpHealth: number;
  elonHealth: number;
  gamePhase: 'battle' | 'gameover';
  combatLog: CombatLogEntry[];
  winner: 'trump' | 'elon' | null;
  turnCount: number;
}

const INITIAL_HEALTH = 0;
const MAX_DAMAGE = 100;

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: Math.random() < 0.5 ? 'trump' : 'elon',
    trumpHealth: INITIAL_HEALTH,
    elonHealth: INITIAL_HEALTH,
    gamePhase: 'battle',
    combatLog: [],
    winner: null,
    turnCount: 0
  });

  const [roastText, setRoastText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitRoast = async () => {
    if (gameState.gamePhase === 'gameover' || !roastText.trim() || roastText.length < 10) return;
    
    setIsSubmitting(true);
    
    try {
      const attackingPlayer = gameState.currentPlayer;
      const defendingPlayer = attackingPlayer === 'trump' ? 'elon' : 'trump';
      
      const response = await fetch('/api/roast-grader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          roastText: roastText.trim(), 
          target: defendingPlayer 
        })
      });
      
      const result = await response.json();
      const damage = result.finalDamage || (25 + Math.floor(Math.random() * 20));
      
      performAttackWithDamage(attackingPlayer, defendingPlayer, roastText, damage);
      setRoastText('');
    } catch {
      const attackingPlayer = gameState.currentPlayer;
      const defendingPlayer = attackingPlayer === 'trump' ? 'elon' : 'trump';
      const damage = 25 + Math.floor(Math.random() * 20);
      performAttackWithDamage(attackingPlayer, defendingPlayer, roastText, damage);
      setRoastText('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const performAttackWithDamage = (attackingPlayer: 'trump' | 'elon', defendingPlayer: 'trump' | 'elon', message: string, damage: number) => {
    setGameState(prevState => {
      const newDefenderHealth = defendingPlayer === 'trump' 
        ? prevState.trumpHealth + damage
        : prevState.elonHealth + damage;

      const logEntry: CombatLogEntry = {
        player: attackingPlayer,
        message: message,
        damage,
        timestamp: Date.now()
      };

      const winner = newDefenderHealth >= MAX_DAMAGE ? attackingPlayer : null;
      const gamePhase = winner ? 'gameover' : 'battle';

      return {
        ...prevState,
        currentPlayer: gamePhase === 'battle' 
          ? (attackingPlayer === 'trump' ? 'elon' : 'trump')
          : prevState.currentPlayer,
        trumpHealth: defendingPlayer === 'trump' ? newDefenderHealth : prevState.trumpHealth,
        elonHealth: defendingPlayer === 'elon' ? newDefenderHealth : prevState.elonHealth,
        combatLog: [logEntry, ...prevState.combatLog],
        winner,
        gamePhase,
        turnCount: prevState.turnCount + 1
      };
    });
  };

  const resetGame = () => {
    setGameState({
      currentPlayer: Math.random() < 0.5 ? 'trump' : 'elon',
      trumpHealth: INITIAL_HEALTH,
      elonHealth: INITIAL_HEALTH,
      gamePhase: 'battle',
      combatLog: [],
      winner: null,
      turnCount: 0
    });
  };

  const getHealthBarColor = (health: number): string => {
    if (health < 33) return 'bg-green-500';
    if (health < 66) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen relative" style={{backgroundImage: 'url(/scenes/america.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="min-h-screen bg-black/50 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            🔥 ROAST BATTLE ROYALE 🔥
          </h1>
          
          {/* Battle Arena */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 min-h-96">
            {/* Trump Side */}
            <div className={`flex flex-col items-center justify-center ${gameState.currentPlayer === 'trump' && gameState.gamePhase === 'battle' ? 'ring-4 ring-yellow-400 rounded-lg' : ''}`}>
              <div className="relative mb-4">
                <Image 
                  src={gameState.trumpHealth >= 100 ? "/fighters/facing-left/trump-defeated.png" : "/fighters/facing-left/trump.png"}
                  alt="Trump"
                  width={200}
                  height={200}
                  className="pixelated"
                />
              </div>
              <div className="bg-red-800/80 rounded-lg p-4 w-full">
                <h2 className="text-xl font-bold text-white mb-2 text-center">🍊 TRUMP</h2>
                <div className="mb-2">
                  <div className="flex justify-between text-white text-sm mb-1">
                    <span>Diddy Points</span>
                    <span>{gameState.trumpHealth}/100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${getHealthBarColor(gameState.trumpHealth)}`}
                      style={{ width: `${gameState.trumpHealth}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* VS Center */}
            <div className="flex items-center justify-center">
              <div className="text-6xl font-bold text-white text-center bg-black/70 rounded-full w-24 h-24 flex items-center justify-center">
                VS
              </div>
            </div>

            {/* Elon Side */}
            <div className={`flex flex-col items-center justify-center ${gameState.currentPlayer === 'elon' && gameState.gamePhase === 'battle' ? 'ring-4 ring-yellow-400 rounded-lg' : ''}`}>
              <div className="relative mb-4">
                <Image 
                  src={gameState.elonHealth >= 100 ? "/fighters/facing-right/elon-defeated.png" : "/fighters/facing-right/elon.png"}
                  alt="Elon"
                  width={200}
                  height={200}
                  className="pixelated"
                />
              </div>
              <div className="bg-gray-800/80 rounded-lg p-4 w-full">
                <h2 className="text-xl font-bold text-white mb-2 text-center">🚀 ELON</h2>
                <div className="mb-2">
                  <div className="flex justify-between text-white text-sm mb-1">
                    <span>Diddy Points</span>
                    <span>{gameState.elonHealth}/100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${getHealthBarColor(gameState.elonHealth)}`}
                      style={{ width: `${gameState.elonHealth}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Roast Input Section */}
          {gameState.gamePhase === 'battle' && (
            <div className="bg-black/50 rounded-lg p-6 mb-8 text-white">
              <p className="text-xl mb-4 text-center">
                Turn {gameState.turnCount + 1}: {gameState.currentPlayer === 'trump' ? '🍊 TRUMP' : '🚀 ELON'}&apos;s turn to roast!
              </p>
              <div className="space-y-4">
                <textarea
                  value={roastText}
                  onChange={(e) => setRoastText(e.target.value)}
                  placeholder={`Enter your roast as ${gameState.currentPlayer === 'trump' ? 'Trump' : 'Elon'}... (minimum 10 characters)`}
                  className="w-full h-32 p-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-yellow-400 focus:outline-none resize-none"
                  disabled={isSubmitting}
                />
                <div className="text-center">
                  <button
                    onClick={submitRoast}
                    disabled={isSubmitting || roastText.length < 10}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors"
                  >
                    {isSubmitting ? '🤖 Processing...' : '🔥 DELIVER ROAST 🔥'}
                  </button>
                  <p className="text-sm text-gray-400 mt-2">
                    Characters: {roastText.length}/10 minimum
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Game Over */}
          {gameState.gamePhase === 'gameover' && (
            <div className="bg-black/50 rounded-lg p-6 mb-8 text-white text-center">
              <div>
                <p className="text-3xl mb-4">
                  🏆 {gameState.winner === 'trump' ? '🍊 TRUMP' : '🚀 ELON'} WINS! 🏆
                </p>
                <p className="text-lg mb-4">
                  The roast battle is over after {gameState.turnCount} devastating turns!
                </p>
                <button
                  onClick={resetGame}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors"
                >
                  🔄 NEW BATTLE
                </button>
              </div>
            </div>
          )}

          {/* Combat Log */}
          <div className="bg-black/30 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-4">🗯️ Combat Log</h3>
            <div className="max-h-96 overflow-y-auto space-y-3">
              {gameState.combatLog.length === 0 ? (
                <p className="text-gray-400 italic">No roasts yet... who will throw the first burn? 🔥</p>
              ) : (
                gameState.combatLog.map((entry) => (
                  <div 
                    key={entry.timestamp}
                    className={`p-3 rounded-lg ${entry.player === 'trump' ? 'bg-red-900/50' : 'bg-gray-700/50'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-white">
                        {entry.player === 'trump' ? '🍊 TRUMP' : '🚀 ELON'}
                      </span>
                      <span className="text-red-400 font-bold">-{entry.damage} 🔥</span>
                    </div>
                    <p className="text-gray-200 italic">&quot;{entry.message}&quot;</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
