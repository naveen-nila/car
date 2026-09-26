// Web Audio API engine sound synthesizer for Apex MK-IV
class EngineAudioSimulator {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private currentRpm: number = 850;
  private targetRpm: number = 850;
  private masterGain: GainNode | null = null;
  private idleOsc: OscillatorNode | null = null;
  private toneOsc1: OscillatorNode | null = null;
  private toneOsc2: OscillatorNode | null = null;
  private turboFilter: BiquadFilterNode | null = null;
  private turboGain: GainNode | null = null;
  private turboNoise: AudioBufferSourceNode | null = null;
  private animFrameId: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start() {
    if (this.isRunning) return;
    this.initContext();
    if (!this.ctx) return;

    this.isRunning = true;
    const now = this.ctx.currentTime;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.25, now + 0.3);
    this.masterGain.connect(this.ctx.destination);

    // Distortion / Saturation Curve for aggressive sports car exhaust roar
    const waveshaper = this.ctx.createWaveShaper();
    waveshaper.curve = this.makeDistortionCurve(18) as unknown as Float32Array<ArrayBuffer>;
    waveshaper.connect(this.masterGain);

    // Low rumble oscillator (fundamental firing frequency)
    this.idleOsc = this.ctx.createOscillator();
    this.idleOsc.type = 'sawtooth';
    this.idleOsc.frequency.setValueAtTime(this.rpmToFreq(this.currentRpm), now);

    // Harmonic 2
    this.toneOsc1 = this.ctx.createOscillator();
    this.toneOsc1.type = 'triangle';
    this.toneOsc1.frequency.setValueAtTime(this.rpmToFreq(this.currentRpm) * 2, now);

    // High rasp oscillator
    this.toneOsc2 = this.ctx.createOscillator();
    this.toneOsc2.type = 'sawtooth';
    this.toneOsc2.frequency.setValueAtTime(this.rpmToFreq(this.currentRpm) * 3, now);

    const oscMix = this.ctx.createGain();
    oscMix.gain.setValueAtTime(0.5, now);

    this.idleOsc.connect(waveshaper);
    this.toneOsc1.connect(waveshaper);
    this.toneOsc2.connect(oscMix);
    oscMix.connect(waveshaper);

    this.idleOsc.start();
    this.toneOsc1.start();
    this.toneOsc2.start();

    // Turbo spool noise
    this.setupTurboSpool(this.masterGain);

    // Physics loop
    this.updateLoop();
  }

  private setupTurboSpool(destination: AudioNode) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    this.turboFilter = this.ctx.createBiquadFilter();
    this.turboFilter.type = 'bandpass';
    this.turboFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);
    this.turboFilter.Q.setValueAtTime(8, this.ctx.currentTime);

    this.turboGain = this.ctx.createGain();
    this.turboGain.gain.setValueAtTime(0.001, this.ctx.currentTime);

    whiteNoise.connect(this.turboFilter);
    this.turboFilter.connect(this.turboGain);
    this.turboGain.connect(destination);

    whiteNoise.start();
    this.turboNoise = whiteNoise;
  }

  private rpmToFreq(rpm: number): number {
    // 6 cylinders 4-stroke: 3 ignition events per revolution
    return (rpm / 60) * 1.5;
  }

  private makeDistortionCurve(amount: number): Float32Array {
    const k = amount;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  public setThrottle(pressed: boolean, highRevRpm: number = 7800) {
    if (!this.isRunning) {
      this.start();
    }
    if (pressed) {
      this.targetRpm = highRevRpm;
    } else {
      const prevTarget = this.targetRpm;
      this.targetRpm = 850;
      // If we were high revving, trigger turbo wastegate blowoff flutter
      if (prevTarget > 4000) {
        this.triggerBlowOffFlutter();
      }
    }
  }

  private triggerBlowOffFlutter() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const flutterGain = this.ctx.createGain();
    flutterGain.gain.setValueAtTime(0.2, now);
    flutterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    flutterGain.connect(this.masterGain);

    const flutterFilter = this.ctx.createBiquadFilter();
    flutterFilter.type = 'highpass';
    flutterFilter.frequency.setValueAtTime(2500, now);

    const bufferSize = this.ctx.sampleRate * 0.5;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Modulate with rapid flutter pulse (30Hz)
      const mod = Math.sin((i / this.ctx.sampleRate) * Math.PI * 50);
      data[i] = (Math.random() * 2 - 1) * (0.5 + 0.5 * mod);
    }
    const flutterSource = this.ctx.createBufferSource();
    flutterSource.buffer = noiseBuffer;
    flutterSource.connect(flutterFilter);
    flutterFilter.connect(flutterGain);
    flutterSource.start(now);
    flutterSource.stop(now + 0.5);
  }

  private updateLoop = () => {
    if (!this.isRunning || !this.ctx) return;

    // Smooth RPM interpolation
    const lerpSpeed = this.targetRpm > this.currentRpm ? 0.08 : 0.04;
    this.currentRpm += (this.targetRpm - this.currentRpm) * lerpSpeed;

    const now = this.ctx.currentTime;
    const baseFreq = this.rpmToFreq(this.currentRpm);

    if (this.idleOsc) {
      this.idleOsc.frequency.setValueAtTime(baseFreq, now);
    }
    if (this.toneOsc1) {
      this.toneOsc1.frequency.setValueAtTime(baseFreq * 2, now);
    }
    if (this.toneOsc2) {
      this.toneOsc2.frequency.setValueAtTime(baseFreq * 3.5, now);
    }

    // Turbo spool frequency & gain scaling with RPM
    if (this.turboFilter && this.turboGain) {
      const turboRatio = Math.max(0, (this.currentRpm - 1500) / 6700);
      const turboPitch = 1200 + turboRatio * 4200;
      this.turboFilter.frequency.setValueAtTime(turboPitch, now);
      this.turboGain.gain.setValueAtTime(0.002 + turboRatio * 0.09, now);
    }

    this.animFrameId = requestAnimationFrame(this.updateLoop);
  };

  public stop() {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
      setTimeout(() => {
        try {
          this.idleOsc?.stop();
          this.toneOsc1?.stop();
          this.toneOsc2?.stop();
          this.turboNoise?.stop();
          this.ctx?.close();
        } catch {
          // ignore
        }
        this.ctx = null;
      }, 350);
    }
  }

  public getStatus() {
    return {
      isRunning: this.isRunning,
      rpm: Math.round(this.currentRpm),
    };
  }
}

export const engineAudio = new EngineAudioSimulator();
