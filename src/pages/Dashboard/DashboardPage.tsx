import { motion, AnimatePresence } from 'framer-motion'
import { useSystemStatus }    from '../../hooks/useSystemStatus'
import { usePrediccion, useAllPredicciones } from '../../hooks/usePrediccion'
import { useHistorico }       from '../../hooks/useHistorico'
import { useDashboardStore }  from '../../store/useDashboardStore'
import { EMOJI_PRODUCTOS }    from '../../types'
import type { Tendencia }     from '../../types'

import ProductSelector     from './ProductSelector'
import PredictionTable     from './PredictionTable'
import KpiCard             from '../../components/ui/KpiCard'
import TendenciaBadge      from '../../components/ui/TendenciaBadge'
import ModelStatusBanner   from '../../components/ui/ModelStatusBanner'
import PredictionChart     from '../../components/charts/PredictionChart'
import MarketSummaryGrid   from '../../components/charts/MarketSummaryGrid'

const fmt = (v: number) =>
  `$${Number(v).toLocaleString('es-CO', { maximumFractionDigits: 0 })}`

export default function DashboardPage() {
  const { modelosListos }  = useSystemStatus()
  const productoActivo     = useDashboardStore(s => s.productoActivo)
  const semanasActivo      = useDashboardStore(s => s.semanasActivo)
  const setProducto        = useDashboardStore(s => s.setProducto)
  const setSemanas         = useDashboardStore(s => s.setSemanas)

  const predQuery   = usePrediccion(productoActivo, semanasActivo)
  const histQuery   = useHistorico(productoActivo, 3)
  const allPredQuery = useAllPredicciones()

  const prediccion  = predQuery.data
  const historico   = histQuery.data
  const allPred     = allPredQuery.data

  const isLoadingChart = predQuery.isLoading || histQuery.isLoading

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard de Predicciones</h1>
        <p className="text-sm text-gray-500 mt-1">
          Precios mayoristas Mercabastos Valledupar · LSTM + Random Forest · SIPSA-DANE 2015-2024
        </p>
      </div>

      {/* Banner modelos cargando */}
      <ModelStatusBanner visible={!modelosListos} />

      {/* Selector de producto */}
      <ProductSelector
        activo={productoActivo}
        onSelect={setProducto}
        disabled={!modelosListos}
      />

      {/* Dashboard principal */}
      <AnimatePresence mode="wait">
        {prediccion && historico ? (
          <motion.div
            key={productoActivo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* KPIs + Selector semanas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <KpiCard
                label="Precio actual (COP/kg)"
                value={
                  <span className="text-3xl font-bold text-green-800">
                    {fmt(prediccion.precio_actual)}
                  </span>
                }
                sub={`Última observación: ${prediccion.ultima_fecha}`}
                delay={0}
              />
              <KpiCard
                label="Tendencia proyectada"
                value={<TendenciaBadge tendencia={prediccion.tendencia as Tendencia} />}
                sub="Basada en las próximas 4 semanas"
                delay={0.08}
              />
              <KpiCard
                label="Horizonte de predicción"
                value={
                  <div className="flex gap-2 mt-1">
                    {[1,2,3,4].map(s => (
                      <button
                        key={s}
                        onClick={() => setSemanas(s)}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer
                          ${semanasActivo === s
                            ? 'bg-green-700 text-white shadow'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        {s} sem
                      </button>
                    ))}
                  </div>
                }
                sub={`Semana ${semanasActivo}: ${fmt(prediccion.predicciones[semanasActivo - 1] ?? prediccion.predicciones[0])} COP/kg`}
                delay={0.16}
              />
            </div>

            {/* Gráfica */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                {EMOJI_PRODUCTOS[prediccion.producto] ?? '🌿'} {prediccion.producto}
                {' '}— Histórico + Predicción ({semanasActivo} semana{semanasActivo > 1 ? 's' : ''})
              </h3>
              <PredictionChart
                historico={historico}
                prediccion={prediccion}
                semanas={semanasActivo}
              />
            </motion.div>

            {/* Tabla */}
            <PredictionTable prediccion={prediccion} semanas={semanasActivo} />

          </motion.div>
        ) : isLoadingChart && productoActivo ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card flex items-center justify-center py-16"
          >
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-green-200 border-t-green-700
                              rounded-full animate-spin mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Calculando predicciones para {productoActivo}...</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Resumen del mercado */}
      {allPred && Object.keys(allPred).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Resumen del mercado
          </h2>
          <MarketSummaryGrid
            data={allPred}
            onSelectProducto={setProducto}
            productoActivo={productoActivo}
          />
        </motion.div>
      )}

    </div>
  )
}
