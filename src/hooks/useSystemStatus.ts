// hooks/useSystemStatus.ts
// Hace polling al backend hasta que los modelos estén listos
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../services/api'
import { useDashboardStore } from '../store/useDashboardStore'

export function useSystemStatus() {
  const setModelosListos = useDashboardStore(s => s.setModelosListos)
  const modelosListos    = useDashboardStore(s => s.modelosListos)

  const query = useQuery({
    queryKey: ['system-status'],
    queryFn:  api.sistema.estado,
    // Si los modelos no están listos, reintenta cada 5 s
    refetchInterval: modelosListos ? false : 5000,
    staleTime: 0,
  })

  useEffect(() => {
    if (query.data?.modelos_listos) {
      setModelosListos(true)
    }
  }, [query.data, setModelosListos])

  return {
    modelosListos,
    productos:  query.data?.productos ?? [],
    isLoading:  query.isLoading,
    error:      query.error,
  }
}
