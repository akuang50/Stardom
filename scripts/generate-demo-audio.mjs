import fs from "node:fs";
import path from "node:path";

const sampleRate = 22050;
const seconds = 4;

function tone(t, freq, gain) {
  return Math.sin(2 * Math.PI * freq * t) * gain;
}

function envelope(t, length, attack = 0.02, release = 0.12) {
  if (t < attack) return t / attack;
  if (t > length - release) return Math.max(0, (length - t) / release);
  return 1;
}

function kick(t, bpm) {
  const beat = 60 / bpm;
  const pos = t % beat;
  const env = Math.exp(-pos * 14);
  return Math.sin(2 * Math.PI * (90 * env + 40) * pos) * env * 0.7;
}

function neon(t) {
  const notes = [523.25, 659.25, 783.99, 987.77];
  const step = Math.floor((t * 4) % notes.length);
  const local = (t * 4) % 1;
  return kick(t, 120) * 0.8 + tone(t, notes[step], 0.18) * envelope(local, 1, 0.01, 0.3) + tone(t, 261.63, 0.05);
}

function dark(t) {
  const notes = [220, 261.63, 246.94, 196];
  const step = Math.floor((t * 1.5) % notes.length);
  const local = (t * 1.5) % 1;
  return (
    tone(t, 110, 0.12) +
    tone(t, notes[step], 0.16) * envelope(local, 1, 0.05, 0.4) +
    kick(t, 84) * 0.45
  );
}

function summer(t) {
  const notes = [392, 440, 523.25, 587.33, 523.25, 440];
  const step = Math.floor((t * 5) % notes.length);
  const local = (t * 5) % 1;
  return kick(t, 108) * 0.6 + tone(t, notes[step], 0.2) * envelope(local, 1, 0.01, 0.25) + tone(t, 196, 0.06);
}

function render(fn) {
  const n = Math.floor(seconds * sampleRate);
  const samples = new Int16Array(n);
  for (let i = 0; i < n; i += 1) {
    const t = i / sampleRate;
    const value = Math.max(-1, Math.min(1, fn(t)));
    samples[i] = value * 32000;
  }
  return samples;
}

function writeWav(file, samples) {
  const dataSize = samples.length * 2;
  const buf = Buffer.alloc(44 + dataSize);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + dataSize, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(1, 22);
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(dataSize, 40);
  for (let i = 0; i < samples.length; i += 1) {
    buf.writeInt16LE(samples[i], 44 + i * 2);
  }
  fs.writeFileSync(file, buf);
}

const outDir = path.resolve("public/music");
fs.mkdirSync(outDir, { recursive: true });
writeWav(path.join(outDir, "neon-pop-demo.wav"), render(neon));
writeWav(path.join(outDir, "dark-rnb-demo.wav"), render(dark));
writeWav(path.join(outDir, "summer-pop-demo.wav"), render(summer));
console.log("Wrote demo loops to public/music/");
