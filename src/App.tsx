import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, lazy } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import PageLoader from './components/ui/PageLoader'

// Lazy loading — cada página se carga solo cuando se navega a ella
const Landing      = lazy(() => import('./pages/Landing/LandingPage'))
const Dashboard    = lazy(() => import('./pages/Dashboard/DashboardPage'))
const Presentation = lazy(() => import('./pages/Presentation/PresentationPage'))
const Methodology  = lazy(() => import('./pages/Methodology/MethodologyPage'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"             element={<Landing />} />
                <Route path="/dashboard"    element={<Dashboard />} />
                <Route path="/presentacion" element={<Presentation />} />
                <Route path="/metodologia"  element={<Methodology />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
