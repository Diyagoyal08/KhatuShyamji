"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Icon } from "@/components/shared"
import { useLanguage } from "@/lib/contexts/LanguageContext"

export function WelcomeScreen({ navigate }: { navigate: (s: any) => void }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className="relative -mx-4 md:-mx-8 -mt-5 -mb-24 lg:-mb-10 min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: "url('/images/khatu-temple.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      
      {/* Falling Petals (Subtle) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 size-3 rounded-full bg-[#8B1E1E] blur-[1px] opacity-40 rounded-bl-none rotate-45"
            style={{ left: `${Math.random() * 100}%` }}
            initial={{ y: -100, x: 0 }}
            animate={{ 
              y: "120vh", 
              x: Math.random() > 0.5 ? 100 : -100,
              rotate: 360 
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              delay: Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 grid size-32 place-items-center rounded-full border border-white/20 bg-white/10 p-4 backdrop-blur-sm"
        >
          <Image
            src="/images/khatu-shyam-logo.png"
            alt="Khatu Shyam Ji Logo"
            width={128}
            height={128}
            className="object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-heading text-3xl font-bold tracking-widest text-[#D4AF37] drop-shadow-md"
        >
          जय श्री श्याम
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
        >
          Khatu Shyam Digital Pilgrimage
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 w-full space-y-4"
        >
          <button
            onClick={() => navigate("login")}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#D97706] to-[#D4AF37] py-3.5 text-base font-bold text-white shadow-[0_4px_20px_rgba(217,119,6,0.4)] transition active:scale-[0.98]"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 transition group-hover:opacity-100" />
            {t("Enter Darbar", "दरबार में प्रवेश करें")}
            <Icon name="ArrowRight" className="size-5" />
          </button>
          
          <button
            onClick={() => navigate("home")}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 py-3.5 text-base font-semibold text-white/90 backdrop-blur-sm transition hover:bg-white/10 active:scale-[0.98]"
          >
            {t("Continue as Guest", "अतिथि के रूप में जारी रखें")}
          </button>
        </motion.div>

        {/* Language Toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8 }}
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="mt-8 text-xs font-bold uppercase tracking-wider text-white/80 hover:opacity-100 transition"
        >
          {lang === "en" ? "हिन्दी में बदलें" : "Switch to English"}
        </motion.button>
      </div>
    </div>
  )
}