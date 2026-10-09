// Tiny synthesised sound effects for Play mode (no audio files). On by default; the speaker button mutes it and the choice
// is remembered in localStorage. Browsers keep audio silent until the visitor has clicked something, and entering Play
// mode is a click, so nothing plays before then.

const KEY = 'portfolio-play-sound'
type Name = 'on' | 'jump' | 'chirp' | 'holo' | 'ping' | 'done' | 'denied' | 'unlock'

let ctx: AudioContext | null = null
let enabled = true
try { enabled = localStorage.getItem(KEY) !== '0' } catch { /* private mode: stays on */ }

export const soundEnabled = () => enabled

export function setSound(on: boolean) {
  enabled = on
  if (!on) try { window.speechSynthesis?.cancel() } catch { /* fine */ }
  try { localStorage.setItem(KEY, on ? '1' : '0') } catch { /* fine */ }
  if (on) play('on')
}

const audio = () => {
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

// one note with a pitch glide and a soft envelope
function tone(c: AudioContext, at: number, from: number, to: number, dur: number, type: OscillatorType, vol: number) {
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.setValueAtTime(from, at)
  o.frequency.exponentialRampToValueAtTime(to, at + dur)
  g.gain.setValueAtTime(0.0001, at)
  g.gain.exponentialRampToValueAtTime(vol, at + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur)
  o.connect(g).connect(c.destination)
  o.start(at)
  o.stop(at + dur + 0.02)
}

const r = (a: number, b: number) => a + Math.random() * (b - a)

let lastJump = 0

export function play(name: Name) {
  if (!enabled) return
  // browsers keep audio silent until the visitor has interacted; don't queue sounds that would play late
  if (typeof navigator !== 'undefined' && navigator.userActivation && !navigator.userActivation.hasBeenActive) return
  const calm = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (calm && (name === 'holo' || name === 'jump')) return
  if (name === 'jump') {
    if (Date.now() - lastJump < 1500) return
    lastJump = Date.now()
  }
  const c = audio()
  if (!c) return
  const t = c.currentTime + 0.01
  switch (name) {
    case 'on': // a friendly little blip
      tone(c, t, 700, 1100, 0.12, 'triangle', 0.05)
      tone(c, t + 0.12, 1100, 1500, 0.14, 'triangle', 0.05)
      break
    case 'jump': { // the jump to lightspeed: a filtered whoosh sweeping up with a rising engine tone, then a soft thump
      const len = Math.floor(c.sampleRate * 1.3)
      const buf = c.createBuffer(1, len, c.sampleRate)
      const d = buf.getChannelData(0)
      for (let k = 0; k < len; k++) d[k] = Math.random() * 2 - 1
      const src = c.createBufferSource()
      src.buffer = buf
      const f = c.createBiquadFilter()
      f.type = 'bandpass'
      f.Q.value = 1.1
      f.frequency.setValueAtTime(150, t)
      f.frequency.exponentialRampToValueAtTime(5000, t + 0.95)
      const g = c.createGain()
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.07, t + 0.7)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2)
      src.connect(f).connect(g).connect(c.destination)
      src.start(t)
      src.stop(t + 1.3)
      tone(c, t, 70, 520, 1.0, 'sawtooth', 0.025)
      tone(c, t + 0.95, 130, 45, 0.35, 'sine', 0.08)
      break
    }
    case 'chirp': // R2-style: two or three quick warbles
      for (let k = 0, at = t; k < 3; k++, at += 0.09) {
        const a = r(500, 1400)
        tone(c, at, a, a * r(0.6, 1.7), 0.08, 'sine', 0.045)
      }
      break
    case 'holo': { // a hologram powering up: a low hum that rises under a short filtered whoosh
      tone(c, t, 90, 180, 0.55, 'sawtooth', 0.02)
      tone(c, t + 0.1, 400, 900, 0.4, 'sine', 0.025)
      break
    }
    case 'ping': // a stop found
      tone(c, t, 880, 880, 0.18, 'sine', 0.05)
      tone(c, t + 0.1, 1320, 1320, 0.28, 'sine', 0.04)
      break
    case 'done': // the transmission is complete
      ;[660, 880, 1100, 1320].forEach((f, k) => tone(c, t + k * 0.09, f, f * 1.02, 0.14, 'triangle', 0.045))
      break
    case 'denied': // two low buzzes
      tone(c, t, 150, 120, 0.14, 'square', 0.04)
      tone(c, t + 0.18, 150, 110, 0.2, 'square', 0.04)
      break
    case 'unlock': // clearance granted
      ;[523, 659, 784].forEach((f, k) => tone(c, t + k * 0.1, f, f, 0.22, 'sine', 0.05))
      break
  }
}

// ---- A droid voice: a few very short spoken lines using the browser's own speech voices, preferring a robotic one.
// They never read the content (that stays on screen); they only mark moments. Follows the same sound toggle. ----

const lines = {
  holo: ['Incoming transmission.'],
  done: ['Transmission complete.'],
  denied: ['Access denied.', 'Incorrect.'],
  unlock: ['Clearance granted.'],
} as const

let voice: SpeechSynthesisVoice | null = null
let robotic = false
const pickVoice = () => {
  const all = window.speechSynthesis?.getVoices() ?? []
  const en = all.filter((v) => /^en/i.test(v.lang))
  const bot = en.find((v) => /zarvox/i.test(v.name)) ?? en.find((v) => /trinoids|robot/i.test(v.name))
  robotic = Boolean(bot)
  voice = bot ?? en.find((v) => /en-GB/i.test(v.lang)) ?? en[0] ?? null
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  pickVoice()
  window.speechSynthesis.addEventListener?.('voiceschanged', pickVoice)
}

export function say(kind: keyof typeof lines | 'rank', extra?: string) {
  if (!enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const line = kind === 'rank' ? `Rank up. ${extra}.` : lines[kind][Math.floor(Math.random() * lines[kind].length)]
  // machine cadence: every word on its own, with a short pause between
  const text = line.replace(/[.,]/g, '').split(/\s+/).join('. ')
  const u = new SpeechSynthesisUtterance(text)
  if (voice) u.voice = voice
  u.lang = voice?.lang ?? 'en-US'
  // a bright, clipped delivery; an ordinary fallback voice is pushed away from natural speech as well
  u.pitch = robotic ? 1.1 : 1.3
  u.rate = robotic ? 1.15 : 1.2
  u.volume = 0.75
  window.speechSynthesis.cancel()
  window.setTimeout(() => window.speechSynthesis.speak(u), 300) // lets the chirp land first
}

export const hush = () => { try { window.speechSynthesis?.cancel() } catch { /* fine */ } }
