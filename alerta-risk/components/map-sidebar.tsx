"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categorias } from "@/lib/constants"

interface MapSidebarProps {
  isOpen: boolean
}

export default function MapSidebar({ isOpen }: MapSidebarProps) {
  const [categoriaDropdownOpen, setCategoriaDropdownOpen] = useState(false)

  return (
    <aside
      className={`bg-white border-r border-gray-200 w-72 h-full overflow-y-auto transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } absolute md:relative z-10`}
    >
      <div className="bg-primary p-3 flex justify-between items-center">
        <h2 className="text-white font-medium text-sm">Clique em um ponto do mapa e relate seu problema</h2>
        <button className="text-white" aria-label="Fechar sidebar">
          <X size={18} />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer p-2 bg-gray-50 rounded"
            onClick={() => setCategoriaDropdownOpen(!categoriaDropdownOpen)}
          >
            <h3 className="font-medium text-sm">Categoria</h3>
            <ChevronDown size={16} className={`transition-transform ${categoriaDropdownOpen ? "rotate-180" : ""}`} />
          </div>

          {categoriaDropdownOpen && (
            <div className="mt-2 p-2 bg-white rounded shadow">
              <div className="mb-2">
                <input type="radio" id="todos" name="categoria" defaultChecked className="mr-2 accent-primary" />
                <label htmlFor="todos" className="text-sm cursor-pointer">
                  Todos os categorias
                </label>
              </div>

              {categorias.map((categoria) => (
                <div key={categoria.id} className="mb-2">
                  <input type="radio" id={categoria.id} name="categoria" className="mr-2 accent-primary" />
                  <label htmlFor={categoria.id} className="text-sm cursor-pointer">
                    {categoria.nome}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-sm mb-2">Ordenar por:</h3>
          <div>
            <input type="radio" id="mais_recentes" name="ordenar" defaultChecked className="mr-2 accent-primary" />
            <label htmlFor="mais_recentes" className="text-sm cursor-pointer">
              Mais recentes
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button variant="default" className="bg-primary hover:bg-primary/90 text-xs h-8">
            FILTRAR
          </Button>
          <Button variant="default" className="bg-primary hover:bg-primary/90 text-xs h-8" asChild>
            <Link href="/postagem">NOVA POSTAGEM</Link>
          </Button>
        </div>

        <div>
          <h3 className="font-medium text-sm mb-2">Fórum da região</h3>
          <div className="max-h-80 overflow-y-auto pr-1">
            {/* Forum cards */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded p-3 mb-3">
                <div className="font-medium text-sm mb-1">
                  {i === 1 && "Alagamento grave"}
                  {i === 2 && "Ponto crítico"}
                  {i === 3 && "Bueiro aberto"}
                  {i === 4 && "Deslizamento de terra"}
                  {i === 5 && "Queda de árvore"}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {i === 1 && "Rua Exemplo, 123"}
                  {i === 2 && "Av. Principal, 456"}
                  {i === 3 && "Rua das Flores, 789"}
                  {i === 4 && "Morro da Vista, s/n"}
                  {i === 5 && "Av. Central, próximo ao nº 200"}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <div className="w-5 h-5 bg-gray-300 rounded-full mr-1.5"></div>
                  <span>
                    {i === 1 && "Por: Colaborador"}
                    {i === 2 && "Por: Usuário"}
                    {i === 3 && "Por: Morador"}
                    {i === 4 && "Por: Defesa Civil"}
                    {i === 5 && "Por: Bombeiros"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

