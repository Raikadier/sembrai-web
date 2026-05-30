// types/index.ts — Tipos TypeScript del dominio

export interface Prediccion {
  producto:       string
  precio_actual:  number
  ultima_fecha:   string
  fechas:         string[]
  predicciones:   number[]
  intervalos_inf: number[]
  intervalos_sup: number[]
  tendencia:      'alza' | 'estable' | 'baja'
  semanas:        number
}

export interface PrecioHistorico {
  producto:   string
  fechas:     string[]
  precios:    number[]
  precio_min: number[]
  precio_max: number[]
}

export interface EstadoSistema {
  status:           string
  modelos_listos:   boolean
  version:          string
  datos_disponibles:boolean
  modelos:          ModeloStatus[]
  productos:        string[]
  horizonte_semanas:number
}

export interface ModeloStatus {
  producto: string
  lstm:     boolean
  rf:       boolean
}

export type Tendencia = 'alza' | 'estable' | 'baja'

export const EMOJI_PRODUCTOS: Record<string, string> = {
  Tomate:    '🍅',
  Papa:      '🥔',
  Cebolla:   '🧅',
  Platano:   '🍌',
  Yuca:      '🪵',
  Zanahoria: '🥕',
  Mango:     '🥭',
  Arroz:     '🍚',
}
