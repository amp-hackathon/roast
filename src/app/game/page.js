'use client';

import { useState, useEffect } from 'react';
import './game.css';

export default function Game() {
  const [currentPlayer, setCurrentPlayer] = useState('trump');
  const [trumpPoints, setTrumpPoints] = useState(0);
  const [elonPoints, setElonPoints] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');
  const [winner, setWinner] = useState(null);
  const [roastText, setRoastText] = useState('');
  const [lastRoastType, setLastRoastType] = useState(null);
  const [lastDamage, setLastDamage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastAttackExplanation, setLastAttackExplanation] = useState('');
  const [backgroundMusic, setBackgroundMusic] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const roastTypes = ['fire', 'electric', 'psychic', 'dark', 'steel', 'flying', 'water', 'grass', 'ground', 'normal'];

  // Initialize background music
  useEffect(() => {
    const music = new Audio('/assets/music/Punchlines_and_Uppercuts.mp3');
    music.loop = true;
    music.volume = 0.3; // Set to 30% volume
    setBackgroundMusic(music);

    // Start playing music automatically
    const startMusic = async () => {
      try {
        await music.play();
        setMusicPlaying(true);
      } catch (e) {
        console.log('Autoplay blocked, user must click to start music');
      }
    };

    startMusic();

    // Cleanup on unmount
    return () => {
      if (music) {
        music.pause();
        music.currentTime = 0;
      }
    };
  }, []);

  // Toggle background music
  const toggleMusic = () => {
    if (backgroundMusic) {
      if (musicPlaying) {
        backgroundMusic.pause();
        setMusicPlaying(false);
      } else {
        backgroundMusic.play().then(() => {
          setMusicPlaying(true);
        }).catch(e => console.log('Music play failed:', e));
      }
    }
  };

  // Sound effects
  const playSound = (soundFile) => {
    try {
      const audio = new Audio(`/assets/sound_effects/${soundFile}`);
      audio.volume = 0.3; // Lower volume for better UX
      audio.play().catch(e => console.log('Sound play failed:', e));
    } catch (e) {
      console.log('Sound loading failed:', e);
    }
  };

  const handleRoastSubmit = async (e) => {
    e.preventDefault();
    
    if (!roastText.trim() || gameStatus === 'gameover' || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Determine target (opponent)
      const target = currentPlayer === 'trump' ? 'elon' : 'trump';
      
      // Call the real roast grader API
      const response = await fetch('/api/roast-grader', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roastText: roastText.trim(),
          target
        })
      });

      let damage, roastType, explanation;

      if (response.ok) {
        const result = await response.json();
        damage = result.finalDamage;
        roastType = result.type.toLowerCase();
        explanation = result.explanation;
      } else {
        // Fallback to mock system if API fails
        console.warn('Roast grader API failed, using fallback');
        damage = Math.floor(Math.random() * 50) + 1;
        roastType = roastTypes[Math.floor(Math.random() * roastTypes.length)];
        explanation = 'API unavailable - using fallback damage calculation';
      }
      
      setLastDamage(damage);
      setLastRoastType(roastType);
      setLastAttackExplanation(explanation);
      
      // Play sound effect based on damage
      if (damage > 35) {
        playSound('crowd_cheer.mp3');
      } else if (damage < 20) {
        playSound('crowd_boo.mp3');
      } else {
        playSound('oooooh.mp3');
      }
      
      // Apply damage to the opponent
      if (currentPlayer === 'trump') {
        const newElonPoints = elonPoints + damage;
        setElonPoints(newElonPoints);
        
        // Check win condition
        if (newElonPoints >= 100) {
          setGameStatus('gameover');
          setWinner('trump');
          playSound('crowd_cheer.mp3'); // Victory sound
          setIsSubmitting(false);
          return;
        }
        
        setCurrentPlayer('elon');
      } else {
        const newTrumpPoints = trumpPoints + damage;
        setTrumpPoints(newTrumpPoints);
        
        // Check win condition
        if (newTrumpPoints >= 100) {
          setGameStatus('gameover');
          setWinner('elon');
          playSound('crowd_cheer.mp3'); // Victory sound
          setIsSubmitting(false);
          return;
        }
        
        setCurrentPlayer('trump');
      }
      
      setRoastText('');
    } catch (error) {
      console.error('Error submitting roast:', error);
      // Fallback to mock system on error
      const damage = Math.floor(Math.random() * 50) + 1;
      const randomType = roastTypes[Math.floor(Math.random() * roastTypes.length)];
      
      setLastDamage(damage);
      setLastRoastType(randomType);
      setLastAttackExplanation('Network error - using fallback damage calculation');
      
      // Play sound effect based on damage
      if (damage > 35) {
        playSound('crowd_cheer.mp3');
      } else if (damage < 20) {
        playSound('crowd_boo.mp3');
      } else {
        playSound('oooooh.mp3');
      }
      
      // Apply fallback damage logic
      if (currentPlayer === 'trump') {
        const newElonPoints = elonPoints + damage;
        setElonPoints(newElonPoints);
        if (newElonPoints >= 100) {
          setGameStatus('gameover');
          setWinner('trump');
          playSound('crowd_cheer.mp3'); // Victory sound
          setIsSubmitting(false);
          return;
        }
        setCurrentPlayer('elon');
      } else {
        const newTrumpPoints = trumpPoints + damage;
        setTrumpPoints(newTrumpPoints);
        if (newTrumpPoints >= 100) {
          setGameStatus('gameover');
          setWinner('elon');
          playSound('crowd_cheer.mp3'); // Victory sound
          setIsSubmitting(false);
          return;
        }
        setCurrentPlayer('trump');
      }
      
      setRoastText('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetGame = () => {
    setCurrentPlayer('trump');
    setTrumpPoints(0);
    setElonPoints(0);
    setGameStatus('playing');
    setWinner(null);
    setRoastText('');
    setLastRoastType(null);
    setLastDamage(0);
    setLastAttackExplanation('');
    setIsSubmitting(false);
  };

  return (
    <div className="game-container">
      {/* Music Control Button */}
      <button 
        onClick={toggleMusic}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          background: 'rgba(0, 0, 0, 0.7)',
          color: '#fff',
          border: '2px solid #FFD700',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          fontSize: '1.2rem'
        }}
        title={musicPlaying ? 'Mute Music' : 'Play Music'}
      >
        {musicPlaying ? '🔊' : '🔇'}
      </button>

      <div className="battle-scene">
        {/* Background */}
        <div className="background"></div>
        
        {/* Battle Arena */}
        <div className="battle-arena">
          {/* Trump Fighter */}
          <div className="fighter-container left">
            <div className="fighter-sprite">
              <img 
                src={`/assets/fighters/facing-right/trump${trumpPoints >= 100 ? '-defeated' : ''}.png`}
                alt="Trump"
                className="fighter-image"
              />
            </div>
            <div className="fighter-info">
              <div className="fighter-name">TRUMP</div>
              <div className="health-bar">
                <div className="health-bar-bg">
                  <div className="health-bar-fill" style={{width: `${Math.max(0, 100 - trumpPoints)}%`}}></div>
                </div>
                <div className="health-points">{Math.max(0, 100 - trumpPoints)}/100</div>
              </div>
              <div className="diddy-points">Diddy Points: {trumpPoints}</div>
            </div>
          </div>

          {/* VS Indicator */}
          <div className="vs-indicator">
            <div className="vs-text">VS</div>
            {lastRoastType && (
              <div className="last-attack">
                <img src={`/assets/types/${lastRoastType}.png`} alt={lastRoastType} className="type-icon" />
                <div className="damage-number">-{lastDamage}</div>
              </div>
            )}
            {lastAttackExplanation && (
              <div style={{
                background: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #FFD700',
                marginTop: '0.5rem',
                fontSize: '0.8rem',
                maxWidth: '300px',
                textAlign: 'center'
              }}>
                {lastAttackExplanation}
              </div>
            )}
          </div>

          {/* Elon Fighter */}
          <div className="fighter-container right">
            <div className="fighter-sprite">
              <img 
                src={`/assets/fighters/facing-left/elon${elonPoints >= 100 ? '-defeated' : ''}.png`}
                alt="Elon"
                className="fighter-image"
              />
            </div>
            <div className="fighter-info">
              <div className="fighter-name">ELON</div>
              <div className="health-bar">
                <div className="health-bar-bg">
                  <div className="health-bar-fill" style={{width: `${Math.max(0, 100 - elonPoints)}%`}}></div>
                </div>
                <div className="health-points">{Math.max(0, 100 - elonPoints)}/100</div>
              </div>
              <div className="diddy-points">Diddy Points: {elonPoints}</div>
            </div>
          </div>
        </div>

        {/* Game Interface */}
        <div className="game-interface">
          {gameStatus === 'playing' ? (
            <div className="battle-ui">
              <div className="current-player">
                <div className={`player-indicator ${currentPlayer}`}>
                  {currentPlayer === 'trump' ? "TRUMP'S TURN" : "ELON'S TURN"}
                </div>
              </div>
              
              <form onSubmit={handleRoastSubmit} className="roast-form" style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem',
                alignItems: 'stretch',
                width: '100%'
              }}>
                <div className="roast-input-container" style={{ flex: 1 }}>
                  <input
                    type="text"
                    value={roastText}
                    onChange={(e) => setRoastText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (roastText.trim() && !isSubmitting) {
                          handleRoastSubmit(e);
                        }
                      }
                    }}
                    placeholder={`Enter ${currentPlayer === 'trump' ? 'Trump' : 'Elon'}'s roast...`}
                    className="roast-input"
                    style={{
                      height: '50px',
                      padding: '0.5rem',
                      fontSize: '1rem'
                    }}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={!roastText.trim() || isSubmitting} 
                  className="roast-button"
                  style={{
                    height: '50px',
                    whiteSpace: 'nowrap',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    minWidth: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {isSubmitting ? '⏳ ANALYZING...' : '🔥 ROAST! 🔥'}
                </button>
              </form>
            </div>
          ) : (
            <div className="game-over">
              <div className="winner-announcement">
                <h2>BATTLE COMPLETE!</h2>
                <h3>WINNER: {winner === 'trump' ? 'TRUMP' : 'ELON'}</h3>
                <p>{winner === 'trump' ? 'Elon' : 'Trump'} slipped in baby oil!</p>
                <button onClick={resetGame} className="play-again-button">
                  🎮 PLAY AGAIN 🎮
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
