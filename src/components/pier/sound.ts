/**
 * Synthesized night pier: filtered noise for water, a low drone, and short
 * tones for hover and click. No recorded samples.
 */

type AudioContextCtor = typeof AudioContext;

function getContextCtor(): AudioContextCtor | null {
  if (typeof window === "undefined") return null;
  return window.AudioContext ?? (window as Window & { webkitAudioContext?: AudioContextCtor }).webkitAudioContext ?? null;
}

let context: AudioContext | null = null;
let master: GainNode | null = null;
let sources: Array<{ stop: () => void }> = [];
let enabled = false;

function tone(freq: number, duration: number, peak: number, type: OscillatorType = "sine") {
  if (!context || !master || !enabled) return;
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const now = context.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(gain);
  gain.connect(master);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function startAmbient() {
  if (!context || !master) return;
  const rate = context.sampleRate;
  const length = rate * 2;
  const buffer = context.createBuffer(1, length, rate);
  const data = buffer.getChannelData(0);
  let brown = 0;
  for (let i = 0; i < length; i += 1) {
    const white = Math.random() * 2 - 1;
    brown = brown * 0.985 + white * 0.015;
    data[i] = brown * 2.2;
  }
  const noise = context.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 620;
  filter.Q.value = 0.7;
  const noiseGain = context.createGain();
  noiseGain.gain.value = 0.22;
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(master);
  noise.start();

  const lfo = context.createOscillator();
  lfo.frequency.value = 0.07;
  const lfoGain = context.createGain();
  lfoGain.gain.value = 180;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  const drone = context.createOscillator();
  drone.type = "sine";
  drone.frequency.value = 52;
  const droneGain = context.createGain();
  droneGain.gain.value = 0.045;
  drone.connect(droneGain);
  droneGain.connect(master);
  drone.start();

  const fifth = context.createOscillator();
  fifth.type = "triangle";
  fifth.frequency.value = 78;
  const fifthGain = context.createGain();
  fifthGain.gain.value = 0.012;
  fifth.connect(fifthGain);
  fifthGain.connect(master);
  fifth.start();

  sources = [
    { stop: () => noise.stop() },
    { stop: () => lfo.stop() },
    { stop: () => drone.stop() },
    { stop: () => fifth.stop() },
  ];
}

function stopAmbient() {
  for (const source of sources) {
    try {
      source.stop();
    } catch {
      /* already stopped */
    }
  }
  sources = [];
}

function ensure(): AudioContext | null {
  const Ctor = getContextCtor();
  if (!Ctor) return null;
  if (!context) {
    context = new Ctor();
    master = context.createGain();
    master.gain.value = 0.0001;
    master.connect(context.destination);
  }
  if (context.state === "suspended") {
    void context.resume();
  }
  return context;
}

export const sound = {
  get enabled() {
    return enabled;
  },
  enable() {
    const ctx = ensure();
    if (!ctx || !master) return;
    enabled = true;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0.55, ctx.currentTime, 0.08);
    if (sources.length === 0) startAmbient();
  },
  disable() {
    enabled = false;
    if (context && master) {
      master.gain.cancelScheduledValues(context.currentTime);
      master.gain.setTargetAtTime(0.0001, context.currentTime, 0.05);
    }
    window.setTimeout(() => {
      if (!enabled) stopAmbient();
    }, 280);
  },
  toggle() {
    if (enabled) this.disable();
    else this.enable();
    return enabled;
  },
  hover() {
    tone(740, 0.09, 0.03);
  },
  click() {
    tone(494, 0.12, 0.05);
    window.setTimeout(() => tone(784, 0.16, 0.04), 70);
  },
};
