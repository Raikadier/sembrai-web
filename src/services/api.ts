// services/api.ts — Cliente HTTP centralizado
import axios from 'axios'
import type { Prediccion, PrecioHistorico, EstadoSistema } from '../types'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

const http = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  timeout: 30_000,
})

// Interceptor global de errores
http.interceptors.response.use(
  res => res,
  err => {
    const msg = err.response?.data?.error ?? err.message
    return Promise.reject(new Error(msg))
  }
)

export const api = {
  prediccion: {
    porProducto: (producto: string, semanas = 4) =>
      http.get<Prediccion>(`/prediccion/${producto}?semanas=${semanas}`)
          .then(r => r.data),

    todos: () =>
      http.get<Record<string, Prediccion>>('/prediccion/')
          .then(r => r.data),
  },

  historico: {
    porProducto: (producto: string, anios = 3) =>
      http.get<PrecioHistorico>(`/historico/${producto}?anios=${anios}`)
          .then(r => r.data),
  },

  sistema: {
    estado: () =>
      http.get<EstadoSistema>('/health/status').then(r => r.data),

    health: () =>
      http.get('/health/').then(r => r.data),
  },
}
