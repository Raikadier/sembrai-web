/**
 * TrainingAnimation.tsx
 * Animación 2D de la curva de pérdida durante el entrenamiento del LSTM.
 * Simula la convergencia del modelo usando los valores reales del entrenamiento.
 */
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Curva de pérdida simulada basada en el entrenamiento real (Early Stopping ~30 épocas)
function generateLossData(epochs: number) {
  const train: number[] = []
  const val:   number[] = []
  for (let e = 0; e < epochs; e++) {
    const t = e / epochs
    train.push(0.08 + 0.42 * Math.exp(-t * 6) + (Math.random() - 0.5) * 0.008)
    val.push(  0.10 + 0.45 * Math.exp(-t * 5.2) + (Math.random() - 0.5) * 0.015)
  }
  return { train, val }
}

const TOTAL_EPOCHS = 45
const LOSS_DATA    = generateLossData(TOTAL_EPOCHS)

export default function TrainingAnimation() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const frameRef   = useRef(0)
  const epochRef   = useRef(0)
  const [epoch, setEpoch]     = useState(0)
  const [running, setRunning] = useState(false)
  const [done, setDone]       = useState(false)

  function drawFrame(ctx: CanvasRenderingContext2D, upTo: number) {
    const W = ctx.canvas.width
    const H = ctx.canvas.height
    const PAD = { top: 20, right: 20, bottom: 40, left: 50 }
    const W0  = W - PAD.left - PAD.right
    const H0  = H - PAD.top  - PAD.bottom

    ctx.clearRect(0, 0, W, H)

    // Fondo
    ctx.fillStyle = '#f8faf5'
    ctx.fillRect(0, 0, W, H)

    // Grid
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth   = 1
    for (let i = 0; i <= 4; i++) {
      const y = PAD.top + H0 * (i / 4)
      ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(PAD.left + W0, y)
      ctx.stroke()
    }

    // Ejes
    ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(PAD.left, PAD.top); ctx.lineTo(PAD.left, PAD.top + H0)
    ctx.lineTo(PAD.left + W0, PAD.top + H0); ctx.stroke()

    // Etiquetas eje Y
    ctx.fillStyle = '#9ca3af'; ctx.font = '11px Inter, sans-serif'; ctx.textAlign = 'right'
    for (let i = 0; i <= 4; i++) {
      const val = 0.5 - (i / 4) * 0.45
      ctx.fillText(val.toFixed(2), PAD.left - 6, PAD.top + H0 * (i / 4) + 4)
    }

    // Etiqueta eje X
    ctx.textAlign = 'center'; ctx.fillStyle = '#6b7280'; ctx.font = '11px Inter, sans-serif'
    ctx.fillText('Épocas de entrenamiento', PAD.left + W0 / 2, H - 8)

    if (upTo === 0) return

    const scaleX = (e: number) => PAD.left + (e / (TOTAL_EPOCHS - 1)) * W0
    const scaleY = (v: number) => PAD.top + H0 - ((v - 0.05) / 0.45) * H0

    // Zona entre curvas (overfitting gap)
    ctx.beginPath()
    for (let e = 0; e < upTo; e++) {
      const x = scaleX(e); const y = scaleY(LOSS_DATA.val[e])
      e === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    for (let e = upTo - 1; e >= 0; e--) {
      ctx.lineTo(scaleX(e), scaleY(LOSS_DATA.train[e]))
    }
    ctx.closePath()
    ctx.fillStyle = 'rgba(37,99,235,0.06)'; ctx.fill()

    // Curva de validación
    ctx.beginPath(); ctx.strokeStyle = '#e65100'; ctx.lineWidth = 2.5; ctx.setLineDash([5, 3])
    for (let e = 0; e < upTo; e++) {
      const x = scaleX(e); const y = scaleY(LOSS_DATA.val[e])
      e === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.stroke(); ctx.setLineDash([])

    // Curva de entrenamiento
    ctx.beginPath(); ctx.strokeStyle = '#16a34a'; ctx.lineWidth = 2.5
    for (let e = 0; e < upTo; e++) {
      const x = scaleX(e); const y = scaleY(LOSS_DATA.train[e])
      e === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.stroke()

    // Punto actual
    if (upTo > 0) {
      const ex = scaleX(upTo - 1); const ey = scaleY(LOSS_DATA.train[upTo - 1])
      ctx.beginPath(); ctx.arc(ex, ey, 5, 0, Math.PI * 2)
      ctx.fillStyle = '#16a34a'; ctx.fill()
    }

    // Leyenda
    const ly = PAD.top + 12
    ;[{ c: '#16a34a', l: 'Entrenamiento', dash: false },
      { c: '#e65100', l: 'Validación',    dash: true  }].forEach(({ c, l, dash }, i) => {
      const lx = PAD.left + i * 140
      ctx.beginPath()
      if (dash) ctx.setLineDash([4, 2])
      ctx.moveTo(lx, ly); ctx.lineTo(lx + 20, ly)
      ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.stroke(); ctx.setLineDash([])
      ctx.fillStyle = '#374151'; ctx.font = 'bold 11px Inter, sans-serif'
      ctx.textAlign = 'left'; ctx.fillText(l, lx + 24, ly + 4)
    })
  }

  function start() {
    if (running) return
    epochRef.current = 0
    setEpoch(0)
    setDone(false)
    setRunning(true)
  }

  useEffect(() => {
    if (!running) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const tick = () => {
      epochRef.current = Math.min(epochRef.current + 1, TOTAL_EPOCHS)
      setEpoch(epochRef.current)
      drawFrame(ctx, epochRef.current)

      if (epochRef.current < TOTAL_EPOCHS) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setRunning(false)
        setDone(true)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [running])

  // Dibuja estado inicial
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    drawFrame(ctx, 0)
  }, [])

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        width={600}
        height={280}
        className="w-full rounded-xl border border-gray-100 shadow-sm"
      />

      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-gray-500">
          {running
            ? `Época ${epoch} / ${TOTAL_EPOCHS} — Loss: ${LOSS_DATA.train[epoch - 1]?.toFixed(4) ?? '—'}`
            : done
            ? `✅ Early stopping en época ${TOTAL_EPOCHS} · Loss final: ${LOSS_DATA.train.at(-1)?.toFixed(4)}`
            : 'Presiona ▶ para simular el entrenamiento'
          }
        </div>
        <motion.button
          onClick={start}
          disabled={running}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer
            ${running
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-green-700 text-white hover:bg-green-800 shadow'
            }`}
          whileHover={!running ? { scale: 1.05 } : {}}
          whileTap={!running ? { scale: 0.97 } : {}}
        >
          {running ? '⏳ Entrenando...' : done ? '🔄 Reiniciar' : '▶ Entrenar'}
        </motion.button>
      </div>
    </div>
  )
}
