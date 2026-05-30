import type { Tendencia } from '../../types'

const CONFIG: Record<Tendencia, { label: string; icon: string; className: string }> = {
  alza:    { label: 'Al alza',   icon: '📈', className: 'bg-orange-50 text-orange-700 border-orange-200' },
  baja:    { label: 'A la baja', icon: '📉', className: 'bg-green-50  text-green-700  border-green-200'  },
  estable: { label: 'Estable',   icon: '➡️', className: 'bg-blue-50   text-blue-700   border-blue-200'   },
}

export default function TendenciaBadge({ tendencia }: { tendencia: Tendencia }) {
  const { label, icon, className } = CONFIG[tendencia] ?? CONFIG.estable
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                      text-sm font-semibold border ${className}`}>
      <span>{icon}</span>{label}
    </span>
  )
}
