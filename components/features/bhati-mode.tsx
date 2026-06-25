"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function BhatiMode() {
  const [particles, setParticles] = useState<{ id: number; left: string; delay: number; duration: number }[]>([])

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden bg-black/40 mix-blend-multiply">
      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      
      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-0 size-2 rounded-full bg-[#D4AF37] blur-[1px] opacity-60"
          style={{ left: p.left }}
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: -800,
            opacity: [0, 0.8, 0],
            x: Math.random() > 0.5 ? 50 : -50,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Diya / candle light glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-t from-[#D97706]/40 to-transparent blur-xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
