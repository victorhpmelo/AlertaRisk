import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="bg-white shadow-sm py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-720yhwOYl5OuD698RkPs8eItz3l7nX.png"
            alt="AlertaRisk Logo"
            width={150}
            height={30}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/mapa" className="text-gray-600 font-medium hover:text-primary transition-colors">
            Mapa de alerta
          </Link>
          <Link href="/orientacoes" className="text-gray-600 font-medium hover:text-primary transition-colors">
            Orientações de segurança
          </Link>
          <Link href="/login" className="text-gray-600 font-medium hover:text-primary transition-colors">
            Login
          </Link>
          <Link
            href="/alertas"
            className="bg-[#FFB800] text-white px-4 py-2 rounded font-medium hover:bg-[#e6a600] transition-colors"
          >
            RECEBER ALERTAS
          </Link>
        </nav>
      </div>
    </header>
  )
}

