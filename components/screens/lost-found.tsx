"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Icon, Ornament } from "@/components/shared"
import { useLanguage } from "@/lib/contexts/LanguageContext"
import type { ScreenKey } from "@/lib/data"

const foundItems = [
  { id: "LF-001", item: "Blue Handbag", hindi: "नीला हैंडबैग", desc: "Found near Prasad Counter · 25 Jun 2026", location: "Prasad Counter", icon: "ShoppingBag", color: "bg-blue-50 text-blue-600" },
  { id: "LF-002", item: "Silver Anklet", hindi: "चांदी की पायल", desc: "Found at Main Sanctum Exit · 24 Jun 2026", location: "Main Sanctum", icon: "Gem", color: "bg-gray-50 text-gray-600" },
  { id: "LF-003", item: "Child's Kurta (Red)", hindi: "बच्चे का लाल कुर्ता", desc: "Found at Queue Complex · 24 Jun 2026", location: "Queue Complex", icon: "Shirt", color: "bg-red-50 text-red-600" },
  { id: "LF-004", item: "Samsung Phone", hindi: "सैमसंग फोन", desc: "Found at Parking Lot B · 23 Jun 2026", location: "Parking Lot B", icon: "Smartphone", color: "bg-indigo-50 text-indigo-600" },
  { id: "LF-005", item: "Reading Glasses", hindi: "चश्मा", desc: "Found near Temple Steps · 23 Jun 2026", location: "Temple Steps", icon: "Glasses", color: "bg-yellow-50 text-yellow-600" },
]

