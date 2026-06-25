"use client"

import { useState } from "react"
import { Icon } from "@/components/shared"
import { services } from "@/lib/data"
import { useLanguage } from "@/lib/contexts/LanguageContext"
import type { ScreenKey } from "@/lib/data"

const tints = [
  { bg: "bg-[#D97706]/10 border-[#D97706]/20", fg: "text-[#D97706]" },
  { bg: "bg-[#D4AF37]/10 border-[#D4AF37]/20", fg: "text-[#D4AF37]" },
  { bg: "bg-orange-500/10 border-orange-500/20", fg: "text-orange-500" },
  { bg: "bg-green-600/10 border-green-600/20", fg: "text-green-600" },
  { bg: "bg-blue-600/10 border-blue-600/20", fg: "text-blue-600" },
  { bg: "bg-purple-600/10 border-purple-600/20", fg: "text-purple-600" },
]

const touristPlaces = [
  {
    name: "Salasar Balaji Temple",
    hindi: "सालासर बालाजी मंदिर",
    desc: "Famous temple of Lord Hanuman, a major pilgrimage site in Rajasthan",
    descHi: "भगवान हनुमान का प्रसिद्ध मंदिर, राजस्थान का एक प्रमुख तीर्थ स्थल",
    distance: "57 km",
    icon: "Landmark",
    gradient: "from-orange-500 to-amber-500",
    tag: "Temple",
  },
  {
    name: "Ringas Junction",
    hindi: "रींगस जंक्शन",
    desc: "Nearest railway junction to Khatu Shyam, with good connectivity to major cities",
    descHi: "खाटू श्याम का निकटतम रेलवे जंक्शन, प्रमुख शहरों से अच्छी कनेक्टिविटी के साथ",
    distance: "17 km",
    icon: "TrainFront",
    gradient: "from-sky-500 to-blue-600",
    tag: "Transit",
  },
  {
    name: "Jeenmata Temple",
    hindi: "जीणमाता मंदिर",
    desc: "Ancient goddess temple nestled in Aravalli hills, over 1000 years old",
    descHi: "अरावली पहाड़ियों में स्थित प्राचीन देवी मंदिर, 1000 वर्ष से अधिक पुराना",
    distance: "29 km",
    icon: "Mountain",
    gradient: "from-rose-500 to-pink-600",
    tag: "Temple",
  },
  {
    name: "Shyam Kund",
    hindi: "श्याम कुंड",
    desc: "Sacred pond near the temple where devotees take a holy dip before darshan",
    descHi: "मंदिर के पास पवित्र तालाब जहां भक्त दर्शन से पहले पवित्र स्नान करते हैं",
    distance: "0.5 km",
    icon: "Droplets",
    gradient: "from-teal-500 to-cyan-600",
    tag: "Sacred Site",
  },
  {
    name: "Sikar City",
    hindi: "सीकर शहर",
    desc: "Historic trading city with vibrant bazaars, famous for silver jewelry and sweets",
    descHi: "ऐतिहासिक व्यापारिक शहर चाँदी के गहनों और मिठाइयों के लिए प्रसिद्ध",
    distance: "43 km",
    icon: "ShoppingBag",
    gradient: "from-violet-500 to-purple-600",
    tag: "City",
  },
  {
    name: "Luhgarh Fort",
    hindi: "लुहगढ़ किला",
    desc: "Ancient fort ruins offering panoramic views of the surrounding landscape",
    descHi: "प्राचीन किले के अवशेष जो आसपास के परिदृश्य का मनोरम दृश्य प्रदान करते हैं",
    distance: "22 km",
    icon: "Castle",
    gradient: "from-yellow-600 to-orange-600",
    tag: "Heritage",
  },
]

