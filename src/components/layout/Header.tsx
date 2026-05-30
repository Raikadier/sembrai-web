import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const NAV = [
  { href: '/',             label: 'Inicio' },
  { href: '/dashboard',    label: 'Dashboard' },
  { href: '/presentacion', label: 'Cómo funciona' },
  { href: '/metodologia',  label: 'Metodología' },
]

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🌱</span>
          <div>
            <span className="font-bold text-green-700 text-lg leading-none">Sembr</span>
            <span className="font-bold text-orange-600 text-lg leading-none">.ai</span>
            <p className="text-[10px] text-gray-400 leading-none tracking-wide uppercase">
              Predicción Agrícola IA
            </p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? 'text-green-700'
                  : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
              }`}
            >
              {label}
              {pathname === href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-green-50 rounded-lg -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <Link to="/dashboard" className="btn-primary text-sm hidden md:block">
          Ver predicciones
        </Link>
      </div>
    </header>
  )
}
