"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/shared"
import type { ScreenKey } from "@/lib/data"
import { useLanguage } from "@/lib/contexts/LanguageContext"

type Passenger = {
  id: number
  name: string
  age: string
  gender: string
  nationality: string
  isChild: boolean
}

const emptyPassenger = (id: number, isChild = false): Passenger => ({
  id,
  name: "",
  age: "",
  gender: "",
  nationality: "India",
  isChild,
})

const notesEn = [
  "The ID card will be required during journey.",
  "Please fill your current citizenship status while booking the ticket. Incorrect information may attract action under the Foreigners Act, 1946.",
  "Darshan is free of charge. No fees will be collected.",
  "Mobile phones and large bags are not allowed inside the sanctum.",
  "Reach the temple at least 30 minutes before your slot time.",
]

const notesHi = [
  "यात्रा के दौरान आईडी कार्ड की आवश्यकता होगी।",
  "कृपया टिकट बुक करते समय अपनी वर्तमान नागरिकता की स्थिति भरें। गलत जानकारी विदेशी अधिनियम, 1946 के तहत कार्रवाई को आकर्षित कर सकती है।",
  "दर्शन नि:शुल्क है। कोई शुल्क नहीं लिया जाएगा।",
  "गर्भगृह के अंदर मोबाइल फोन और बड़े बैग की अनुमति नहीं है।",
  "अपने स्लॉट समय से कम से कम 30 मिनट पहले मंदिर पहुंचें।",
]

