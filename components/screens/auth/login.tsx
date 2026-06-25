"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Icon } from "@/components/shared"
import { useLanguage } from "@/lib/contexts/LanguageContext"
import { useAudio } from "@/lib/contexts/AudioContext"

export function LoginScreen({ navigate }: { navigate: (s: any) => void }) {
  const { t } = useLanguage()
  const { playTempleBell } = useAudio()
  const [phone, setPhone] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length === 10) {
      playTempleBell('single')
      localStorage.setItem("temp_login_phone", `+91 ${phone}`)
      navigate("otp")
    }
  }

  return (
    <div className="relative -mx-4 md:-mx-8 -mt-5 -mb-24 lg:-mb-10 min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#FFF8F0]">
      {/* Background Mandala */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "url('/images/mandala-pattern.png')", backgroundSize: "400px" }}
      />
      <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-[#D97706]/10 to-transparent" />

      <div className="relative z-10 w-full max-w-sm px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-3xl border border-[#D4AF37]/30 bg-white/80 p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-[#D97706]/10 text-[#D97706]">
              <Icon name="UserCircle2" className="size-8" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#1A120B]">
              {t("Welcome Devotee", "भक्त का स्वागत है")}
            </h2>
            <p className="mt-1 text-sm text-[#6b5440]">
              {t("Enter your mobile number to sign in", "लॉग इन करने के लिए मोबाइल नंबर दर्ज करें")}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#6b5440] uppercase tracking-wider">
                {t("Phone Number", "फ़ोन नंबर")}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b5440] font-semibold bg-white border-r border-[#E8D5B7] pr-3 py-1">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                  className="w-full rounded-xl border border-[#E8D5B7] bg-white py-3.5 pl-16 pr-4 text-sm font-semibold text-[#1A120B] shadow-sm outline-none transition focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={phone.length !== 10}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#D97706] to-[#D4AF37] py-3.5 text-base font-bold text-white shadow-[0_4px_20px_rgba(217,119,6,0.3)] transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 transition group-hover:opacity-100" />
              {t("Get OTP", "ओटीपी प्राप्त करें")}
              <Icon name="ArrowRight" className="size-5" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-[#6b5440]">
              {t("Don't have an account?", "खाता नहीं है?")}{" "}
              <button
                onClick={() => navigate("signup")}
                className="font-bold text-[#D97706] hover:underline"
              >
                {t("Sign Up", "पंजीकरण करें")}
              </button>
            </p>
          </div>
        </motion.div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate("welcome")}
          className="mt-6 flex items-center justify-center gap-2 w-full text-sm font-semibold text-[#6b5440] hover:text-[#D97706] transition"
        >
          <Icon name="ArrowLeft" className="size-4" />
          {t("Back to Welcome", "स्वागत स्क्रीन पर वापस")}
        </button>
      </div>
    </div>
  )
}