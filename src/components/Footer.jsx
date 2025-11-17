export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 text-sm text-white/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} MyVela Thai. Alle Rechte vorbehalten.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white">Impressum</a>
          <a href="#" className="hover:text-white">Datenschutz</a>
        </div>
      </div>
    </footer>
  )
}
