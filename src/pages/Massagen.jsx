import { Link } from 'react-router-dom'

const Item = ({ title, to, desc }) => (
  <Link to={to} className="group rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 p-6 backdrop-blur transition-colors block">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-white/70">{desc}</p>
      </div>
      <span className="text-[#DBBF8B]">→</span>
    </div>
  </Link>
)

export default function Massagen() {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-14 space-y-6">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">Massagen-Übersicht</h1>
      <Item title="Thai Wellness" to="/wellness" desc="Sanft & entspannend – ideal zum Abschalten." />
      <Item title="Thai Öl" to="/oil" desc="Wohltuend mit hochwertigen Ölen für geschmeidige Muskeln." />
      <Item title="Thai Sport" to="/sport" desc="Tiefenwirksam & mobilisierend – perfekt für Aktive." />
    </div>
  )
}
