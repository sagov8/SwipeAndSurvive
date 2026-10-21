/**
 * CyberSoundEngine — Procedural Web Audio API Synthesizer
 * Zero external audio assets (.mp3 / .wav) to guarantee zero 404/CORS failures.
 */
class CyberSoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  /**
   * Must be invoked exclusively inside user interaction event (e.g. "Iniciar Simulación" onClick)
   */
  init() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch {
      // Silent fallback so audio issues never block gameplay
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  setMuted(val) {
    this.muted = Boolean(val);
  }

  /**
   * Oscilador sine de 440Hz a 580Hz en 0.08s (pip digital limpio)
   */
  playCardAppear() {
    if (this.muted) return;
    try {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(580, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.085);
    } catch {
      // Ignore audio errors
    }
  }

  /**
   * Oscilador triangle con barrido de frecuencia:
   * 320Hz -> 180Hz para izquierda ('left')
   * 320Hz -> 520Hz para derecha ('right')
   * en 0.12s
   */
  playSwipe(direction) {
    if (this.muted) return;
    try {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      const targetFreq = direction === 'left' ? 180 : 520;
      osc.frequency.linearRampToValueAtTime(targetFreq, now + 0.12);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.125);
    } catch {
      // Ignore audio errors
    }
  }

  /**
   * Tres pulsos encadenados separados por 120ms:
   * Positivo (Sinergia): 300Hz, 400Hz, 550Hz
   * Negativo (Cascada de crisis / R1 / Fuga): 350Hz, 260Hz, 170Hz
   */
  playDominoChain(isPositive = false) {
    if (this.muted) return;
    try {
      if (!this.ctx) return;
      const freqs = isPositive ? [300, 400, 550] : [350, 260, 170];
      const now = this.ctx.currentTime;

      freqs.forEach((freq, idx) => {
        const start = now + idx * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = isPositive ? 'sine' : 'sawtooth';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.09, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.105);
      });
    } catch {
      // Ignore audio errors
    }
  }

  /**
   * Acorde arpegiado en onda sine (523.25Hz, 659.25Hz, 783.99Hz) con gain suave
   */
  playRadarScan() {
    if (this.muted) return;
    try {
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const start = now + idx * 0.065;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.24);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.25);
      });
    } catch {
      // Ignore audio errors
    }
  }

  /**
   * Doble pulso sawtooth a 150Hz con filtro lowpass cuando aparece un evento del entorno (Q5, Q10, Q15, Q19)
   */
  playCrisisAlert() {
    if (this.muted) return;
    try {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      [0, 0.18].forEach((offset) => {
        const start = now + offset;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, start);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, start);

        gain.gain.setValueAtTime(0.14, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.14);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.15);
      });
    } catch {
      // Ignore audio errors
    }
  }

  /**
   * Efecto sonoro de ganancia / triunfo financiero (campanilleo ascendente de monedas 'coin pickup')
   */
  playCoinVictory() {
    if (this.muted) return;
    try {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [987.77, 1318.51]; // B5 -> E6
      notes.forEach((freq, idx) => {
        const start = now + idx * 0.08;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.19);
      });
    } catch {
      // Ignore audio errors
    }
  }

  /**
   * Efecto sonoro de descontento / abucheo / queja de trabajadores o clientes (tono grave descendente modulado)
   */
  playBooCrowd() {
    if (this.muted) return;
    try {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.35);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Ignore audio errors
    }
  }

  /**
   * Efecto sonoro de fallo en planta / chimenea / avería de maquinaria (pulso ruidoso distorsionado)
   */
  playIndustrialBreak() {
    if (this.muted) return;
    try {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.linearRampToValueAtTime(45, now + 0.3);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.34);
    } catch {
      // Ignore audio errors
    }
  }

  /**
   * Efecto sonoro de pérdida financiera (caída rápida de tono)
   */
  playCashLoss() {
    if (this.muted) return;
    try {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.25);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch {
      // Ignore audio errors
    }
  }

  /**
   * Efecto sonoro de dado rodando (sonido de traqueteo/dados retro con ráfagas de clicks)
   */
  playDiceRoll() {
    if (this.muted) return;
    try {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Generar 5 clicks rápidos espaciados
      for (let i = 0; i < 6; i++) {
        const clickTime = now + i * 0.07;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(280 + (i % 3) * 120, clickTime);

        gain.gain.setValueAtTime(0.1, clickTime);
        gain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.035);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(clickTime);
        osc.stop(clickTime + 0.04);
      }
    } catch {
      // Ignore audio errors
    }
  }

  /**
   * Efecto sonoro al caer el dado (acorde de resolución arcade)
   */
  playDiceLand() {
    if (this.muted) return;
    try {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const chord = [330, 440, 660];
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.1, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + 0.38);
      });
    } catch {
      // Ignore audio errors
    }
  }
}

export const soundEngine = new CyberSoundEngine();
