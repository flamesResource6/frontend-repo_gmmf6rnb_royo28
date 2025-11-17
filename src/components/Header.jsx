import { useState } from 'react'
import { ChevronDown, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'

const navLink = 'text-sm md:text-base text-white/80 hover:text-white transition-colors'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/10 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#DBBF8B] to-[#b59a6f] shadow-inner" />
          <span className="font-semibold tracking-wide">MyVela Thai</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <div className="relative">
            <button onClick={() => setOpen((v) => !v)} className={`${navLink} inline-flex items-center gap-1`}>
              Thai Massage <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
              <div onMouseLeave={() => setOpen(false)} className="absolute mt-2 w-56 rounded-xl border border-white/10 bg-white/10 backdrop-blur p-2 shadow-xl">
                <Link onClick={() => setOpen(false)} to="/wellness" className="block rounded-lg px-3 py-2 hover:bg-white/10">Thai Wellness</Link>
                <Link onClick={() => setOpen(false)} to="/oil" className="block rounded-lg px-3 py-2 hover:bg-white/10">Thai Öl</Link>
                <Link onClick={() => setOpen(false)} to="/sport" className="block rounded-lg px-3 py-2 hover:bg-white/10">Thai Sport</Link>
              </div>
            )}
          </div>
          <Link to="/massagen" className={navLink}>Massagen</Link>
          <a href="https://calendly.com/myvela" target="_blank" className="inline-flex items-center rounded-full bg-[#DBBF8B] text-[#263F28] px-4 py-2 font-medium shadow hover:shadow-lg transition-shadow">Jetzt buchen</a>
        </nav>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          <Menu />
        </button>
      </div>
    </header>
  )
}
