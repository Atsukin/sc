import type { Metadata } from 'next'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import InfoSection from '@/components/InfoSection'
import AboutSection from '@/components/AboutSection'
import ServiceSection from '@/components/ServiceSection'
import NewsSection from '@/components/NewsSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-[#1E1E1E] via-[#2A2A2A] to-[#323232] min-h-screen text-gray-100 relative overflow-hidden">
      {/* Spotlight Effects */}
      <div className="spotlight-container">
        <div className="spotlight spotlight-1"></div>
        <div className="spotlight spotlight-2"></div>
        <div className="spotlight spotlight-3"></div>
        <div className="spotlight spotlight-4"></div>
        <div className="spotlight spotlight-5"></div>
      </div>

      <div className="relative z-10">
        <Header />

        <main>
          <HeroSection />
          <InfoSection />
          <AboutSection />
          <ServiceSection />
          <NewsSection />
        </main>

        <Footer />
      </div>
    </div>
  )
}
