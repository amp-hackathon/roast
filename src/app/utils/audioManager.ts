class AudioManager {
  private backgroundMusic: HTMLAudioElement | null = null;
  private soundEffects: { [key: string]: HTMLAudioElement } = {};

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeAudio();
    }
  }

  private initializeAudio() {
    // Initialize background music
    this.backgroundMusic = new Audio('/assets/music/Punchlines_and_Uppercuts.mp3');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3; // Lower volume for background music

    // Initialize sound effects
    this.soundEffects.cheer = new Audio('/assets/sound_effects/crowd_cheer.mp3');
    this.soundEffects.boo = new Audio('/assets/sound_effects/crowd_boo.mp3');
    this.soundEffects.oooooh = new Audio('/assets/sound_effects/oooooh.mp3');

    // Set volume for sound effects
    Object.values(this.soundEffects).forEach(audio => {
      audio.volume = 0.6;
    });
  }

  startBattleMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.currentTime = 0;
      this.backgroundMusic.play().catch(console.error);
    }
  }

  stopBattleMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }

  playCheer() {
    this.playSound('cheer');
  }

  playBoo() {
    this.playSound('boo');
  }

  playOoooh() {
    this.playSound('oooooh');
  }

  private playSound(soundName: string) {
    const sound = this.soundEffects[soundName];
    if (sound) {
      sound.currentTime = 0; // Reset to beginning
      sound.play().catch(console.error);
    }
  }

  // Clean up audio resources
  cleanup() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic = null;
    }
    Object.values(this.soundEffects).forEach(audio => {
      audio.pause();
    });
    this.soundEffects = {};
  }
}

// Create a singleton instance
export const audioManager = new AudioManager();
