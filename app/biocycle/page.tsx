"use client"

import { useEffect } from "react"
import BioCycleNavigation from "./components/BioCycleNavigation"
import BioCycleComingSoon from "./components/BioCycleComingSoon"
import BioCycleFooter from "./components/BioCycleFooter"

export default function BioCyclePage() {
  useEffect(() => {
    // Ensure page starts at the top when loaded
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <BioCycleNavigation />
      <BioCycleComingSoon />
      <BioCycleFooter />
    </main>
  )
}
