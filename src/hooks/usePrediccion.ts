// hooks/usePrediccion.ts
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { useDashboardStore } from '../store/useDashboardStore'

export function usePrediccion(producto: string | null, semanas: number) {
  const modelosListos = useDashboardStore(s => s.modelosListos)

  return useQuery({
    queryKey:  ['prediccion', producto, semanas],
    queryFn:   () => api.prediccion.porProducto(producto!, semanas),
    enabled:   !!producto && modelosListos,
    staleTime: 5 * 60 * 1000,
  })
}

export function useAllPredicciones() {
  const modelosListos = useDashboardStore(s => s.modelosListos)

  return useQuery({
    queryKey:  ['predicciones-todas'],
    queryFn:   api.prediccion.todos,
    enabled:   modelosListos,
    staleTime: 5 * 60 * 1000,
  })
}
