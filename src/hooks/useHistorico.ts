// hooks/useHistorico.ts
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { useDashboardStore } from '../store/useDashboardStore'

export function useHistorico(producto: string | null, anios = 3) {
  const modelosListos = useDashboardStore(s => s.modelosListos)

  return useQuery({
    queryKey:  ['historico', producto, anios],
    queryFn:   () => api.historico.porProducto(producto!, anios),
    enabled:   !!producto && modelosListos,
    staleTime: 30 * 60 * 1000,
  })
}
