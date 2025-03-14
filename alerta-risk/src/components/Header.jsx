import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="bg-white shadow-sm py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-720yhwOYl5OuD698RkPs8eItz3l7nX.png"
            alt="AlertaRisk Logo"
            className="h-8"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 font-medium hover:text-[#98CD64] transition-colors">
            Mapa de alerta
          </Link>
          <Link to="/orientacoes" className="text-gray-600 font-medium hover:text-[#98CD64] transition-colors">
            Orientações de segurança
          </Link>
          <Link to="/login" className="text-gray-600 font-medium hover:text-[#98CD64] transition-colors">
            Login
          </Link>
          <Link
            to="/alertas"
            className="bg-[#FFB800] text-white px-4 py-2 rounded font-medium hover:bg-[#e6a600] transition-colors"
          >
            RECEBER ALERTAS
          </Link>
        </nav>
      </div>
    </header>
  )
}

