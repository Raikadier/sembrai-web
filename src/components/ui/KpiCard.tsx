import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  label:    string
  value:    ReactNode
  sub?:     string
  delay?:   number
}

export default function KpiCard({ label, value, sub, delay = 0 }: Props) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
        {label}
      </p>
      <div className="mb-1">{value}</div>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </motion.div>
  )
}
