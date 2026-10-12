/**
 * Romantic Wedding Background Music & Tactile Sound FX Generator
 * Uses Web Audio API to create warm acoustic harp & piano notes,
 * gentle paper rustles, scratch swooshes, and celebration chimes.
 */

class RomanticAudioManager {
  private ctx: AudioContext | null = null;
  private isPlayingMusic = false;
  private musicInterval: number | null = null;
  private step = 0;
  private gainNode: GainNode | null = null;
  private volume = 0.35;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Harmonic romantic progression in D Major (D - A - Bm - F#m - G - D - G - A)
  // Canon in D / Dolce Vita Mediterranean theme
  private melodyNotes: number[][] = [
    [293.66, 440.0, 587.33, 739.99], // D maj arpeggio
    [220.0, 329.63, 440.0, 659.25],  // A maj
    [246.94, 369.99, 493.88, 739.99], // B min
    [185.0, 277.18, 369.99, 554.37],  // F# min
    [196.0, 293.66, 392.0, 587.33],  // G maj
    [146.83, 220.0, 293.66, 440.0],  // D maj bass
    [196.0, 392.0, 493.88, 587.33],  // G maj high
    [220.0, 329.63, 440.0, 554.37],  // A maj lift
  ];

  public toggleMusic(onStateChange?: (playing: boolean) => void): boolean {
    this.initContext();
    if (this.isPlayingMusic) {
      this.stopMusic();
      onStateChange?.(false);
      return false;
    } else {
      this.startMusic();
      onStateChange?.(true);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlayingMusic;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public startMusic() {
    this.initContext();
    if (!this.ctx) return;
    this.isPlayingMusic = true;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    const playArpeggioStep = () => {
      if (!this.isPlayingMusic || !this.ctx || !this.gainNode) return;
      const chordIndex = Math.floor(this.step / 4) % this.melodyNotes.length;
      const noteIndex = this.step % 4;
      const freq = this.melodyNotes[chordIndex][noteIndex];

      this.playPluckNote(freq, 1.8);

      // Play soft bass root on beat 0
      if (noteIndex === 0) {
        this.playPluckNote(freq / 2, 2.4, 0.45);
      }

      this.step++;
    };

    // Tempo: ~104 bpm arpeggiated 8th notes (approx 290ms)
    this.musicInterval = window.setInterval(playArpeggioStep, 290);
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.step = 0;
  }

  private playPluckNote(frequency: number, duration: number, volFactor: number = 0.3) {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm harp-like spectrum (sine + warm triangle filter)
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + duration);

    const now = this.ctx.currentTime;
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(this.volume * volFactor, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  // Tactile sound effects
  public playScratchSound() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260 + Math.random() * 80, now);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800 + Math.random() * 300, now);
      filter.Q.setValueAtTime(3, now);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Audio fallback safe
    }
  }

  public playChimeReveal() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const freqs = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 1.25);
      });
    } catch {
      // Audio fallback safe
    }
  }

  public playEnvelopeOpen() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // Gentle soft swoosh + delicate chime
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // Audio fallback safe
    }
  }
}

export const romanticAudio = new RomanticAudioManager();