export function LostFoundScreen({ navigate }: { navigate: (s: ScreenKey) => void }) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<"found" | "report">("found")
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    itemName: "",
    description: "",
    date: "",
    location: "",
    phone: "",
    color: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ itemName: "", description: "", date: "", location: "", phone: "", color: "" })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="space-y-5 pb-10">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#D97706] to-[#D4AF37] p-6 text-white shadow-lg">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(/images/mandala-pattern.png)", backgroundSize: "180px" }} />
        <div className="relative flex items-start justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold">{t("Lost & Found", "खोया और पाया")}</h1>
            <p className="text-sm text-white/80 mt-1">{t("Reuniting devotees with their belongings", "भक्तों को उनकी वस्तुएं वापस दिलाना")}</p>
          </div>
          <span className="grid size-12 place-items-center rounded-2xl bg-white/20 border border-white/20">
            <Icon name="PackageSearch" className="size-6" />
          </span>
        </div>
        {/* Helpline */}
        <a href="tel:01576-230011" className="relative mt-4 flex items-center gap-2 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/15 px-4 py-2.5">
          <Icon name="Phone" className="size-4 text-white" />
          <div>
            <p className="text-[10px] text-white/70 uppercase tracking-wider">{t("Lost & Found Helpline", "खोया पाया हेल्पलाइन")}</p>
            <p className="text-sm font-bold text-white">01576-230011</p>
          </div>
        </a>
      </section>

      {/* Tabs */}
      <div className="flex rounded-2xl bg-secondary/60 p-1.5 gap-1">
        <button
          onClick={() => setActiveTab("found")}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all duration-200 ${
            activeTab === "found"
              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon name="Search" className="size-4" />
          {t("Found Items", "पाई गई वस्तुएं")}
        </button>
        <button
          onClick={() => setActiveTab("report")}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all duration-200 ${
            activeTab === "report"
              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon name="TriangleAlert" className="size-4" />
          {t("Report Lost", "खोई वस्तु दर्ज करें")}
        </button>
      </div>

      {/* Found Items List */}
      {activeTab === "found" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 rounded-2xl bg-green-50 border border-green-200 px-4 py-3">
            <Icon name="Info" className="size-4 text-green-600 shrink-0" />
            <p className="text-xs text-green-700 font-medium">
              {t("Items found in the last 7 days. Visit the Lost & Found desk at Gate 2 with ID proof.", "पिछले 7 दिनों में मिली वस्तुएं। आईडी प्रूफ के साथ गेट 2 पर खोया-पाया डेस्क पर आएं।")}
            </p>
          </div>

          {foundItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm"
            >
              <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${item.color}`}>
                <Icon name={item.icon} className="size-6" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-sm text-foreground truncate">{t(item.item, item.hindi)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Icon name="MapPin" className="size-3 text-primary" />
                  <span className="text-[10px] font-semibold text-primary">{item.location}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground bg-secondary rounded-lg px-2 py-1">{item.id}</span>
            </motion.div>
          ))}

          <Ornament />

          <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <h3 className="font-heading text-sm font-bold text-foreground mb-2">{t("Lost & Found Desk", "खोया-पाया डेस्क")}</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Icon name="MapPin" className="size-3.5 text-primary" />{t("Gate 2, Near Medical Camp", "गेट 2, मेडिकल कैंप के पास")}</div>
              <div className="flex items-center gap-2"><Icon name="Clock" className="size-3.5 text-primary" />{t("Open: 5:00 AM – 10:00 PM", "खुलने का समय: सुबह 5 बजे – रात 10 बजे")}</div>
              <div className="flex items-center gap-2"><Icon name="Phone" className="size-3.5 text-primary" />01576-230011</div>
            </div>
          </section>
        </div>
      )}

      {/* Report Lost Item Form */}
      {activeTab === "report" && (
        <div className="space-y-4">
          <AnimatePresence>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-3 rounded-3xl border border-green-200 bg-green-50 p-6 text-center shadow-sm"
              >
                <span className="grid size-14 place-items-center rounded-full bg-green-100 text-green-600">
                  <Icon name="CheckCircle" className="size-7" />
                </span>
                <h3 className="font-heading text-base font-bold text-green-700">
                  {t("Report Submitted!", "रिपोर्ट दर्ज हो गई!")}
                </h3>
                <p className="text-xs text-green-600 leading-relaxed">
                  {t("Our team will contact you at your number if your item is found. Reference: LF-2026-0628", "हमारी टीम वस्तु मिलने पर आपके नंबर पर संपर्क करेगी। संदर्भ: LF-2026-0628")}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="rounded-2xl bg-primary/5 border border-primary/20 px-4 py-3">
                  <p className="text-xs text-foreground font-medium">
                    {t("Fill in as many details as possible. Our security team will search and contact you.", "जितनी अधिक जानकारी हो सकती है भरें। हमारी सुरक्षा टीम खोज करेगी और संपर्क करेगी।")}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">{t("Item Name *", "वस्तु का नाम *")}</label>
                  <input
                    type="text"
                    required
                    placeholder={t("e.g. Blue wallet, Gold ring...", "जैसे नीला बटुआ, सोने की अंगूठी...")}
                    value={form.itemName}
                    onChange={e => setForm({ ...form, itemName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">{t("Color / Description *", "रंग / विवरण *")}</label>
                  <input
                    type="text"
                    required
                    placeholder={t("Color, brand, size, markings...", "रंग, ब्रांड, आकार, निशान...")}
                    value={form.color}
                    onChange={e => setForm({ ...form, color: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">{t("Where was it lost? *", "कहाँ खोया? *")}</label>
                  <select
                    required
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                  >
                    <option value="">{t("Select location", "स्थान चुनें")}</option>
                    {["Main Sanctum", "Queue Complex", "Prasad Counter", "Parking Lot A", "Parking Lot B", "Gate 1", "Gate 2", "Gate 3", "Shyam Kund", "Other"].map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">{t("Date of Loss *", "खोने की तारीख *")}</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">{t("Your Phone Number *", "आपका फोन नंबर *")}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">{t("Additional Details", "अतिरिक्त जानकारी")}</label>
                  <textarea
                    rows={2}
                    placeholder={t("Any other helpful details...", "कोई अन्य उपयोगी जानकारी...")}
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    className="resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#D97706] to-[#D4AF37] py-3.5 font-heading text-sm font-bold text-white shadow-md transition hover:shadow-lg active:scale-[0.98]"
                >
                  <Icon name="Send" className="size-4" />
                  {t("Submit Report", "रिपोर्ट दर्ज करें")}
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}