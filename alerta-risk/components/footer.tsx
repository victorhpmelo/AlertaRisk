import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-720yhwOYl5OuD698RkPs8eItz3l7nX.png"
                alt="AlertaRisk Logo"
                width={150}
                height={40}
              />
            </Link>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Links úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-primary transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/mapas" className="text-gray-300 hover:text-primary transition-colors">
                  Mapas de alerta
                </Link>
              </li>
              <li>
                <Link href="/orientacoes" className="text-gray-300 hover:text-primary transition-colors">
                  Orientações
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Políticas</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/termos" className="text-gray-300 hover:text-primary transition-colors">
                  Termos e Condições
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>© AlertaRisk. Alguns direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

