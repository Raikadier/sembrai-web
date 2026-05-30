// store/useDashboardStore.ts — Estado global del dashboard (Zustand)
import { create } from 'zustand'
import type { Prediccion, PrecioHistorico } from '../types'

interface DashboardState {
  productoActivo:  string | null
  semanasActivo:   number
  prediccion:      Prediccion | null
  historico:       PrecioHistorico | null
  modelosListos:   boolean

  setProducto:     (p: string) => void
  setSemanas:      (s: number) => void
  setPrediccion:   (p: Prediccion) => void
  setHistorico:    (h: PrecioHistorico) => void
  setModelosListos:(v: boolean) => void
}

export const useDashboardStore = create<DashboardState>(set => ({
  productoActivo: null,
  semanasActivo:  4,
  prediccion:     null,
  historico:      null,
  modelosListos:  false,

  setProducto:      p => set({ productoActivo: p }),
  setSemanas:       s => set({ semanasActivo: s }),
  setPrediccion:    p => set({ prediccion: p }),
  setHistorico:     h => set({ historico: h }),
  setModelosListos: v => set({ modelosListos: v }),
}))
