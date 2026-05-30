/**
 * PresentationPage.tsx
 * Scrollytelling interactivo para explicar Sembr.ai durante la defensa académica.
 * 8 secciones que narran el proyecto de principio a fin.
 */
import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TrainingAnimation from '../../components/animations/TrainingAnimation'

// 3D carga lazy para no bloquear el scroll
const NeuralNetwork3D = lazy(() => import('../../components/3d/NeuralNetwork3D'))

// ── Utilidades ───────────────────────────────────────────────────────────
const METRICS = [
  { prod: 'Arroz',     model: 'RF',   mape: '5.4%',  grade: '🟢 Excelente' },
  { prod: 'Yuca',      model: 'RF',   mape: '8.6%',  grade: '🟢 Excelente' },
  { prod: 'Papa',      model: 'RF',   mape: '12.8%', grade: '🟡 Bueno'     },
  { prod: 'Zanahoria', model: 'RF',   mape: '13.9%', grade: '🟡 Bueno'     },
  { prod: 'Cebolla',   model: 'RF',   mape: '14.4%', grade: '🟡 Bueno'     },
  { prod: 'Mango',     model: 'RF',   mape: '18.1%', grade: '🟡 Bueno'     },
  { prod: 'Tomate',    model: 'RF',   mape: '21.8%', grade: '🟠 Aceptable' },
  { prod: 'Plátano',   model: 'LSTM', mape: '22.6%', grade: '🟠 Aceptable' },
]

function SectionTitle({ num, title, subtitle }: { num: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="w-9 h-9 flex items-center justify-center rounded-full
                         bg-green-700 text-white text-sm font-bold flex-shrink-0">
          {num}
        </span>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      {subtitle && <p className="text-gray-500 ml-12">{subtitle}</p>}
    </motion.div>
  )
}

function Section({ children, bg = 'bg-white' }: { children: React.ReactNode; bg?: string }) {
  return (
    <section className={`${bg} py-16 px-4`}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  )
}

