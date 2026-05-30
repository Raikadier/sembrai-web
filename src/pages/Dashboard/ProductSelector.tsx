import { motion } from 'framer-motion'
import { EMOJI_PRODUCTOS } from '../../types'

const PRODUCTOS = ['Tomate','Papa','Cebolla','Platano','Yuca','Zanahoria','Mango','Arroz']

interface Props {
  activo:    string | null
  onSelect:  (p: string) => void
  disabled?: boolean
}

export default function ProductSelector({ activo, onSelect, disabled }: Props) {
  return (
    <div className="card">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
        Selecciona un producto
      </h2>
      <div className="flex flex-wrap gap-2">
        {PRODUCTOS.map((p, i) => (
          <motion.button
            key={p}
            onClick={() => !disabled && onSelect(p)}
            disabled={disabled}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
              border-2 transition-all cursor-pointer
              ${activo === p
                ? 'bg-green-700 border-green-700 text-white shadow-md'
                : 'bg-white border-gray-200 text-gray-700 hover:border-green-400 hover:text-green-700'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.97 } : {}}
          >
            <span>{EMOJI_PRODUCTOS[p] ?? '🌿'}</span>
            {p}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
