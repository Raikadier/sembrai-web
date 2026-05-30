import { motion } from 'framer-motion'
import type { Prediccion } from '../../types'

interface Props {
  prediccion: Prediccion
  semanas:    number
}

export default function PredictionTable({ prediccion, semanas }: Props) {
  const fmt = (v: number) =>
    `$${Number(v).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`

  return (
    <div className="card overflow-x-auto">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Detalle de predicciones
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            {['Semana','Fecha','Predicción','Mínimo','Máximo','Variación'].map(h => (
              <th key={h} className="pb-3 pr-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {prediccion.fechas.slice(0, semanas).map((fecha, i) => {
            const p      = prediccion.predicciones[i]
            const inf    = prediccion.intervalos_inf[i]
            const sup    = prediccion.intervalos_sup[i]
            const varPct = ((p - prediccion.precio_actual) / prediccion.precio_actual * 100)
            const isAlza = varPct > 2
            const isBaja = varPct < -2

            return (
              <motion.tr
                key={fecha}
                className="border-t border-gray-50"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <td className="py-3 pr-4">
                  <span className="font-semibold text-gray-700">Sem. {i + 1}</span>
                </td>
                <td className="py-3 pr-4 text-gray-500">{fecha}</td>
                <td className="py-3 pr-4">
                  <span className="font-bold text-green-800 text-base">{fmt(p)}</span>
                </td>
                <td className="py-3 pr-4 text-gray-500">{fmt(inf)}</td>
                <td className="py-3 pr-4 text-gray-500">{fmt(sup)}</td>
                <td className="py-3">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
                    text-xs font-semibold
                    ${isAlza ? 'bg-orange-50 text-orange-700'
                      : isBaja ? 'bg-green-50 text-green-700'
                      : 'bg-blue-50 text-blue-700'}`}>
                    {isAlza ? '↑' : isBaja ? '↓' : '→'} {varPct.toFixed(1)}%
                  </span>
                </td>
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
