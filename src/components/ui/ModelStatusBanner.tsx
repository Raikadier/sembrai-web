import { motion, AnimatePresence } from 'framer-motion'

export default function ModelStatusBanner({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3
                     flex items-center gap-3 text-sm text-amber-800"
        >
          <div className="w-4 h-4 border-2 border-amber-300 border-t-amber-700
                          rounded-full animate-spin flex-shrink-0" />
          <span>
            <strong>Iniciando modelos de IA</strong> — los modelos LSTM y Random Forest
            se están cargando en el servidor. Las predicciones estarán disponibles en unos segundos.
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
