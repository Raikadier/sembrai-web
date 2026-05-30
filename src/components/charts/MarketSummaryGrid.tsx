import { motion } from 'framer-motion'
import type { Prediccion } from '../../types'
import { EMOJI_PRODUCTOS } from '../../types'

interface Props {
  data:              Record<string, Prediccion>
  onSelectProducto:  (p: string) => void
  productoActivo:    string | null
}

export default function MarketSummaryGrid({ data, onSelectProducto, productoActivo }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {Object.values(data).map((d, i) => {
        const varPct = ((d.predicciones[0] - d.precio_actual) / d.precio_actual * 100).toFixed(1)
        const isAlza   = parseFloat(varPct) > 2
        const isBaja   = parseFloat(varPct) < -2
        const active   = productoActivo === d.producto

        return (
          <motion.button
            key={d.producto}
            onClick={() => onSelectProducto(d.producto)}
            className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer
              ${active
                ? 'border-green-600 bg-green-50 shadow-md'
                : 'border-transparent bg-white hover:border-green-200 shadow-sm hover:shadow-md'
              }`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-xs text-gray-400 mb-1">
              {EMOJI_PRODUCTOS[d.producto] ?? '🌿'} {d.producto}
            </div>
            <div className="text-xl font-bold text-green-800">
              ${Number(d.precio_actual).toLocaleString('es-CO', { maximumFractionDigits: 0 })}
            </div>
            <div className={`text-xs font-semibold mt-1 ${
              isAlza ? 'text-orange-600' : isBaja ? 'text-green-600' : 'text-blue-600'
            }`}>
              {isAlza ? '↑' : isBaja ? '↓' : '→'} {varPct}%
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
