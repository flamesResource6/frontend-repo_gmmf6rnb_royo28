import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 }
}

const CTA = ({ href60, href90 }) => (
  <div className="flex flex-wrap gap-3 mt-8">
    <a href={href60} target="_blank" className="rounded-full bg-[#DBBF8B] text-[#263F28] px-5 py-3 font-medium">Jetzt 60 Min buchen</a>
    <a href={href90} target="_blank" className="rounded-full border border-white/20 px-5 py-3">Jetzt 90 Min buchen</a>
  </div>
)

export default function Detail({ title, desc, benefits, href60, href90 }) {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-14">
      <motion.h1 variants={variants} initial="initial" animate="animate" transition={{ duration: .5 }} className="text-3xl md:text-5xl font-semibold">
        {title}
      </motion.h1>
      <p className="text-white/70 mt-6 text-lg max-w-3xl">{desc}</p>
      <ul className="grid md:grid-cols-2 gap-4 mt-8 text-white/80 list-disc pl-5">
        {benefits.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      <CTA href60={href60} href90={href90} />
    </div>
  )
}
