"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Icon } from "@/components/shared"
import { useLanguage } from "@/lib/contexts/LanguageContext"
import { useAudio } from "@/lib/contexts/AudioContext"

export function SignupScreen({ 
  navigate,
  onSignupSuccess 
}: { 
  navigate: (s: any) => void
  onSignupSuccess: (user: { name: string; phone: string; initials: string }) => void
}) {
  const { t } = useLanguage()
  const { playTempleBell } = useAudio()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = t("Name is required", "नाम आवश्यक है")
    if (!phone.trim()) newErrors.phone = t("Phone is required", "फ़ोन नंबर आवश्यक है")
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = t("Invalid 10-digit number", "अमान्य 10 अंकों का नंबर")
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    playTempleBell("triple")
    
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "DV"

    const newUser = { name, phone: `+91 ${phone}`, initials }
    onSignupSuccess(newUser)
    
    localStorage.setItem("temp_login_phone", `+91 ${phone}`)
    localStorage.setItem("temp_signup_user", JSON.stringify(newUser))
    navigate("otp")
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
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-[#D97706]/10 text-[#D97706]">
              <Icon name="UserPlus2" className="size-8" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#1A120B]">
              {t("Register Devotee", "भक्त पंजीकरण")}
            </h2>
            <p className="mt-1 text-sm text-[#6b5440]">
              {t("Create your profile for Darshan booking", "दर्शन बुकिंग के लिए प्रोफ़ाइल बनाएं")}
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-[#6b5440] uppercase tracking-wider">
                {t("Full Name", "पूरा नाम")}
              </label>
              <input
                type="text"
                placeholder={t("Enter your full name", "अपना पूरा नाम दर्ज करें")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-[#E8D5B7] bg-white py-3 px-4 text-sm font-semibold text-[#1A120B] shadow-sm outline-none transition focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-[#6b5440] uppercase tracking-wider">
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
                  className="w-full rounded-xl border border-[#E8D5B7] bg-white py-3 pl-16 pr-4 text-sm font-semibold text-[#1A120B] shadow-sm outline-none transition focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10"
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-[#6b5440] uppercase tracking-wider">
                {t("City / Town (Optional)", "शहर / कस्बा (वैकल्पिक)")}
              </label>
              <input
                type="text"
                placeholder={t("e.g. Sikar, Jaipur", "उदा. सीकर, जयपुर")}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border border-[#E8D5B7] bg-white py-3 px-4 text-sm font-semibold text-[#1A120B] shadow-sm outline-none transition focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10"
              />
            </div>

            <button
              type="submit"
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#D97706] to-[#D4AF37] py-3.5 text-base font-bold text-white shadow-[0_4px_20px_rgba(217,119,6,0.3)] transition active:scale-[0.98]"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 transition group-hover:opacity-100" />
              {t("Register & Verify", "पंजीकरण और सत्यापन")}
              <Icon name="ArrowRight" className="size-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-[#6b5440]">
              {t("Already have an account?", "पहले से ही एक खाता है?")}{" "}
              <button
                onClick={() => navigate("login")}
                className="font-bold text-[#D97706] hover:underline"
              >
                {t("Login", "लॉग इन करें")}
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