export function ServicesScreen({ navigate }: { navigate?: (s: ScreenKey) => void }) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<"services" | "tourist">("services")
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null)

  return (
    <div className="space-y-6 pb-8">
      {/* Heading */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {t("Khatu Dham", "खाटू धाम")}
          </p>
          <h1 className="font-heading text-2xl font-bold leading-tight text-foreground mt-1">
            {t("Services & Places", "सेवाएं और स्थान")}
          </h1>
          <p className="text-xs font-medium text-muted-foreground mt-1">
            {t("Everything you need for your pilgrimage", "यात्रा के लिए सब कुछ")}
          </p>
        </div>
        <span className="grid size-12 place-items-center rounded-2xl border border-primary/20 bg-secondary shadow-sm text-primary">
          <Icon name="LayoutGrid" className="size-6" />
        </span>
      </header>

      {/* Tabs */}
      <div className="flex rounded-2xl bg-secondary/60 p-1.5 gap-1">
        <button
          onClick={() => setActiveTab("services")}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all duration-200 ${
            activeTab === "services"
              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon name="LayoutGrid" className="size-4" />
          {t("Services", "सेवाएं")}
        </button>
        <button
          onClick={() => setActiveTab("tourist")}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all duration-200 ${
            activeTab === "tourist"
              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon name="MapPin" className="size-4" />
          {t("Tourist Places", "पर्यटन स्थल")}
        </button>
      </div>

      {/* Services Tab */}
      {activeTab === "services" && (
        <>
          <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            {services.map((s, i) => {
              const tColor = tints[i % tints.length]
              const isComingSoon = !s.screenKey
              return (
                <button
                  key={s.key}
                  onClick={() => s.screenKey && navigate && navigate(s.screenKey)}
                  disabled={isComingSoon}
                  className={`group flex w-full items-center gap-4 border-b border-border/50 px-5 py-4 text-left transition last:border-0 ${
                    isComingSoon ? "opacity-70 cursor-not-allowed" : "hover:bg-secondary/30 active:bg-secondary/50"
                  }`}
                >
                  <span className={`grid size-12 shrink-0 place-items-center rounded-[1rem] border ${tColor.bg} ${tColor.fg} shadow-inner`}>
                    <Icon name={s.icon} className="size-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading text-[15px] font-bold text-foreground">{t(s.label, s.hindi)}</span>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-primary border border-primary/10">
                        {s.meta}
                      </span>
                      {isComingSoon && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground border border-border">
                          {t("Soon", "जल्द")}
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block truncate text-xs text-muted-foreground">{t(s.desc, s.desc)}</span>
                  </span>
                  {!isComingSoon && (
                    <Icon
                      name="ChevronRight"
                      className="size-5 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary"
                    />
                  )}
                </button>
              )
            })}
          </section>

          <section className="flex items-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/5 p-5 shadow-sm">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-green-100 text-green-600 shadow-inner">
              <Icon name="ShieldCheck" className="size-5" />
            </span>
            <p className="text-xs leading-relaxed text-green-800 font-medium">
              {t("All services are verified by the Shri Shyam Mandir Committee for a safe and trusted experience.", "सुरक्षित अनुभव के लिए सभी सेवाएं श्री श्याम मंदिर समिति द्वारा सत्यापित हैं।")}
            </p>
          </section>
        </>
      )}

      {/* Tourist Places Tab */}
      {activeTab === "tourist" && (
        <div className="space-y-5">
          <div className="flex items-start gap-3 rounded-2xl bg-primary/5 border border-primary/20 p-4">
            <Icon name="Info" className="size-5 shrink-0 text-primary mt-0.5" />
            <p className="text-xs text-foreground leading-relaxed font-medium">
              {t("Explore the spiritual and historical heritage around Khatu Shyam Ji.", "खाटू श्याम जी के आसपास आध्यात्मिक और ऐतिहासिक विरासत की खोज करें।")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {touristPlaces.map((place, i) => (
              <div
                key={place.name}
                className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Image / visual banner */}
                <div className={`relative h-36 bg-gradient-to-br ${place.gradient} flex items-center justify-center`}>
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(/images/mandala-pattern.png)", backgroundSize: "120px" }} />
                  <span className="grid size-16 place-items-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                    <Icon name={place.icon} className="size-8 text-white drop-shadow-lg" />
                  </span>
                  <span className="absolute top-3 right-3 rounded-full bg-black/25 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white border border-white/20">
                    {place.tag}
                  </span>
                  <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/25 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white">
                    <Icon name="MapPin" className="size-3" />
                    {place.distance}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-heading text-base font-bold text-foreground leading-tight">
                    {t(place.name, place.hindi)}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {t(place.desc, place.descHi)}
                  </p>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => setSelectedPlace(selectedPlace === i ? null : i)}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-primary/20 bg-secondary py-2 text-xs font-bold text-primary transition hover:bg-primary/10"
                    >
                      <Icon name={selectedPlace === i ? "ChevronUp" : "ChevronDown"} className="size-3.5" />
                      {t("Details", "विवरण")}
                    </button>
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(place.name + " Rajasthan")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-secondary py-2 text-xs font-bold text-white shadow-sm transition hover:shadow-md"
                    >
                      <Icon name="Map" className="size-3.5" />
                      {t("Directions", "दिशा-निर्देश")}
                    </a>
                  </div>

                  {selectedPlace === i && (
                    <div className="mt-3 rounded-xl bg-secondary/50 p-3 border border-border animate-in slide-in-from-top-1 duration-200">
                      <p className="text-xs text-foreground leading-relaxed font-medium">
                        {t(place.desc, place.descHi)}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Icon name="Navigation" className="size-3.5 text-primary" />
                        <span>{t("Distance from Khatu Shyam:", "खाटू श्याम से दूरी:")} <span className="font-bold text-foreground">{place.distance}</span></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Explore CTA */}
          <section className="rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#D97706]/10 via-[#D4AF37]/5 to-card p-6 text-center shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(/images/mandala-pattern.png)", backgroundSize: "150px" }} />
            <div className="relative">
              <span className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-xl mx-auto mb-4">
                <Icon name="Compass" className="size-7" />
              </span>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {t("Plan Your Full Itinerary", "अपनी पूरी यात्रा योजना बनाएं")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t("Combine your darshan with visits to nearby spiritual and heritage sites.", "अपने दर्शन को पास के आध्यात्मिक और विरासत स्थलों की यात्रा के साथ जोड़ें।")}
              </p>
              <button
                onClick={() => navigate && navigate("reach")}
                className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:shadow-xl active:scale-[0.98]"
              >
                <Icon name="MapPin" className="size-4" />
                {t("How to Reach Khatu", "खाटू कैसे पहुंचें")}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
