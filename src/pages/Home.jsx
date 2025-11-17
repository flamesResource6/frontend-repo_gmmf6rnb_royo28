import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Spline = lazy(() => import('@splinetool/react-spline'))

const Card = ({ title, to, desc }) => (
  <Link to={to} className="group rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 p-6 backdrop-blur transition-colors">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-white/70 mb-4">{desc}</p>
    <span className="inline-flex items-center text-[#DBBF8B] group-hover:translate-x-1 transition-transform">Details →</span>
  </Link>
)

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1711] via-[#102016] to-[#0f1711]" />
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-10 pb-24 relative">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.6}} className="text-4xl md:text-6xl font-semibold leading-tight">
                Thai Massage in Apple-Style
              </motion.h1>
              <p className="text-white/70 mt-6 text-lg">Minimalistisch, beruhigend und konvertierend. Entspanne in einer modernen Atmosphäre.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://calendly.com/myvela" target="_blank" className="rounded-full bg-[#DBBF8B] text-[#263F28] px-5 py-3 font-medium">Jetzt Termin buchen</a>
                <Link to="/massagen" className="rounded-full border border-white/20 px-5 py-3">Massagen ansehen</Link>
              </div>
            </div>
            <div className="relative h-[360px] md:h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-white/5">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/60">Lädt 3D...</div>}>
                <Spline scene="https://prod.spline.design/Ob4Gv8b8oF0oUh2G/scene.splinecode" />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6">
          <Card title="Thai Wellness" to="/wellness" desc="Sanft & entspannend – ideal zum Abschalten." />
          <Card title="Thai Öl" to="/oil" desc="Wohltuend mit hochwertigen Ölen für geschmeidige Muskeln." />
          <Card title="Thai Sport" to="/sport" desc="Tiefenwirksam & mobilisierend – perfekt für Aktive." />
        </div>
      </section>
    </div>
  )
}
