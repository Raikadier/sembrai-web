/**
 * NeuralNetwork3D.tsx
 * Visualización 3D interactiva de la arquitectura LSTM de Sembr.ai.
 * Capas: Input(12) → LSTM-64 → Dropout → LSTM-32 → Dense-16 → Output(4)
 * Partículas animadas fluyen entre capas representando el forward pass.
 */
import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'

// ── Configuración de capas ────────────────────────────────────────────────
const LAYERS = [
  { name: 'Entrada',   units: 12, color: '#16a34a', x: -5.0, desc: '12 meses de historia' },
  { name: 'LSTM-64',   units: 64, color: '#2563eb', x: -2.5, desc: '64 unidades · memoria larga' },
  { name: 'Dropout',   units: 16, color: '#7c3aed', x:  0.0, desc: 'Regularización 20%' },
  { name: 'LSTM-32',   units: 32, color: '#0891b2', x:  2.5, desc: '32 unidades · memoria corta' },
  { name: 'Dense',     units:  8, color: '#d97706', x:  5.0, desc: '16 neuronas · activación ReLU' },
  { name: 'Salida',    units:  4, color: '#e65100', x:  7.5, desc: '4 semanas de predicción' },
]

// ── Nodo (esfera) de neurona ──────────────────────────────────────────────
function Neuron({
  position, color, size = 0.12, onClick, selected,
}: {
  position: [number, number, number]
  color: string
  size?: number
  onClick?: () => void
  selected?: boolean
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (ref.current && selected) {
      ref.current.rotation.y += dt * 2
    }
  })

  return (
    <mesh ref={ref} position={position} onClick={onClick}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={selected ? 0.8 : 0.2}
        roughness={0.3}
        metalness={0.4}
      />
    </mesh>
  )
}

// ── Capa de neuronas ──────────────────────────────────────────────────────
function NeuronLayer({
  layerDef, onClickLayer, selectedLayer,
}: {
  layerDef: typeof LAYERS[0]
  onClickLayer: (name: string) => void
  selectedLayer: string | null
}) {
  const displayed = Math.min(layerDef.units, 20) // max 20 visibles
  const spacing   = 0.35
  const offset    = (displayed - 1) * spacing / 2

  const positions: [number, number, number][] = useMemo(
    () => Array.from({ length: displayed }, (_, i) => [
      layerDef.x,
      i * spacing - offset,
      0,
    ]),
    [layerDef.x, displayed, spacing, offset]
  )

  const selected = selectedLayer === layerDef.name

  return (
    <group onClick={() => onClickLayer(layerDef.name)}>
      {positions.map((pos, i) => (
        <Neuron
          key={i}
          position={pos}
          color={layerDef.color}
          size={selected ? 0.15 : 0.11}
          selected={selected}
        />
      ))}
      {/* Etiqueta */}
      <Text
        position={[layerDef.x, -offset - 0.6, 0]}
        fontSize={0.22}
        color={layerDef.color}
        anchorX="center"
        font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
      >
        {layerDef.name}
      </Text>
      <Text
        position={[layerDef.x, -offset - 0.95, 0]}
        fontSize={0.14}
        color="#9ca3af"
        anchorX="center"
      >
        {layerDef.units} unidades
      </Text>
    </group>
  )
}

// ── Partículas animadas (forward pass) ───────────────────────────────────
function ForwardPassParticle({ startX, endX, y, color, delay }: {
  startX: number; endX: number; y: number; color: string; delay: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const t   = useRef(delay)

  useFrame((_, dt) => {
    t.current = (t.current + dt * 0.4) % 1
    if (ref.current) {
      ref.current.position.x = startX + (endX - startX) * t.current
      ref.current.position.y = y
      const opacity = Math.sin(t.current * Math.PI)
      ;(ref.current.material as THREE.MeshStandardMaterial).opacity = opacity
    }
  })

  return (
    <mesh ref={ref} position={[startX, y, 0]}>
      <sphereGeometry args={[0.05, 6, 6]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        transparent
        opacity={0}
      />
    </mesh>
  )
}

// ── Conexiones y partículas entre capas ───────────────────────────────────
function LayerConnections() {
  const particles = useMemo(() => {
    const list: React.ReactElement[] = []
    LAYERS.slice(0, -1).forEach((from, li) => {
      const to    = LAYERS[li + 1]
      const count = 6
      for (let i = 0; i < count; i++) {
        list.push(
          <ForwardPassParticle
            key={`${li}-${i}`}
            startX={from.x}
            endX={to.x}
            y={(i - count / 2) * 0.5}
            color={to.color}
            delay={i / count}
          />
        )
      }
    })
    return list
  }, [])

  return <>{particles}</>
}

// ── Escena principal ──────────────────────────────────────────────────────
function Scene({ onSelect }: { onSelect: (layer: typeof LAYERS[0] | null) => void }) {
  const [selectedLayer, setSelected] = useState<string | null>(null)

  function handleClick(name: string) {
    const layer = LAYERS.find(l => l.name === name) ?? null
    const next  = selectedLayer === name ? null : name
    setSelected(next)
    onSelect(next ? layer : null)
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 5, 5]} intensity={1.2} />
      <pointLight position={[0, -5, -5]} intensity={0.5} color="#4ade80" />

      {LAYERS.map(layer => (
        <NeuronLayer
          key={layer.name}
          layerDef={layer}
          onClickLayer={handleClick}
          selectedLayer={selectedLayer}
        />
      ))}

      <LayerConnections />

      <OrbitControls
        enablePan={false}
        minDistance={6}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  )
}

// ── Componente exportado ──────────────────────────────────────────────────
export default function NeuralNetwork3D() {
  const [selected, setSelected] = useState<typeof LAYERS[0] | null>(null)

  return (
    <div className="relative w-full" style={{ height: 420 }}>
      <Canvas
        camera={{ position: [0, 0, 14], fov: 50 }}
        style={{ borderRadius: 16, background: 'linear-gradient(135deg,#0f172a,#1e3a5f)' }}
      >
        <Scene onSelect={setSelected} />
      </Canvas>

      {/* Panel informativo de la capa seleccionada */}
      {selected && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-xl
                        shadow-lg p-4 max-w-[200px] border border-gray-100">
          <div className="text-sm font-bold mb-1" style={{ color: selected.color }}>
            {selected.name}
          </div>
          <div className="text-xs text-gray-600 mb-1">{selected.desc}</div>
          <div className="text-xs text-gray-400">{selected.units} unidades</div>
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-2">
        Haz clic en una capa · Arrastra para rotar · Scroll para zoom
      </p>
    </div>
  )
}
