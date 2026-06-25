 "use client"
 
 import { useState, useEffect } from "react"
 import { motion, AnimatePresence } from "framer-motion"
 import { Icon } from "@/components/shared"
 import { useLanguage } from "@/lib/contexts/LanguageContext"
 import { useAudio } from "@/lib/contexts/AudioContext"
 
 type Stage = {
   id: number
   nameEn: string
   nameHi: string
   distanceLeft: number
   descEn: string
   descHi: string
   bgImage: string
   activityEn: string
   activityHi: string
 }
 
 const STAGES: Stage[] = [
   {
     id: 1,
     nameEn: "Ringas Desert Route",
     nameHi: "à¤°à¥€à¤‚à¤—à¤¸ à¤®à¤°à¥à¤­à¥‚à¤®à¤¿ à¤®à¤¾à¤°à¥à¤—",
     distanceLeft: 17,
     descEn: "Start of your spiritual Padyatra. Walk through the scenic desert sands with the chant of Shyam Baba.",
     descHi: "à¤†à¤ªà¤•à¥€ à¤†à¤§à¥à¤¯à¤¾à¤¤à¥à¤®à¤¿à¤• à¤ªà¤¦à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤•à¥€ à¤¶à¥à¤°à¥à¤†à¤¤à¥¤ à¤¶à¥à¤¯à¤¾à¤® à¤¬à¤¾à¤¬à¤¾ à¤•à¥‡ à¤œà¤¯à¤•à¤¾à¤°à¥‹à¤‚ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤¸à¥à¤¨à¤¹à¤°à¥€ à¤°à¥‡à¤¤ à¤•à¥‡ à¤¬à¥€à¤š à¤šà¤²à¥‡à¤‚à¥¤",
     bgImage: "linear-gradient(to bottom, #d97706, #78350f)",
     activityEn: "Chant 'Jai Shree Shyam' and start your journey.",
     activityHi: "'à¤œà¤¯ à¤¶à¥à¤°à¥€ à¤¶à¥à¤¯à¤¾à¤®' à¤•à¤¾ à¤œà¤¾à¤ª à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤…à¤ªà¤¨à¥€ à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤¶à¥à¤°à¥‚ à¤•à¤°à¥‡à¤‚à¥¤"
   },
   {
     id: 2,
     nameEn: "Rajasthan Village Path",
     nameHi: "à¤°à¤¾à¤œà¤¸à¥à¤¥à¤¾à¤¨à¥€ à¤—à¥à¤°à¤¾à¤®à¥€à¤£ à¤ªà¤¥",
     distanceLeft: 14,
     descEn: "Pass through traditional village pathways filled with devotional stalls offering water and prasad.",
     descHi: "à¤ªà¤¾à¤°à¤‚à¤ªà¤°à¤¿à¤• à¤—à¥à¤°à¤¾à¤®à¥€à¤£ à¤°à¤¾à¤¸à¥à¤¤à¥‹à¤‚ à¤¸à¥‡ à¤—à¥à¤œà¤°à¥‡à¤‚ à¤œà¤¹à¤¾à¤‚ à¤­à¤•à¥à¤¤ à¤ªà¤¾à¤¨à¥€, à¤šà¤¾à¤¯ à¤”à¤° à¤ªà¥à¤°à¤¸à¤¾à¤¦ à¤•à¥€ à¤¸à¥‡à¤µà¤¾ à¤•à¤° à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚à¥¤",
     bgImage: "linear-gradient(to bottom, #b45309, #451a03)",
     activityEn: "Accept refreshment from a devotee and keep moving.",
     activityHi: "à¤­à¤•à¥à¤¤à¥‹à¤‚ à¤¸à¥‡ à¤œà¤²-à¤ªà¤¾à¤¨ à¤¸à¥à¤µà¥€à¤•à¤¾à¤° à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤†à¤—à¥‡ à¤¬à¤¢à¤¼à¥‡à¤‚à¥¤"
   },
   {
     id: 3,
     nameEn: "Shyam Kund & Bazaar",
     nameHi: "à¤¶à¥à¤¯à¤¾à¤® à¤•à¥à¤‚à¤¡ à¤”à¤° à¤¬à¤¾à¤œà¤¾à¤°",
     distanceLeft: 8,
     descEn: "Reach the sacred Shyam Kund. The vibrant temple market is decorated with flags, flowers, and coconuts.",
     descHi: "à¤ªà¤µà¤¿à¤¤à¥à¤° à¤¶à¥à¤¯à¤¾à¤® à¤•à¥à¤‚à¤¡ à¤ªà¤¹à¥à¤‚à¤šà¥‡à¤‚à¥¤ à¤°à¤‚à¤—-à¤¬à¤¿à¤°à¤‚à¤—à¥‡ à¤à¤‚à¤¡à¥‹à¤‚, à¤«à¥‚à¤²à¥‹à¤‚ à¤”à¤° à¤¨à¤¾à¤°à¤¿à¤¯à¤² à¤¸à¥‡ à¤¸à¤œà¤¾ à¤¹à¥à¤† à¤¸à¥à¤‚à¤¦à¤° à¤¬à¤¾à¤œà¤¾à¤° à¤†à¤ªà¤•à¤¾ à¤¸à¥à¤µà¤¾à¤—à¤¤ à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆà¥¤",
     bgImage: "linear-gradient(to bottom, #854d0e, #3f2c00)",
     activityEn: "Perform ritual cleansing at Shyam Kund and buy a Nishan (Holy Flag).",
     activityHi: "à¤ªà¤µà¤¿à¤¤à¥à¤° à¤¶à¥à¤¯à¤¾à¤® à¤•à¥à¤‚à¤¡ à¤®à¥‡à¤‚ à¤†à¤šà¤®à¤¨ à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤¬à¤¾à¤¬à¤¾ à¤•à¤¾ à¤¨à¤¿à¤¶à¤¾à¤¨ (à¤§à¥à¤µà¤œ) à¤–à¤°à¥€à¤¦à¥‡à¤‚à¥¤"
   },
   {
     id: 4,
     nameEn: "Temple Toran Dwar",
     nameHi: "à¤®à¤‚à¤¦à¤¿à¤° à¤¤à¥‹à¤°à¤£ à¤¦à¥à¤µà¤¾à¤°",
     distanceLeft: 3,
     descEn: "The majestic golden entrance gate. The crowd swells here in anticipation of Baba's darshan.",
     descHi: "à¤­à¤µà¥à¤¯ à¤¸à¥à¤µà¤°à¥à¤£ à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤¦à¥à¤µà¤¾à¤°à¥¤ à¤¬à¤¾à¤¬à¤¾ à¤•à¥‡ à¤¦à¤°à¥à¤¶à¤¨ à¤•à¥€ à¤‰à¤¤à¥à¤¸à¥à¤•à¤¤à¤¾ à¤®à¥‡à¤‚ à¤¯à¤¹à¤¾à¤‚ à¤­à¤•à¥à¤¤à¥‹à¤‚ à¤•à¤¾ à¤¸à¥ˆà¤²à¤¾à¤¬ à¤‰à¤®à¤¡à¤¼à¤¤à¤¾ à¤¹à¥ˆà¥¤",
     bgImage: "linear-gradient(to bottom, #78350f, #270e00)",
     activityEn: "Offer salutations at the Toran Dwar and carry the Nishan high.",
     activityHi: "à¤¤à¥‹à¤°à¤£ à¤¦à¥à¤µà¤¾à¤° à¤•à¥‹ à¤¨à¤®à¤¨ à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤¨à¤¿à¤¶à¤¾à¤¨ à¤•à¥‹ à¤—à¤°à¥à¤µ à¤¸à¥‡ à¤Šà¤‚à¤šà¤¾ à¤‰à¤ à¤¾à¤à¤‚à¥¤"
   },
   {
     id: 5,
     nameEn: "Temple Courtyard",
     nameHi: "à¤®à¤‚à¤¦à¤¿à¤° à¤ªà¥à¤°à¤¾à¤‚à¤—à¤£",
     distanceLeft: 0.5,
     descEn: "Enter the marble-tiled inner courtyard. The atmosphere is charged with bells ringing and emotional chants.",
     descHi: "à¤¸à¤‚à¤—à¤®à¤°à¤®à¤° à¤¸à¥‡ à¤¸à¤œà¥‡ à¤†à¤‚à¤¤à¤°à¤¿à¤• à¤ªà¥à¤°à¤¾à¤‚à¤—à¤£ à¤®à¥‡à¤‚ à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤•à¤°à¥‡à¤‚à¥¤ à¤šà¤¾à¤°à¥‹à¤‚ à¤¤à¤°à¤« à¤˜à¤‚à¤Ÿà¤¿à¤¯à¥‹à¤‚ à¤•à¥€ à¤†à¤µà¤¾à¤œ à¤”à¤° à¤­à¤¾à¤µà¥à¤• à¤•à¤° à¤¦à¥‡à¤¨à¥‡ à¤µà¤¾à¤²à¥‡ à¤œà¤¯à¤•à¤¾à¤°à¥‡ à¤—à¥‚à¤‚à¤œ à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚à¥¤",
     bgImage: "linear-gradient(to bottom, #451a03, #1c0a00)",
     activityEn: "Join the line in the temple queue and wait for the doors to open.",
     activityHi: "à¤¦à¤°à¥à¤¶à¤¨ à¤•à¥€ à¤•à¤¤à¤¾à¤° à¤®à¥‡à¤‚ à¤¶à¤¾à¤®à¤¿à¤² à¤¹à¥‹à¤‚ à¤”à¤° à¤¬à¤¾à¤¬à¤¾ à¤•à¥‡ à¤•à¤ªà¤¾à¤Ÿ à¤–à¥à¤²à¤¨à¥‡ à¤•à¥€ à¤ªà¥à¤°à¤¤à¥€à¤•à¥à¤·à¤¾ à¤•à¤°à¥‡à¤‚à¥¤"
   },
   {
     id: 6,
     nameEn: "Shree Shyam Darbar",
     nameHi: "à¤¶à¥à¤°à¥€ à¤¶à¥à¤¯à¤¾à¤® à¤¦à¤°à¤¬à¤¾à¤° (à¤®à¥à¤–à¥à¤¯ à¤—à¤°à¥à¤­à¤—à¥ƒà¤¹)",
     distanceLeft: 0,
     descEn: "Standing face to face with the mesmerizing, flower-adorned divine form of Lord Khatu Shyam Ji.",
     descHi: "à¤…à¤¦à¥à¤­à¥à¤¤ à¤”à¤° à¤¸à¥à¤—à¤‚à¤§à¤¿à¤¤ à¤«à¥‚à¤²à¥‹à¤‚ à¤¸à¥‡ à¤¸à¤œà¥‡ à¤­à¤—à¤µà¤¾à¤¨ à¤¶à¥à¤°à¥€ à¤–à¤¾à¤Ÿà¥‚ à¤¶à¥à¤¯à¤¾à¤® à¤œà¥€ à¤•à¥‡ à¤…à¤²à¥Œà¤•à¤¿à¤• à¤µà¤¿à¤—à¥à¤°à¤¹ à¤•à¥‡ à¤¸à¤®à¥à¤®à¥à¤– à¤¸à¤¾à¤•à¥à¤·à¤¾à¤¤ à¤¦à¤°à¥à¤¶à¤¨à¥¤",
     bgImage: "linear-gradient(to bottom, #78350f, #0d0907)",
     activityEn: "Offer your prayers and seek divine blessings.",
     activityHi: "à¤¬à¤¾à¤¬à¤¾ à¤•à¥‡ à¤šà¤°à¤£à¥‹à¤‚ à¤®à¥‡à¤‚ à¤¶à¥€à¤¶ à¤¨à¤µà¤¾à¤à¤‚ à¤”à¤° à¤‰à¤¨à¤•à¤¾ à¤†à¤¶à¥€à¤°à¥à¤µà¤¾à¤¦ à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤•à¤°à¥‡à¤‚à¥¤"
   }
 ]
 
 type DevotionalItem = {
   id: string
   titleEn: string
   titleHi: string
   type: "aarti" | "chalisa" | "bhajan"
   lyricsEn: string
   lyricsHi: string
 }
 
 const DEVOTIONAL_ITEMS: DevotionalItem[] = [
   {
     id: "aarti",
     titleEn: "Shri Shyam Aarti",
     titleHi: "à¤¶à¥à¤°à¥€ à¤¶à¥à¤¯à¤¾à¤® à¤†à¤°à¤¤à¥€",
     type: "aarti",
     lyricsEn: `Om Jai Shri Shyam Hare, Baba Jai Shri Shyam Hare...
 Bhakt Jano Ke Sankat, Kshan Mein Door Kare...
 Om Jai Shri Shyam Hare...
 
 Shyam Sundar Mukh Aravinda, Chavi Ati Pyari Lage...
 Kamal Nayan Vishala, Shobha Man Bhave...
 Om Jai Shri Shyam Hare...`,
     lyricsHi: `à¥ à¤œà¤¯ à¤¶à¥à¤°à¥€ à¤¶à¥à¤¯à¤¾à¤® à¤¹à¤°à¥‡, à¤¬à¤¾à¤¬à¤¾ à¤œà¤¯ à¤¶à¥à¤°à¥€ à¤¶à¥à¤¯à¤¾à¤® à¤¹à¤°à¥‡à¥¤
 à¤­à¤•à¥à¤¤ à¤œà¤¨à¥‹à¤‚ à¤•à¥‡ à¤¸à¤‚à¤•à¤Ÿ, à¤•à¥à¤·à¤£ à¤®à¥‡à¤‚ à¤¦à¥‚à¤° à¤•à¤°à¥‡à¥¥
 à¥ à¤œà¤¯ à¤¶à¥à¤°à¥€ à¤¶à¥à¤¯à¤¾à¤® à¤¹à¤°à¥‡...
 
 à¤¶à¥à¤¯à¤¾à¤® à¤¸à¥à¤‚à¤¦à¤° à¤®à¥à¤– à¤…à¤°à¤µà¤¿à¤¨à¥à¤¦, à¤›à¤µà¤¿ à¤…à¤¤à¤¿ à¤ªà¥à¤¯à¤¾à¤°à¥€ à¤²à¤¾à¤—à¥‡à¥¤
 à¤•à¤®à¤² à¤¨à¤¯à¤¨ à¤µà¤¿à¤¶à¤¾à¤²à¤¾, à¤¶à¥‹à¤­à¤¾ à¤®à¤¨ à¤­à¤¾à¤µà¥‡à¥¥
 à¥ à¤œà¤¯ à¤¶à¥à¤°à¥€ à¤¶à¥à¤¯à¤¾à¤® à¤¹à¤°à¥‡...`
   },
   {
     id: "chalisa",
     titleEn: "Shree Shyam Chalisa",
     titleHi: "à¤¶à¥à¤°à¥€ à¤¶à¥à¤¯à¤¾à¤® à¤šà¤¾à¤²à¥€à¤¸à¤¾",
     type: "chalisa",
     lyricsEn: `Shree Guru Charan Pratap Se, Buddhi Kanti Bal Hoye...
 Shyam Dev Ke Yash Karan, Kahoon Harshit Hoye...
 Jai Jai Khatu Shyam Dev, Jai Jai Khatu Dham...
 Dwar Tihare Jo Aave, Sidh Hoye Sab Kaam...`,
     lyricsHi: `à¤¶à¥à¤°à¥€ à¤—à¥à¤°à¥ à¤šà¤°à¤£ à¤ªà¥à¤°à¤¤à¤¾à¤ª à¤¸à¥‡, à¤¬à¥à¤¦à¥à¤§à¤¿ à¤•à¤¾à¤‚à¤¤à¤¿ à¤¬à¤² à¤¹à¥‹à¤¯à¥¤
 à¤¶à¥à¤¯à¤¾à¤® à¤¦à¥‡à¤µ à¤•à¥‡ à¤¯à¤¶ à¤•à¤°à¤¨, à¤•à¤¹à¥‚à¤ à¤¹à¤°à¥à¤·à¤¿à¤¤ à¤¹à¥‹à¤¯à¥¥
 à¤œà¤¯ à¤œà¤¯ à¤–à¤¾à¤Ÿà¥‚ à¤¶à¥à¤¯à¤¾à¤® à¤¦à¥‡à¤µ, à¤œà¤¯ à¤œà¤¯ à¤–à¤¾à¤Ÿà¥‚ à¤§à¤¾à¤®à¥¤
 à¤¦à¥à¤µà¤¾à¤° à¤¤à¤¿à¤¹à¤¾à¤°à¥‡ à¤œà¥‹ à¤†à¤µà¥‡, à¤¸à¤¿à¤¦à¥à¤§ à¤¹à¥‹à¤¯ à¤¸à¤¬ à¤•à¤¾à¤®à¥¥`
   },
   {
     id: "bhajan",
     titleEn: "Hare Ka Sahara",
     titleHi: "à¤¹à¤¾à¤°à¥‡ à¤•à¤¾ à¤¸à¤¹à¤¾à¤°à¤¾ à¤¬à¤¾à¤¬à¤¾",
     type: "bhajan",
     lyricsEn: `Hare ka sahara Baba Shyam hamara...
 Jab duniya thukraye mujhe, tab tune hi to sambhala...
 Meri naiya beech bhanwar mein, Khatu wale tune nikala...
 Hare ka sahara Baba Shyam hamara...`,
     lyricsHi: `à¤¹à¤¾à¤°à¥‡ à¤•à¤¾ à¤¸à¤¹à¤¾à¤°à¤¾ à¤¬à¤¾à¤¬à¤¾ à¤¶à¥à¤¯à¤¾à¤® à¤¹à¤®à¤¾à¤°à¤¾à¥¤
 à¤œà¤¬ à¤¦à¥à¤¨à¤¿à¤¯à¤¾ à¤ à¥à¤•à¤°à¤¾à¤ à¤®à¥à¤à¥‡, à¤¤à¤¬ à¤¤à¥‚à¤¨à¥‡ à¤¹à¥€ à¤¤à¥‹ à¤¸à¤‚à¤­à¤¾à¤²à¤¾à¥¥
 à¤®à¥‡à¤°à¥€ à¤¨à¥ˆà¤¯à¤¾ à¤¬à¥€à¤š à¤­à¤‚à¤µà¤° à¤®à¥‡à¤‚, à¤–à¤¾à¤Ÿà¥‚ à¤µà¤¾à¤²à¥‡ à¤¤à¥‚à¤¨à¥‡ à¤¨à¤¿à¤•à¤¾à¤²à¤¾à¥¤
 à¤¹à¤¾à¤°à¥‡ à¤•à¤¾ à¤¸à¤¹à¤¾à¤°à¤¾ à¤¬à¤¾à¤¬à¤¾ à¤¶à¥à¤¯à¤¾à¤® à¤¹à¤®à¤¾à¤°à¤¾à¥¥`
   }
 ]
 
 export function KhatuPathScreen({ navigate }: { navigate: (s: any) => void }) {
   const { lang, t } = useLanguage()
   const { playTempleBell, soundEnabled, setSoundEnabled } = useAudio()
   
   const [activeTab, setActiveTab] = useState<"padyatra" | "devotional" | "jaap">("padyatra")
   const [currentStageIndex, setCurrentStageIndex] = useState(0)
   const [chants, setChants] = useState(0)
   const [activeLyrics, setActiveLyrics] = useState<DevotionalItem | null>(null)
   const [playStatus, setPlayStatus] = useState<Record<string, boolean>>({})
 
   // Load progress on mount
   useEffect(() => {
     if (typeof window !== "undefined") {
       const savedIndex = localStorage.getItem("khatu_path_stage")
       if (savedIndex) {
         setCurrentStageIndex(Number(savedIndex))
       }
       const savedChants = localStorage.getItem("khatu_path_chants")
       if (savedChants) {
         setChants(Number(savedChants))
       }
     }
   }, [])
 
   const handleNextStage = () => {
     if (currentStageIndex < STAGES.length - 1) {
       const nextIndex = currentStageIndex + 1
       setCurrentStageIndex(nextIndex)
       localStorage.setItem("khatu_path_stage", String(nextIndex))
       try {
         playTempleBell("single")
       } catch (e) {}
     } else {
       // Completed, redirect to live darshan or home
       alert(t("Congratulations! You have completed your spiritual Padyatra and reached Shree Shyam Darbar.", "à¤¬à¤§à¤¾à¤ˆ à¤¹à¥‹! à¤†à¤ªà¤¨à¥‡ à¤…à¤ªà¤¨à¥€ à¤†à¤§à¥à¤¯à¤¾à¤¤à¥à¤®à¤¿à¤• à¤ªà¤¦à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤ªà¥‚à¤°à¥€ à¤•à¤° à¤²à¥€ à¤¹à¥ˆ à¤”à¤° à¤¶à¥à¤°à¥€ à¤¶à¥à¤¯à¤¾à¤® à¤¦à¤°à¤¬à¤¾à¤° à¤ªà¤¹à¥à¤‚à¤š à¤—à¤ à¤¹à¥ˆà¤‚à¥¤"))
       navigate("live-darshan")
     }
   }
 
   const handleResetJourney = () => {
     if (confirm(t("Are you sure you want to restart your journey from Ringas?", "à¤•à¥à¤¯à¤¾ à¤†à¤ª à¤µà¤¾à¤•à¤ˆ à¤°à¥€à¤‚à¤—à¤¸ à¤¸à¥‡ à¤…à¤ªà¤¨à¥€ à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤«à¤¿à¤° à¤¸à¥‡ à¤¶à¥à¤°à¥‚ à¤•à¤°à¤¨à¤¾ à¤šà¤¾à¤¹à¤¤à¥‡ à¤¹à¥ˆà¤‚?"))) {
       setCurrentStageIndex(0)
       localStorage.setItem("khatu_path_stage", "0")
       try {
         playTempleBell("single")
       } catch (e) {}
     }
   }
 
   const handleChantTap = () => {
     const newChants = chants + 1
     setChants(newChants)
     localStorage.setItem("khatu_path_chants", String(newChants))
     if (newChants % 11 === 0) {
       try {
         playTempleBell("single")
       } catch (e) {}
     }
   }
 
   const handleResetChants = () => {
     setChants(0)
     localStorage.setItem("khatu_path_chants", "0")
   }
 
   const handlePlayAudio = (id: string) => {
     // Toggle play status
     setPlayStatus(prev => {
       const updated = { ...prev, [id]: !prev[id] }
       // Play sound notification if starting
       if (updated[id]) {
         try {
           playTempleBell("single")
         } catch (e) {}
         // Show simulated notification
         setTimeout(() => {
           alert(t("Audio streaming is coming soon! Playing offline temple chants for now.", "à¤‘à¤¡à¤¿à¤¯à¥‹ à¤¸à¥à¤Ÿà¥à¤°à¥€à¤®à¤¿à¤‚à¤— à¤œà¤²à¥à¤¦ à¤† à¤°à¤¹à¥€ à¤¹à¥ˆ! à¤…à¤­à¥€ à¤•à¥‡ à¤²à¤¿à¤ à¤‘à¤«à¤²à¤¾à¤‡à¤¨ à¤®à¤‚à¤¦à¤¿à¤° à¤®à¤‚à¤¤à¥à¤° à¤¬à¤œ à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚à¥¤"))
         }, 100)
       }
       return updated
     })
   }
 
   const activeStage = STAGES[currentStageIndex]
   const progressPercent = (currentStageIndex / (STAGES.length - 1)) * 100
 
   return (
     <div className="space-y-6 pb-12">
       {/* Header Info */}
       <div className="flex items-center justify-between">
         <div>
           <h2 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
             <Icon name="Footprints" className="text-primary size-6 animate-pulse" />
             {t("Khatu Padyatra", "à¤–à¤¾à¤Ÿà¥‚ à¤ªà¤¦à¤¯à¤¾à¤¤à¥à¤°à¤¾")}
           </h2>
           <p className="text-xs text-muted-foreground mt-0.5">
             {t("Experience the spiritual walk from Ringas to Khatu Dham", "à¤°à¥€à¤‚à¤—à¤¸ à¤¸à¥‡ à¤–à¤¾à¤Ÿà¥‚ à¤§à¤¾à¤® à¤¤à¤• à¤•à¥€ à¤†à¤§à¥à¤¯à¤¾à¤¤à¥à¤®à¤¿à¤• à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤•à¤¾ à¤…à¤¨à¥à¤­à¤µ à¤•à¤°à¥‡à¤‚")}
           </p>
         </div>
         <button
           onClick={() => setSoundEnabled(!soundEnabled)}
           className={`grid size-10 place-items-center rounded-2xl border transition active:scale-95 ${
             soundEnabled ? "border-primary/40 bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground"
           }`}
         >
           <Icon name={soundEnabled ? "Volume2" : "VolumeX"} className="size-5" />
         </button>
       </div>
 
       {/* Tabs Menu */}
       <div className="flex rounded-2xl bg-secondary/60 p-1 gap-1">
         {[
           { key: "padyatra", label: t("Journey Guide", "à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤®à¤¾à¤°à¥à¤—à¤¦à¤°à¥à¤¶à¤•"), icon: "Map" },
           { key: "devotional", label: t("Texts & Bhajans", "à¤†à¤°à¤¤à¥€ à¤µ à¤­à¤œà¤¨"), icon: "Music" },
           { key: "jaap", label: t("Shyam Jaap Counter", "à¤œà¤¾à¤ª à¤•à¤¾à¤‰à¤‚à¤Ÿà¤°"), icon: "Fingerprint" }
         ].map((tab) => (
           <button
             key={tab.key}
             onClick={() => setActiveTab(tab.key as any)}
             className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-1.5 rounded-xl py-2.5 px-1 text-center text-xs font-bold transition-all duration-200 ${
               activeTab === tab.key
                 ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                 : "text-muted-foreground hover:text-foreground"
             }`}
           >
             <Icon name={tab.icon} className="size-4" />
             <span>{tab.label}</span>
           </button>
         ))}
       </div>
 
       {/* --- CONTENT AREA --- */}
       <AnimatePresence mode="wait">
         {/* 1. PADYATRA JOURNEY GUIDE */}
         {activeTab === "padyatra" && (
           <motion.div
             key="padyatra"
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -15 }}
             className="space-y-6"
           >
             {/* Journey Progress Hero Card */}
             <div 
               className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl border border-primary/20"
               style={{ background: activeStage.bgImage }}
             >
               <div className="absolute inset-0 bg-[url('/images/mandala-pattern.png')] bg-cover opacity-[0.06] pointer-events-none" />
               
               <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                 <div className="flex items-start justify-between">
                   <div>
                     <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FFF8F0]">
                       {t(`Stage ${activeStage.id} of 6`, `à¤šà¤°à¤£ ${activeStage.id} / 6`)}
                     </span>
                     <h3 className="font-heading text-2xl font-bold mt-2 text-[#D4AF37] drop-shadow-md">
                       {lang === "en" ? activeStage.nameEn : activeStage.nameHi}
                     </h3>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] uppercase tracking-widest text-[#FFF8F0]/70">{t("Distance Left", "à¤¦à¥‚à¤°à¥€ à¤¶à¥‡à¤·")}</p>
                     <p className="font-heading text-2xl font-bold text-white mt-0.5">
                       {activeStage.distanceLeft} <span className="text-xs">KM</span>
                     </p>
                   </div>
                 </div>
 
                 <p className="text-sm text-white/90 leading-relaxed font-medium">
                   {lang === "en" ? activeStage.descEn : activeStage.descHi}
                 </p>
 
                 {/* Interactive Activity Box */}
                 <div className="rounded-2xl bg-white/10 border border-white/20 p-4 backdrop-blur-sm">
                   <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                     <Icon name="Activity" className="size-4" />
                     {t("Stage Task / Experience", "à¤šà¤°à¤£ à¤•à¤¾ à¤…à¤¨à¥à¤­à¤µ à¤µ à¤•à¤°à¥à¤®")}
                   </p>
                   <p className="text-xs text-white/95 mt-1 leading-relaxed">
                     {lang === "en" ? activeStage.activityEn : activeStage.activityHi}
                   </p>
                 </div>
 
                 {/* Progress bar */}
                 <div className="space-y-1.5 pt-2">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-white/80">
                     <span>{t("Ringas (0%)", "à¤°à¥€à¤‚à¤—à¤¸ (0%)")}</span>
                     <span>{t("Shree Shyam Darbar (100%)", "à¤¶à¥à¤¯à¤¾à¤® à¤¦à¤°à¤¬à¤¾à¤° (100%)")}</span>
                   </div>
                   <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden border border-white/10 shadow-inner">
                     <div 
                       className="h-full bg-gradient-to-r from-[#D97706] to-[#D4AF37] shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-700"
                       style={{ width: `${progressPercent}%` }}
                     />
                   </div>
                 </div>
 
                 {/* Navigation Buttons */}
                 <div className="flex gap-3 pt-2">
                   {currentStageIndex > 0 && (
                     <button
                       onClick={handleResetJourney}
                       className="flex-1 border border-white/30 rounded-2xl py-3 text-xs font-bold text-white/90 hover:bg-white/10 transition active:scale-[0.98]"
                     >
                       <Icon name="RotateCcw" className="size-4 inline mr-1" />
                       {t("Reset Journey", "à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤¶à¥à¤°à¥‚ à¤¸à¥‡ à¤•à¤°à¥‡à¤‚")}
                     </button>
                   )}
                   <button
                     onClick={handleNextStage}
                     className="flex-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary py-3 px-6 text-xs font-bold text-white shadow-lg active:scale-[0.98] transition hover:shadow-xl"
                   >
                     <span>
                       {currentStageIndex === STAGES.length - 1 
                         ? t("Enter Main Darbar", "à¤®à¥à¤–à¥à¤¯ à¤¦à¤°à¤¬à¤¾à¤° à¤®à¥‡à¤‚ à¤ªà¥à¤°à¤µà¥‡à¤¶ à¤•à¤°à¥‡à¤‚") 
                         : t("Continue to Next Stage", "à¤…à¤—à¤²à¥‡ à¤šà¤°à¤£ à¤ªà¤° à¤¬à¥à¥‡à¤‚")}
                     </span>
                     <Icon name="ArrowRight" className="size-4" />
                   </button>
                 </div>
               </div>
             </div>
 
             {/* Stages overview road map card */}
             <div className="rounded-3xl border border-border bg-card p-5 space-y-4 shadow-sm">
               <h4 className="font-heading text-sm font-bold text-foreground flex items-center gap-2">
                 <Icon name="MapPin" className="text-primary size-4" />
                 {t("Padyatra Milestones Map", "à¤ªà¤¦à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤ªà¤¡à¤¼à¤¾à¤µ à¤®à¤¾à¤¨à¤šà¤¿à¤¤à¥à¤°")}
               </h4>
               <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/60">
                 {STAGES.map((s, idx) => {
                   const isActive = idx === currentStageIndex
                   const isPassed = idx < currentStageIndex
                   return (
                     <div key={s.id} className="relative flex items-start gap-4">
                       {/* Step Circle */}
                       <span className={`absolute -left-[23px] top-1 grid size-5 place-items-center rounded-full border text-[9px] font-bold shadow-sm transition-all duration-300 ${
                         isActive 
                           ? "bg-primary border-primary text-white scale-125 ring-4 ring-primary/20" 
                           : isPassed 
                           ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D97706]"
                           : "bg-secondary border-border text-muted-foreground"
                       }`}>
                         {idx + 1}
                       </span>
                       <div className="min-w-0 flex-1">
                         <p className={`text-xs font-bold ${isActive ? "text-primary" : "text-foreground"}`}>
                           {lang === "en" ? s.nameEn : s.nameHi}
                         </p>
                         <p className="text-[10px] text-muted-foreground mt-0.5">
                           {s.distanceLeft} KM {t("left to temple", "à¤®à¤‚à¤¦à¤¿à¤° à¤¶à¥‡à¤·")}
                         </p>
                       </div>
                       {isActive && (
                         <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[9px] font-bold text-primary animate-pulse">
                           {t("Current", "à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨")}
                         </span>
                       )}
                     </div>
                   )
                 })}
               </div>
             </div>
           </motion.div>
         )}
 
         {/* 2. DEVOTIONAL TEXTS & BHAJANS */}
         {activeTab === "devotional" && (
           <motion.div
             key="devotional"
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -15 }}
             className="space-y-4"
           >
             <div className="rounded-3xl border border-border bg-card p-5 space-y-4 shadow-sm">
               <div className="flex items-center gap-3">
                 <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-primary shadow-inner">
                   <Icon name="BookOpen" className="size-5" />
                 </span>
                 <div>
                   <h3 className="font-heading text-sm font-bold text-foreground">
                     {t("Bhajan & Aarti Sangrah", "à¤­à¤œà¤¨ à¤à¤µà¤‚ à¤†à¤°à¤¤à¥€ à¤¸à¤‚à¤—à¥à¤°à¤¹")}
                   </h3>
                   <p className="text-[11px] text-muted-foreground mt-0.5">
                     {t("Listen or read lyrics of popular devotional paths", "à¤ªà¥à¤°à¤¸à¤¿à¤¦à¥à¤§ à¤­à¤•à¥à¤¤à¤¿ à¤­à¤œà¤¨à¥‹à¤‚ à¤”à¤° à¤†à¤°à¤¤à¥€ à¤•à¥‡ à¤¬à¥‹à¤² à¤ªà¤¢à¤¼à¥‡à¤‚ à¤”à¤° à¤¸à¥à¤¨à¥‡à¤‚")}
                   </p>
                 </div>
               </div>
 
               <div className="space-y-3 pt-2">
                 {DEVOTIONAL_ITEMS.map((item) => {
                   const isPlaying = playStatus[item.id] || false
                   return (
                     <article 
                       key={item.id}
                       className="rounded-2xl border border-border bg-secondary/20 p-4 flex items-center justify-between hover:border-primary/30 transition shadow-sm"
                     >
                       <div className="min-w-0 flex-1 pr-4">
                         <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full mb-1.5">
                           {t(item.type, item.type === "aarti" ? "à¤†à¤°à¤¤à¥€" : item.type === "chalisa" ? "à¤šà¤¾à¤²à¥€à¤¸à¤¾" : "à¤­à¤œà¤¨")}
                         </span>
                         <h4 className="text-xs font-bold text-foreground truncate">
                           {lang === "en" ? item.titleEn : item.titleHi}
                         </h4>
                       </div>
 
                       <div className="flex items-center gap-2">
                         {/* Read lyrics button */}
                         <button
                           onClick={() => setActiveLyrics(item)}
                           className="grid size-9 place-items-center rounded-xl bg-white border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition active:scale-95"
                           title={t("Read lyrics", "à¤²à¤¿à¤°à¤¿à¤•à¥à¤¸ à¤ªà¥à¥‡à¤‚")}
                         >
                           <Icon name="FileText" className="size-4" />
                         </button>
                         
                         {/* Play/Listen button */}
                         <button
                           onClick={() => handlePlayAudio(item.id)}
                           className={`grid size-9 place-items-center rounded-xl transition active:scale-95 ${
                             isPlaying 
                               ? "bg-primary text-white shadow-md animate-pulse" 
                               : "bg-white border border-border text-primary hover:bg-secondary/50"
                           }`}
                           title={t("Listen", "à¤¸à¥à¤¨à¥‡à¤‚")}
                         >
                           <Icon name={isPlaying ? "Pause" : "Play"} className="size-4" />
                         </button>
                       </div>
                     </article>
                   )
                 })}
               </div>
             </div>
 
             {/* Modal lyrics overlay */}
             <AnimatePresence>
               {activeLyrics && (
                 <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
                 >
                   <motion.div 
                     initial={{ scale: 0.9, y: 20 }}
                     animate={{ scale: 1, y: 0 }}
                     exit={{ scale: 0.9, y: 20 }}
                     className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-[#D4AF37]/30 max-h-[80vh] flex flex-col"
                   >
                     <div className="flex items-center justify-between border-b border-border pb-3 mb-4 shrink-0">
                       <h4 className="font-heading text-base font-bold text-foreground">
                         {lang === "en" ? activeLyrics.titleEn : activeLyrics.titleHi}
                       </h4>
                       <button
                         onClick={() => setActiveLyrics(null)}
                         className="grid size-8 place-items-center rounded-full bg-secondary text-muted-foreground hover:bg-red-50 hover:text-destructive transition"
                       >
                         <Icon name="X" className="size-4" />
                       </button>
                     </div>
 
                     <div className="flex-1 overflow-y-auto text-center space-y-4 px-2 py-2">
                       <p className="text-xs text-muted-foreground italic font-semibold mb-2">
                         {t("Lyrics (Devanagari & Roman)", "à¤ªà¤¾à¤  à¤µ à¤­à¤œà¤¨ à¤¬à¥‹à¤²")}
                       </p>
                       <pre className="font-sans text-sm leading-relaxed text-foreground whitespace-pre-wrap font-medium bg-[#FFF8F0] p-4 rounded-2xl border border-[#E8D5B7]/55">
                         {lang === "hi" ? activeLyrics.lyricsHi : activeLyrics.lyricsEn}
                       </pre>
                     </div>
 
                     <div className="pt-4 border-t border-border mt-4 shrink-0">
                       <button
                         onClick={() => {
                           handlePlayAudio(activeLyrics.id)
                           setActiveLyrics(null)
                         }}
                         className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary py-3 text-xs font-bold text-white shadow-md active:scale-95 transition"
                       >
                         <Icon name="Volume2" className="size-4" />
                         {t("Listen Audio Chant", "à¤‘à¤¡à¤¿à¤¯à¥‹ à¤­à¤œà¤¨ à¤¸à¥à¤¨à¥‡à¤‚")}
                       </button>
                     </div>
                   </motion.div>
                 </motion.div>
               )}
             </AnimatePresence>
           </motion.div>
         )}
 
         {/* 3. SHYAM JAAP COUNTER */}
         {activeTab === "jaap" && (
           <motion.div
             key="jaap"
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -15 }}
             className="space-y-6"
           >
             {/* Jaap Counter Device */}
             <div className="rounded-[2.5rem] bg-gradient-to-br from-[#1A120B] to-[#2A1D13] border-2 border-[#D4AF37]/40 p-6 text-center text-white shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('/images/mandala-pattern.png')] bg-cover opacity-[0.04] pointer-events-none" />
               <div className="absolute top-0 right-0 w-36 h-36 bg-[#D97706]/10 blur-3xl rounded-full" />
               
               <h3 className="text-xs font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-4">
                 {t("SHYAM JAAP MANTRA", "à¤¶à¥à¤°à¥€ à¤¶à¥à¤¯à¤¾à¤® à¤œà¤¾à¤ª à¤•à¤¾à¤‰à¤‚à¤Ÿà¤°")}
               </h3>
 
               <div className="flex flex-col items-center justify-center space-y-6 py-4">
                 {/* Large Counter Circular Ring */}
                 <div className="relative">
                   <div className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-[#D97706] to-[#D4AF37] opacity-20 blur-[6px] animate-pulse" />
                   
                   <motion.button 
                     whileTap={{ scale: 0.92 }}
                     onClick={handleChantTap}
                     className="relative grid size-36 place-items-center rounded-full bg-[#1c110a] border-4 border-[#D4AF37]/50 shadow-[inset_0_4px_12px_rgba(0,0,0,0.6),0_8px_24px_rgba(217,119,6,0.3)] active:border-primary transition"
                   >
                     <span className="font-heading text-5xl font-extrabold text-[#D4AF37] tracking-tight drop-shadow-md">
                       {chants}
                     </span>
                     <span className="text-[9px] uppercase tracking-widest text-[#FFF8F0]/50 absolute bottom-6 font-bold">
                       {t("TAP JAAP", "à¤¸à¥à¤ªà¤°à¥à¤¶ à¤•à¤°à¥‡à¤‚")}
                     </span>
                   </motion.button>
                 </div>
 
                 {/* Reset button */}
                 <button 
                   onClick={handleResetChants}
                   className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-bold text-white/60 transition hover:bg-white/10 hover:text-white active:scale-95"
                 >
                   <Icon name="RotateCcw" className="size-3.5" />
                   <span>{t("Reset Count", "à¤°à¥€à¤¸à¥‡à¤Ÿ à¤•à¤°à¥‡à¤‚")}</span>
                 </button>
               </div>
 
               {/* Guide Quote */}
               <p className="text-[10px] text-[#FFF8F0]/70 mt-4 leading-relaxed font-semibold italic">
                 "{t("Chant 'Hare Ka Sahara, Baba Shyam Hamara' while walking. Every 11 chants sounds a bell.", "à¤šà¤²à¤¤à¥‡ à¤¹à¥à¤ 'à¤¹à¤¾à¤°à¥‡ à¤•à¤¾ à¤¸à¤¹à¤¾à¤°à¤¾, à¤¬à¤¾à¤¬à¤¾ à¤¶à¥à¤¯à¤¾à¤® à¤¹à¤®à¤¾à¤°à¤¾' à¤•à¤¾ à¤œà¤¾à¤ª à¤•à¤°à¥‡à¤‚à¥¤ à¤ªà¥à¤°à¤¤à¥à¤¯à¥‡à¤• 11 à¤œà¤¾à¤ª à¤ªà¤° à¤¶à¤‚à¤– à¤§à¥à¤µà¤¨à¤¿ à¤¹à¥‹à¤—à¥€à¥¤")}"
               </p>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   )
 }
 
