import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import type { Prediccion, PrecioHistorico } from '../../types'

interface Props {
  historico:  PrecioHistorico
  prediccion: Prediccion
  semanas:    number
}

const fmt = (v: number) =>
  `$${Number(v).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs min-w-[180px]">
      <p className="font-semibold text-gray-600 mb-2">{label}</p>
      {payload.map((p: any) => (
        p.value != null && (
          <div key={p.name} className="flex justify-between gap-4">
            <span style={{ color: p.color }}>{p.name}</span>
            <span className="font-semibold">{fmt(p.value)}</span>
          </div>
        )
      ))}
    </div>
  )
}

export default function PredictionChart({ historico, prediccion, semanas }: Props) {
  // Combinar datos históricos y predicciones en un array
  const histData = historico.fechas.map((fecha, i) => ({
    fecha,
    historico: historico.precios[i],
    prediccion: null as number | null,
    sup:        null as number | null,
    inf:        null as number | null,
  }))

  const predData = prediccion.fechas.slice(0, semanas).map((fecha, i) => ({
    fecha,
    historico:  null as number | null,
    prediccion: prediccion.predicciones[i],
    sup:        prediccion.intervalos_sup[i],
    inf:        prediccion.intervalos_inf[i],
  }))

  // Punto de unión: último histórico conectado a primera predicción
  const union = {
    fecha:      historico.fechas.at(-1)!,
    historico:  historico.precios.at(-1)!,
    prediccion: historico.precios.at(-1)!,
    sup:        null as number | null,
    inf:        null as number | null,
  }

  const data = [...histData.slice(-24), union, ...predData]

  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 10 }}>
        <defs>
          <linearGradient id="histGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#16a34a" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#e65100" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#e65100" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

        <XAxis
          dataKey="fecha"
          tick={{ fontSize: 10, fill: '#9ca3af' }}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tickFormatter={fmt}
          tick={{ fontSize: 10, fill: '#9ca3af' }}
          tickLine={false}
          axisLine={false}
          width={72}
        />

        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
          formatter={(v) => <span style={{ color: '#6b7280' }}>{v}</span>}
        />

        {/* Banda de confianza */}
        <Area
          dataKey="sup"
          name="Intervalo sup."
          stroke="none"
          fill="#e65100"
          fillOpacity={0.08}
          connectNulls
          legendType="none"
          dot={false}
        />
        <Area
          dataKey="inf"
          name="Intervalo inf."
          stroke="none"
          fill="white"
          fillOpacity={1}
          connectNulls
          legendType="none"
          dot={false}
        />

        {/* Línea de separación histórico/predicción */}
        <ReferenceLine
          x={union.fecha}
          stroke="#d1d5db"
          strokeDasharray="4 2"
          label={{ value: 'Hoy', fontSize: 10, fill: '#9ca3af', position: 'top' }}
        />

        {/* Histórico */}
        <Area
          dataKey="historico"
          name="Precio histórico"
          stroke="#16a34a"
          strokeWidth={2}
          fill="url(#histGrad)"
          connectNulls
          dot={false}
          activeDot={{ r: 4 }}
        />

        {/* Predicción */}
        <Line
          dataKey="prediccion"
          name="Predicción"
          stroke="#e65100"
          strokeWidth={2.5}
          strokeDasharray="6 3"
          connectNulls
          dot={{ r: 4, fill: '#e65100', strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