// ── Componente principal ─────────────────────────────────────────────────
export default function PresentationPage() {
  return (
    <div>

      {/* Hero de la presentación */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 text-white
                      py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase
                           bg-green-600/40 border border-green-400/30 text-green-200
                           px-4 py-1.5 rounded-full inline-block mb-6">
            Defensa académica · Universidad Popular del Cesar
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🌱 Sembr.ai
          </h1>
          <p className="text-xl text-green-200 max-w-2xl mx-auto">
            Sistema de predicción de precios agrícolas con Inteligencia Artificial
            para el mercado mayorista de Valledupar, Cesar.
          </p>
          <div className="flex gap-3 justify-center mt-8 flex-wrap">
            {['LSTM', 'Random Forest', 'SIPSA-DANE', 'Open-Meteo', 'Valledupar'].map(tag => (
              <span key={tag} className="bg-green-800/60 border border-green-600/40
                                         text-green-200 text-xs px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Sección 1: El Problema ────────────────────────────────────────── */}
      <Section bg="bg-[#f8faf5]">
        <SectionTitle
          num="1"
          title="El Problema"
          subtitle="¿Por qué predecir precios agrícolas en Valledupar?"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '📉', title: 'Volatilidad extrema', desc: 'El precio del Tomate varía hasta un 491% entre mínimo y máximo histórico. Los agricultores no pueden planificar.' },
            { icon: '🚚', title: 'Cadena de suministro', desc: 'La región del Cesar depende del mercado mayorista para abastecer ~1.5 millones de personas. Un error cuesta millones.' },
            { icon: '🤖', title: 'La solución IA', desc: 'LSTM captura dependencias temporales de largo plazo. Random Forest modela no-linealidades con variables exógenas.' },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-3">{c.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{c.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── Sección 2: Los Datos ──────────────────────────────────────────── */}
      <Section>
        <SectionTitle
          num="2"
          title="Los Datos"
          subtitle="SIPSA-DANE 2015-2024 + Variables climáticas Open-Meteo"
        />
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            {[
              { label: 'Fuente principal', value: 'SIPSA-DANE — Boletines mensuales mayoristas' },
              { label: 'Mercado proxy',    value: 'Barranquilla (misma costa caribe, misma cadena)' },
              { label: 'Período',          value: '120 meses · Enero 2015 – Diciembre 2024' },
              { label: 'Productos',        value: '8: Tomate, Papa, Cebolla, Plátano, Yuca, Zanahoria, Mango, Arroz' },
              { label: 'Variables clima',  value: 'Temperatura máx/mín + Precipitación · Valledupar (Open-Meteo)' },
              { label: 'Features totales', value: '20 por observación (8 climáticas/temporales + 12 lags de precio)' },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase">{label}: </span>
                  <span className="text-sm text-gray-700">{value}</span>
                </div>
              </div>
            ))}
          </div>
          <motion.div
            className="card bg-green-900 text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-green-200 text-sm uppercase tracking-wide mb-4">
              División del dataset
            </h3>
            {[
              { label: '70% Entrenamiento', period: 'Ene 2015 – Dic 2021', color: 'bg-green-500', w: '70%' },
              { label: '15% Validación',    period: 'Ene 2022 – Jun 2022', color: 'bg-blue-400',  w: '15%' },
              { label: '15% Prueba',        period: 'Jul 2022 – Dic 2024', color: 'bg-orange-400', w: '15%' },
            ].map(({ label, period, color, w }) => (
              <div key={label} className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white font-semibold">{label}</span>
                  <span className="text-green-300">{period}</span>
                </div>
                <div className="h-3 bg-green-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: w }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Sección 3: La Red Neuronal LSTM ──────────────────────────────── */}
      <Section bg="bg-[#f8faf5]">
        <SectionTitle
          num="3"
          title="La Red Neuronal LSTM"
          subtitle="Long Short-Term Memory — captura patrones temporales de largo plazo"
        />
        <Suspense fallback={
          <div className="w-full h-[420px] bg-gray-900 rounded-xl flex items-center justify-center">
            <div className="text-white text-sm">Cargando visualización 3D...</div>
          </div>
        }>
          <NeuralNetwork3D />
        </Suspense>
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          {[
            { layer: 'Input', detail: '12 pasos de lookback · 1 feature (precio norm.)' },
            { layer: 'LSTM 64', detail: '64 celdas · return_sequences=True · memoria larga' },
            { layer: 'LSTM 32', detail: '32 celdas · Dropout 20% · memoria corta' },
            { layer: 'Output', detail: 'Dense 16 (ReLU) → Dense 4 · 4 semanas predichas' },
          ].map(({ layer, detail }) => (
            <div key={layer} className="card text-center">
              <div className="font-bold text-green-700 mb-1">{layer}</div>
              <div className="text-xs text-gray-500">{detail}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Sección 4: Entrenamiento del LSTM ────────────────────────────── */}
      <Section>
        <SectionTitle
          num="4"
          title="Entrenamiento del LSTM"
          subtitle="Función de pérdida Huber · Adam optimizer · Early Stopping"
        />
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Épocas máximas', value: '100', icon: '🔄' },
            { label: 'Early stopping', value: 'Patience 15', icon: '⏸️' },
            { label: 'Batch size',     value: '32', icon: '📦' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="card text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="text-2xl font-bold text-green-800">{value}</div>
              <div className="text-xs text-gray-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
        <TrainingAnimation />
      </Section>

      {/* ── Sección 5: Random Forest ──────────────────────────────────────── */}
      <Section bg="bg-[#f8faf5]">
        <SectionTitle
          num="5"
          title="Random Forest"
          subtitle="GridSearch con TimeSeriesSplit · 20 features por observación"
        />
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Importancia de features (Tomate)</h3>
            {[
              { feat: 'precio_lag_1',  imp: 50.6, color: '#16a34a' },
              { feat: 'precio_lag_2',  imp: 24.4, color: '#2563eb' },
              { feat: 'precio_lag_3',  imp: 13.4, color: '#7c3aed' },
              { feat: 'precio_lag_4',  imp:  2.9, color: '#d97706' },
              { feat: 'mes_cos',       imp:  1.7, color: '#e65100' },
            ].map(({ feat, imp, color }, i) => (
              <div key={feat} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-mono text-gray-600">{feat}</span>
                  <span className="font-semibold text-gray-700">{imp}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${imp}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <h3 className="font-semibold text-gray-700 mb-4">Mejores hiperparámetros</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 uppercase">
                  <th className="text-left pb-2">Producto</th>
                  <th className="text-left pb-2">Árboles</th>
                  <th className="text-left pb-2">Profundidad</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { p: 'Tomate', n: 100, d: '10' },
                  { p: 'Papa',   n: 200, d: '6'  },
                  { p: 'Mango',  n: 200, d: 'Sin límite' },
                  { p: 'Yuca',   n: 100, d: '10' },
                ].map(({ p, n, d }) => (
                  <tr key={p} className="border-t border-gray-50">
                    <td className="py-2 font-medium text-gray-700">{p}</td>
                    <td className="py-2 text-gray-500">{n}</td>
                    <td className="py-2 text-gray-500">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ── Sección 6: Ensamblado ─────────────────────────────────────────── */}
      <Section>
        <SectionTitle
          num="6"
          title="Modelo Ensamblado"
          subtitle="Ponderación inversa al MAPE — el modelo con menor error tiene mayor peso"
        />
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            {[
              { prod: 'Arroz',  lstm: 19, rf: 81 },
              { prod: 'Papa',   lstm: 33, rf: 67 },
              { prod: 'Mango',  lstm: 30, rf: 70 },
              { prod: 'Plátano',lstm: 52, rf: 48 },
            ].map(({ prod, lstm, rf }) => (
              <div key={prod}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">{prod}</span>
                  <span className="text-gray-400">RF {rf}% · LSTM {lstm}%</span>
                </div>
                <div className="h-5 bg-gray-100 rounded-full overflow-hidden flex">
                  <motion.div
                    className="h-full bg-blue-500 rounded-l-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lstm}%` }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    title={`LSTM ${lstm}%`}
                  />
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${rf}%` }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true }}
                    title={`RF ${rf}%`}
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-4 text-xs mt-2">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500 inline-block"/>LSTM</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block"/>Random Forest</span>
            </div>
          </div>
          <div className="card bg-green-50 border-green-100">
            <h3 className="font-bold text-green-800 mb-3">Fórmula del ensamblado</h3>
            <div className="bg-white rounded-xl p-4 font-mono text-sm text-gray-700 mb-3 border">
              <div className="text-green-700">ŷ_final =</div>
              <div className="ml-4">w_lstm × ŷ_lstm</div>
              <div className="ml-4">+ w_rf × ŷ_rf</div>
              <div className="mt-2 text-xs text-gray-400">
                donde w_i = (1/MAPE_i) / Σ(1/MAPE_j)
              </div>
            </div>
            <p className="text-xs text-gray-500">
              El modelo con menor error de validación recibe mayor peso.
              La suma de pesos siempre es 1.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Sección 7: Resultados ─────────────────────────────────────────── */}
      <Section bg="bg-[#f8faf5]">
        <SectionTitle
          num="7"
          title="Resultados de Evaluación"
          subtitle="Conjunto de prueba 2023-2024 · Error porcentual absoluto medio (MAPE)"
        />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wide">
                <th className="text-left pb-3 pr-4">Producto</th>
                <th className="text-left pb-3 pr-4">Mejor modelo</th>
                <th className="text-left pb-3 pr-4">MAPE</th>
                <th className="text-left pb-3">Calificación</th>
              </tr>
            </thead>
            <tbody>
              {METRICS.map((m, i) => (
                <motion.tr
                  key={m.prod}
                  className="border-t border-gray-100"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  viewport={{ once: true }}
                >
                  <td className="py-3 pr-4 font-medium text-gray-800">{m.prod}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold
                      ${m.model === 'RF' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {m.model}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-green-500 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(parseFloat(m.mape) / 30) * 100}%` }}
                          transition={{ duration: 0.6, delay: i * 0.06 }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <span className="font-bold text-gray-700">{m.mape}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm">{m.grade}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 bg-white rounded-xl p-4 border border-gray-100 text-sm text-gray-600">
          <strong>Interpretación:</strong> MAPE &lt;10% = Excelente · 10-20% = Bueno · 20-30% = Aceptable.
          El Random Forest supera al LSTM en 7 de 8 productos por su capacidad de capturar
          relaciones no-lineales con los lags de precio como features.
        </div>
      </Section>

      {/* ── Sección 8: Demo en vivo ───────────────────────────────────────── */}
      <Section>
        <SectionTitle num="8" title="Demo en Vivo" />
        <motion.div
          className="card bg-green-900 text-white text-center py-12"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl mb-4">🌱</div>
          <h2 className="text-2xl font-bold mb-3">¿Listo para ver Sembr.ai en acción?</h2>
          <p className="text-green-200 mb-8 max-w-lg mx-auto">
            Selecciona un producto, elige el horizonte de predicción y observa
            cómo el modelo ensamblado genera la predicción con bandas de confianza.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600
                       text-white font-bold px-8 py-4 rounded-xl shadow-lg
                       transition-all hover:shadow-xl active:scale-95 text-lg"
          >
            Abrir Dashboard →
          </Link>
        </motion.div>
      </Section>

    </div>
  )
}