export function PassengerDetailsScreen({
  navigate,
  bookingDate,
}: {
  navigate: (s: ScreenKey) => void
  bookingDate: string | null
}) {
  const { lang, t } = useLanguage()
  const [passengers, setPassengers] = useState<Passenger[]>([emptyPassenger(1)])
  const [mobile, setMobile] = useState("")
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Prefill passengers array based on selected count
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCount = localStorage.getItem("booking_devotees_count")
      if (savedCount) {
        const count = Number(savedCount)
        const list = Array.from({ length: count }, (_, i) => emptyPassenger(i + 1))
        setPassengers(list)
      }
    }
  }, [])

  const updatePassenger = (id: number, field: keyof Passenger, value: string) => {
    setPassengers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    )
    setErrors((prev) => {
      const next = { ...prev }
      delete next[`${id}-${field}`]
      return next
    })
  }

  const addPassenger = (isChild = false) => {
    const newId = Math.max(...passengers.map((p) => p.id)) + 1
    setPassengers((prev) => [...prev, emptyPassenger(newId, isChild)])
  }

  const removePassenger = (id: number) => {
    if (passengers.length <= 1) return
    setPassengers((prev) => prev.filter((p) => p.id !== id))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    passengers.forEach((p) => {
      if (!p.name.trim()) newErrors[`${p.id}-name`] = t("Name is required", "नाम आवश्यक है")
      else if (p.name.trim().length < 3 || p.name.trim().length > 60)
        newErrors[`${p.id}-name`] = t("Please enter a valid name", "कृपया एक वैध नाम दर्ज करें")
      if (!p.age) newErrors[`${p.id}-age`] = t("Age is required", "आयु आवश्यक है")
      if (!p.gender) newErrors[`${p.id}-gender`] = t("Gender is required", "लिंग आवश्यक है")
    })

    if (!mobile.trim()) newErrors.mobile = t("Mobile number is required", "मोबाइल नंबर आवश्यक है")
    else if (!/^\d{10}$/.test(mobile.trim())) newErrors.mobile = t("Enter a valid 10-digit number", "वैध 10 अंकों का नंबर दर्ज करें")

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = t("Enter a valid email address", "वैध ईमेल पता दर्ज करें")

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      navigate("qr")
    }, 2000)
  }

  const notes = lang === 'en' ? notesEn : notesHi

  return (
    <div className="space-y-5 pb-8">
      {/* Booking date banner */}
      {bookingDate && (
        <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-secondary px-4 py-3 text-white shadow-sm">
          <Icon name="CalendarCheck" className="size-5" />
          <div>
            <p className="text-xs text-white/80">{t("Darshan Date", "दर्शन की तिथि")}</p>
            <p className="font-heading text-sm font-bold">{bookingDate}</p>
          </div>
          <button
            onClick={() => navigate("book")}
            className="ml-auto rounded-lg bg-white/20 px-3 py-1 text-xs font-semibold transition hover:bg-white/30"
          >
            {t("Change", "बदलें")}
          </button>
        </div>
      )}

      {/* Notes section */}
      <section className="rounded-2xl border border-border bg-card p-4">
        <p className="mb-2 flex items-center gap-2 font-heading text-sm font-bold text-primary">
          <Icon name="Info" className="size-4" />
          {t("Notes:", "नोट:")}
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          {notes.map((note, i) => (
            <li key={i} className="text-[13px] leading-relaxed text-muted-foreground">
              {note}
            </li>
          ))}
        </ol>
      </section>

      {/* Passenger details */}
      <section className="space-y-4">
        <h3 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
          <Icon name="Users" className="size-5 text-primary" />
          {t("Passenger Details", "यात्री विवरण")}
        </h3>

        {passengers.map((p, idx) => (
          <div
            key={p.id}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="font-heading text-sm font-bold text-foreground">
                {p.isChild ? t("Child", "बच्चा") : t("Passenger", "यात्री")} {idx + 1}
              </p>
              {passengers.length > 1 && (
                <button
                  onClick={() => removePassenger(p.id)}
                  className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-destructive transition hover:bg-red-50"
                >
                  <Icon name="Trash2" className="size-3.5" />
                  {t("Remove", "हटाएं")}
                </button>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="mb-1 block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {t("Full Name as per Govt. ID", "सरकारी पहचान पत्र के अनुसार पूरा नाम")}
              </label>
              <input
                type="text"
                placeholder={t("Enter full name", "पूरा नाम दर्ज करें")}
                value={p.name}
                onChange={(e) => updatePassenger(p.id, "name", e.target.value)}
                className={cn(errors[`${p.id}-name`] && "!border-red-400")}
              />
              {errors[`${p.id}-name`] && (
                <p className="mt-1 text-xs text-red-500">{errors[`${p.id}-name`]}</p>
              )}
            </div>

            {/* Age + Gender row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {t("Age", "आयु")}
                </label>
                <input
                  type="number"
                  placeholder={t("Age", "आयु")}
                  min={0}
                  max={120}
                  value={p.age}
                  onChange={(e) => updatePassenger(p.id, "age", e.target.value)}
                  className={cn(errors[`${p.id}-age`] && "!border-red-400")}
                />
                {errors[`${p.id}-age`] && (
                  <p className="mt-1 text-xs text-red-500">{errors[`${p.id}-age`]}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {t("Gender", "लिंग")}
                </label>
                <select
                  value={p.gender}
                  onChange={(e) => updatePassenger(p.id, "gender", e.target.value)}
                  className={cn(errors[`${p.id}-gender`] && "!border-red-400")}
                >
                  <option value="">{t("Select", "चुनें")}</option>
                  <option value="male">{t("Male", "पुरुष")}</option>
                  <option value="female">{t("Female", "महिला")}</option>
                  <option value="other">{t("Other", "अन्य")}</option>
                </select>
                {errors[`${p.id}-gender`] && (
                  <p className="mt-1 text-xs text-red-500">{errors[`${p.id}-gender`]}</p>
                )}
              </div>
            </div>

            {/* Nationality */}
            <div>
              <label className="mb-1 block text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {t("Nationality", "राष्ट्रीयता")}
              </label>
              <select
                value={p.nationality}
                onChange={(e) => updatePassenger(p.id, "nationality", e.target.value)}
              >
                <option value="India">India / भारत</option>
                <option value="Nepal">Nepal / नेपाल</option>
                <option value="Other">Other / अन्य</option>
              </select>
            </div>
          </div>
        ))}

        {/* Add passenger / child buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => addPassenger(false)}
            className="flex items-center gap-1.5 rounded-xl border border-primary bg-card px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-secondary active:scale-[0.98]"
          >
            <Icon name="Plus" className="size-4" />
            {t("Add Passenger", "यात्री जोड़ें")}
          </button>
          <button
            onClick={() => addPassenger(true)}
            className="flex items-center gap-1.5 rounded-xl border border-primary bg-card px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-secondary active:scale-[0.98]"
          >
            <Icon name="Baby" className="size-4" />
            {t("Add Child", "बच्चा जोड़ें")}
          </button>
        </div>

        <p className="text-xs text-muted-foreground italic">
          *{t("Children under 5 years of age shall be contact free and no purchase of any ticket is required.", "5 वर्ष से कम आयु के बच्चों के लिए टिकट की आवश्यकता नहीं है।")}
        </p>
      </section>

      {/* Contact details */}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm space-y-4">
        <h3 className="flex items-center gap-2 font-heading text-base font-bold text-foreground">
          <Icon name="Phone" className="size-5 text-primary" />
          {t("Contact Details", "संपर्क विवरण")}
        </h3>

        <p className="text-xs text-muted-foreground">
          {t("(Ticket details will be sent to email and registered mobile number)", "(टिकट विवरण ईमेल और पंजीकृत मोबाइल नंबर पर भेजे जाएंगे)")}
        </p>

        {/* Mobile */}
        <div>
          <label className="mb-1 block text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {t("Mobile Number", "मोबाइल नंबर")}
          </label>
          <div className="flex gap-2">
            <span className="flex items-center justify-center rounded-xl border border-border bg-secondary px-3 text-sm font-bold text-primary">
              +91
            </span>
            <input
              type="tel"
              placeholder={t("Enter 10-digit mobile number", "10 अंकों का मोबाइल नंबर दर्ज करें")}
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value)
                setErrors((prev) => { const n = { ...prev }; delete n.mobile; return n })
              }}
              maxLength={10}
              className={cn("flex-1", errors.mobile && "!border-red-400")}
            />
          </div>
          {errors.mobile && (
            <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {t("Email Address", "ईमेल पता")}
          </label>
          <input
            type="email"
            placeholder={t("Enter email address", "ईमेल पता दर्ज करें")}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setErrors((prev) => { const n = { ...prev }; delete n.email; return n })
            }}
            className={cn(errors.email && "!border-red-400")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
      </section>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary py-4 font-heading text-base font-bold text-white shadow-lg shadow-primary/20 transition active:scale-[0.99] disabled:opacity-60 hover:shadow-xl"
      >
        {isSubmitting ? (
          <>
            <span className="size-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            {t("Processing...", "संसाधित हो रहा है...")}
          </>
        ) : (
          <>
            {t("Confirm Booking", "बुकिंग की पुष्टि करें")}
            <Icon name="ArrowRight" className="size-5" />
          </>
        )}
      </button>
    </div>
  )
}
