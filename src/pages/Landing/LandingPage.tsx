import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const STATS = [
  { value: '8',    label: 'Productos agrícolas' },
  { value: '10 años', label: 'Datos históricos' },
  { value: '~14%',    label: 'Error promedio (MAPE)' },
  { value: '2',       label: 'Modelos de IA' },
]

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-green-600/40 border border-green-400/40
                             text-green-200 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              Inteligencia Artificial Aplicada
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Siembra decisiones.<br />
              <span className="text-orange-400">Cosecha ganancias.</span>
            </h1>
            <p className="text-xl text-green-200 max-w-2xl mx-auto mb-10 leading-relaxed">
              Predice los precios mayoristas de productos agrícolas en Valledupar
              hasta 4 semanas adelante usando LSTM + Random Forest entrenados
              con datos SIPSA-DANE 2015-2024.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/dashboard" className="btn-primary text-base px-8 py-4">
                Ir al Dashboard →
              </Link>
              <Link to="/presentacion" className="btn-secondary text-base px-8 py-4
                  !text-white !border-white/50 hover:!bg-white/10">
                Cómo funciona
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-green-700 mb-1">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-[#f8faf5]">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Una solución completa para el mercado agrícola
          </h2>
          <p className="text-gray-500 text-lg">
            Desarrollada para Mercabastos Valledupar con metodología académica rigurosa.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: '🧠', title: 'IA de última generación', desc: 'LSTM apilado + Random Forest ensamblados con pesos inversamente proporcionales al error.' },
            { icon: '📊', title: 'Datos reales SIPSA-DANE', desc: '120 meses de precios mayoristas de Barranquilla como proxy del caribe colombiano.' },
            { icon: '🌦️', title: 'Variables climáticas', desc: 'Temperatura y precipitación de Valledupar integradas como features exógenas.' },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              className="card hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-800 text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">¿Listo para predecir el mercado?</h2>
          <p className="text-green-200 mb-8">Accede al dashboard y consulta predicciones para los 8 productos.</p>
          <Link to="/dashboard" className="btn-primary text-base px-10 py-4">
            Abrir Dashboard
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
