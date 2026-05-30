export default function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-green-200 border-t-green-700 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Cargando...</p>
      </div>
    </div>
  )
}
