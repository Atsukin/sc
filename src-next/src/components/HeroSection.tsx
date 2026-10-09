'use client'

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/images/hero2.mp4"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-8xl font-black text-white tracking-wider leading-tight drop-shadow-2xl animate-pulse font-zen-old-mincho">
          エネルギーで<br />みたせ
        </h1>
      </div>
    </section>
  )
}
