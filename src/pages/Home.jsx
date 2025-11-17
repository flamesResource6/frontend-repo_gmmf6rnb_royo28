import { Suspense, lazy, useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ErrorBoundary from '../components/ErrorBoundary'

// Lazy import Spline only on client
const Spline = lazy(() => import('@splinetool/react-spline'))

const Card = ({ title, to, desc }) => (
  <Link to={to} className="group rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 p-6 backdrop-blur transition-colors relative overflow-hidden">
    <h3 className="text-xl font-semibold mb-2 relative z-10">{title}</h3>
    <p className="text-white/70 mb-4 relative z-10">{desc}</p>
    <span className="inline-flex items-center text-[#DBBF8B] group-hover:translate-x-1 transition-transform relative z-10">Details →</span>
    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#DBBF8B]/10 blur-3xl group-hover:bg-[#DBBF8B]/20 transition-colors" />
  </Link>
)

function useWebGLSupport() {
  const [supported, setSupported] = useState(true)
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setSupported(!!gl)
    } catch (e) {
      setSupported(false)
    }
  }, [])
  return supported
}

export default function Home() {
  const [enable3D, setEnable3D] = useState(true)
  const [isSmall, setIsSmall] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [dividerLoaded, setDividerLoaded] = useState(false)
  const [useTestScene, setUseTestScene] = useState(false)

  const webglSupported = useWebGLSupport()

  useEffect(() => {
    if (typeof window !== 'undefined' && window?.matchMedia) {
      const mq = window.matchMedia('(max-width: 360px)')
      const handler = (e) => setIsSmall(e.matches)
      handler(mq)
      mq.addEventListener?.('change', handler)
      return () => mq.removeEventListener?.('change', handler)
    }
  }, [])

  // Safety timeout: if Spline doesn't load in 6s, fall back to light view
  useEffect(() => {
    if (!enable3D) return
    const t = setTimeout(() => {
      if (!heroLoaded) {
        console.warn('[3D] Timeout: falling back to light view')
        setEnable3D(false)
      }
    }, 6000)
    return () => clearTimeout(t)
  }, [enable3D, heroLoaded])

  const canRender3D = useMemo(() => enable3D && !isSmall && webglSupported, [enable3D, isSmall, webglSupported])

  const HERO_SCENE = useTestScene
    ? 'https://prod.spline.design/6VJ9mDRbugzuDUFc/scene.splinecode' // lightweight demo cube
    : 'https://prod.spline.design/Ob4Gv8b8oF0oUh2G/scene.splinecode'

  const DIVIDER_SCENE = useTestScene
    ? 'https://prod.spline.design/6VJ9mDRbugzuDUFc/scene.splinecode'
    : 'https://prod.spline.design/LULl2f5Vt9q8X4m3/scene.splinecode'

  return (
    <div>
      {/* Full-bleed 3D hero */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Background gradient (bottom layer) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1711] via-[#102016] to-[#0f1711] z-0" />

        {/* Spline background layer */}
        <div className="absolute inset-0 z-0">
          <ErrorBoundary>
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/60">Lädt 3D...</div>}>
              {canRender3D ? (
                <Spline
                  scene={HERO_SCENE}
                  onLoad={() => {
                    console.log('[3D] Hero scene loaded')
                    setHeroLoaded(true)
                  }}
                  style={{ width: '100%', height: '100%', display: 'block' }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/70 p-6 text-center select-none">
                  Leichte Ansicht aktiv
                </div>
              )}
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* Dark veil for readability (above Spline) */}
        <div className="absolute inset-0 bg-[#0f1711]/25 z-10" />

        {/* Content overlay (top) */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 md:px-6 pt-20 pb-24 flex flex-col justify-center min-h-[90vh]">
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:.6}}>
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">Thai Massage in Apple‑Style</h1>
            <p className="text-white/80 mt-6 text-lg md:text-xl max-w-2xl">Minimalistisch, beruhigend und konvertierend. Entspanne in einer modernen Atmosphäre mit sanften 3D‑Akzenten.</p>
            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <a href="https://calendly.com/myvela" target="_blank" rel="noreferrer" className="rounded-full bg-[#DBBF8B] text-[#263F28] px-5 py-3 font-medium">Jetzt Termin buchen</a>
              <Link to="/massagen" className="rounded-full border border-white/20 px-5 py-3">Massagen ansehen</Link>
              <button onClick={() => setEnable3D((v) => !v)} className="rounded-full border border-white/20 px-5 py-3">
                {enable3D ? '3D deaktivieren' : '3D aktivieren'}
              </button>
              <button onClick={() => setUseTestScene((v) => !v)} className="rounded-full border border-white/20 px-5 py-3">
                {useTestScene ? 'Original‑Szene' : 'Test‑Szene'}
              </button>
              <span className="ml-2 text-xs text-white/60">
                {webglSupported ? (enable3D ? (heroLoaded ? '3D aktiv' : 'Lade 3D…') : '3D aus') : 'WebGL nicht verfügbar'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider 3D ribbon (only on md+) */}
      <section className="relative py-12 hidden md:block">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent z-0" />
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
          <div className="relative h-64 rounded-3xl overflow-hidden border border-white/10 bg-white/5 z-0">
            <ErrorBoundary>
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/60">Lädt 3D...</div>}>
                {canRender3D ? (
                  <Spline
                    scene={DIVIDER_SCENE}
                    onLoad={() => {
                      console.log('[3D] Divider scene loaded')
                      setDividerLoaded(true)
                    }}
                    style={{ width: '100%', height: '100%', display: 'block' }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/70 p-6 text-center">Leichte Ansicht aktiv</div>
                )}
              </Suspense>
            </ErrorBoundary>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1711]/30 via-transparent to-[#0f1711]/30 z-10" />
          </div>
        </div>
      </section>

      {/* Services grid with subtle depth */}
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
