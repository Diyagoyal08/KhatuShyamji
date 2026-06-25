"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Icon } from "@/components/shared"
import { useLanguage } from "@/lib/contexts/LanguageContext"
import { useAudio } from "@/lib/contexts/AudioContext"

export function OtpScreen({ 
  navigate,
  onLoginSuccess 
}: { 
  navigate: (s: any) => void
  onLoginSuccess: (user: { name: string; phone: string; initials: string }) => void
}) {
  const { t } = useLanguage()
  const { playTempleBell } = useAudio()
  const [otp, setOtp] = useState("")
  const [timer, setTimer] = useState(30)
  const [phone, setPhone] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPhone = localStorage.getItem("temp_login_phone") || "+91 98290 12345"
      setPhone(savedPhone)
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length === 6) {
      playTempleBell("triple")
      
      // Load temp signup user details if exists, or fallback
      const tempUser = localStorage.getItem("temp_signup_user")
      const loggedUser = tempUser ? JSON.parse(tempUser) : {
        name: "Mohan Sharma",
        phone: phone,
        initials: "MS"
      }
      
      onLoginSuccess(loggedUser)
      navigate("home")
    }
  }

  return (
    <div className="relative -mx-4 md:-mx-8 -mt-5 -mb-24 lg:-mb-10 min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#FFF8F0]">
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
              <Icon name="ShieldCheck" className="size-8" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#1A120B]">
              {t("Verify OTP", "सत्यापित करें")}
            </h2>
            <p className="mt-1 text-sm text-[#6b5440]">
              {t("Sent to ", "ओटीपी भेजा गया है ")} {phone}
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#6b5440] uppercase tracking-wider text-center">
                {t("Enter 6-Digit OTP", "6-अंकों का ओटीपी दर्ज करें")}
              </label>
              <input
                type="tel"
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                className="w-full text-center text-xl tracking-[0.3em] font-bold rounded-xl border border-[#E8D5B7] bg-white py-3.5 px-4 text-[#1A120B] shadow-sm outline-none transition focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10"
              />
            </div>

            <button
              type="submit"
              disabled={otp.length !== 6}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#D97706] to-[#D4AF37] py-3.5 text-base font-bold text-white shadow-[0_4px_20px_rgba(217,119,6,0.3)] transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 transition group-hover:opacity-100" />
              {t("Verify & Login", "सत्यापित और लॉगिन करें")}
              <Icon name="CheckCircle2" className="size-5" />
            </button>
          </form>

          <div className="mt-8 text-center">
            {timer > 0 ? (
              <p className="text-xs text-[#6b5440]">
                {t("Resend OTP in", "पुनः भेजने का समय")} <span className="font-bold text-[#D97706]">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={() => {
                  setTimer(30)
                  playTempleBell('single')
                }}
                className="text-xs font-bold text-[#D97706] hover:underline"
              >
                {t("Resend OTP", "ओटीपी पुनः भेजें")}
              </button>
            )}
          </div>
        </motion.div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate("login")}
          className="mt-6 flex items-center justify-center gap-2 w-full text-sm font-semibold text-[#6b5440] hover:text-[#D97706] transition"
        >
          <Icon name="ArrowLeft" className="size-4" />
          {t("Back to Login", "लॉगिन स्क्रीन पर वापस")}
        </button>
      </div>
    </div>
  )
}