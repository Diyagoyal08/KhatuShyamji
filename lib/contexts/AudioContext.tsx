"use client"

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

interface AudioContextType {
  bhatiMode: boolean
  setBhatiMode: (val: boolean) => void
  soundEnabled: boolean
  setSoundEnabled: (val: boolean) => void
  timeOfDay: TimeOfDay
  
  // Separate volume sliders
  ambienceVolume: number
  setAmbienceVolume: (val: number) => void
  bellVolume: number
  setBellVolume: (val: number) => void
  mantraVolume: number
  setMantraVolume: (val: number) => void
  assistantVolume: number
  setAssistantVolume: (val: number) => void

  playTempleBell: (type?: 'single' | 'triple') => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [bhatiMode, setBhatiMode] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('morning')

  const [ambienceVolume, setAmbienceVolume] = useState(0.4)
  const [bellVolume, setBellVolume] = useState(0.6)
  const [mantraVolume, setMantraVolume] = useState(0.5)
  const [assistantVolume, setAssistantVolume] = useState(0.8)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const droneOscsRef = useRef<{ osc: OscillatorNode; lfo: OscillatorNode }[]>([])
  const droneGainRef = useRef<GainNode | null>(null)
  const bellIntervalRef = useRef<any>(null)

  // Determine time of day
  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 12) setTimeOfDay('morning')
      else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon')
      else if (hour >= 17 && hour < 20) setTimeOfDay('evening')
      else setTimeOfDay('night')
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  const playTempleBell = (type: 'single' | 'triple' = 'single') => {
    if (!audioCtxRef.current || !soundEnabled) return
    const ctx = audioCtxRef.current
    if (ctx.state === "suspended") ctx.resume()

    const playStrike = (delay: number) => {
      try {
        const now = ctx.currentTime + delay
        const frequencies = [440, 543, 672, 825, 935, 1100, 1500]
        const bellGain = ctx.createGain()
        bellGain.gain.setValueAtTime(0, now)
        bellGain.gain.linearRampToValueAtTime(0.04 * bellVolume, now + 0.01)
        bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0)
        bellGain.connect(ctx.destination)

        frequencies.forEach((f) => {
          const osc = ctx.createOscillator()
          osc.type = "sine"
          osc.frequency.setValueAtTime(f, now)
          osc.connect(bellGain)
          osc.start(now)
          osc.stop(now + 4.0)
        })
      } catch (e) {
        console.error("Bell error", e)
      }
    }

    if (type === 'single') {
      playStrike(0)
    } else {
      playStrike(0)
      playStrike(0.6)
      playStrike(1.2)
    }
  }

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx()

      const ctx = audioCtxRef.current
      if (ctx.state === "suspended") ctx.resume()

      const droneGain = ctx.createGain()
      droneGain.gain.setValueAtTime(0, ctx.currentTime)
      droneGain.gain.linearRampToValueAtTime(0.05 * ambienceVolume, ctx.currentTime + 3)
      droneGain.connect(ctx.destination)
      droneGainRef.current = droneGain

      // Adjust drone frequencies based on time of day
      let freqs = [69.3, 103.8, 138.6, 207.65] // Morning/Neutral (Tanpura C#)
      if (timeOfDay === 'evening') freqs = [73.4, 110.0, 146.8, 220.0] // D2 slightly higher energy
      if (timeOfDay === 'night') freqs = [65.4, 98.0, 130.8, 196.0] // C2 deeper, calmer

      const oscs = freqs.map((f, i) => {
        const osc = ctx.createOscillator()
        osc.type = i % 2 === 0 ? "triangle" : "sine"
        osc.frequency.setValueAtTime(f, ctx.currentTime)

        const lfo = ctx.createOscillator()
        lfo.frequency.setValueAtTime(0.15 + i * 0.05, ctx.currentTime)
        const lfoGain = ctx.createGain()
        lfoGain.gain.setValueAtTime(0.4, ctx.currentTime)

        lfo.connect(lfoGain)
        lfoGain.connect(osc.frequency)
        lfo.start()

        const filter = ctx.createBiquadFilter()
        filter.type = "lowpass"
        filter.frequency.setValueAtTime(timeOfDay === 'night' ? 120 + i * 50 : 180 + i * 80, ctx.currentTime)

        osc.connect(filter)
        filter.connect(droneGain)
        osc.start()

        return { osc, lfo }
      })
      droneOscsRef.current = oscs

      // Time specific random events (e.g., wind at night, birds morning)
      bellIntervalRef.current = setInterval(() => {
        if (Math.random() > 0.5) playTempleBell('single')
      }, timeOfDay === 'evening' ? 8000 : 15000)

    } catch (e) {
      console.error("Ambient audio error", e)
    }
  }

  const stopAmbientSound = () => {
    if (droneGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current
      const gain = droneGainRef.current
      try {
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5)
        setTimeout(() => {
          droneOscsRef.current.forEach(({ osc, lfo }) => {
            try { osc.stop() } catch (_) {}
            try { lfo.stop() } catch (_) {}
          })
          droneOscsRef.current = []
          try { gain.disconnect() } catch (_) {}
        }, 1600)
      } catch (e) {
        droneOscsRef.current.forEach(({ osc, lfo }) => {
          try { osc.stop() } catch (_) {}
          try { lfo.stop() } catch (_) {}
        })
        droneOscsRef.current = []
      }
    }
    if (bellIntervalRef.current) {
      clearInterval(bellIntervalRef.current)
      bellIntervalRef.current = null
    }
  }

  useEffect(() => {
    if (soundEnabled) {
      stopAmbientSound() // restart with new timeOfDay
      startAmbientSound()
    } else {
      stopAmbientSound()
    }
    return () => stopAmbientSound()
  }, [soundEnabled, timeOfDay])

  useEffect(() => {
    if (droneGainRef.current && audioCtxRef.current) {
      try {
        droneGainRef.current.gain.setValueAtTime(droneGainRef.current.gain.value, audioCtxRef.current.currentTime)
        droneGainRef.current.gain.linearRampToValueAtTime(0.05 * ambienceVolume, audioCtxRef.current.currentTime + 0.5)
      } catch (_) {}
    }
  }, [ambienceVolume])

  return (
    <AudioContext.Provider value={{
      bhatiMode, setBhatiMode,
      soundEnabled, setSoundEnabled,
      timeOfDay,
      ambienceVolume, setAmbienceVolume,
      bellVolume, setBellVolume,
      mantraVolume, setMantraVolume,
      assistantVolume, setAssistantVolume,
      playTempleBell
    }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const ctx = useContext(AudioContext)
  if (!ctx) throw new Error('useAudio must be used within AudioProvider')
  return ctx
}
