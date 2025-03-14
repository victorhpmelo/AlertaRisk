"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { categorias } from "../lib/constants"

export default function MapSidebar({ isOpen }) {
  const [categoriaDropdownOpen, setCategoriaDropdownOpen] = useState(false)

  return (
    <aside
      className={`bg-white border-r border-gray-200 w-72 h-full overflow-y-auto transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } absolute md:relative z-10`}
    >
      <div className="bg-[#98CD64] p-3 flex justify-between items-center">
        <h2 className="text-white font-medium text-sm">Clique em um ponto do mapa e relate seu problema</h2>
        <button className="text-white" aria-label="Fechar sidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer p-2 bg-gray-50 rounded"
            onClick={() => setCategoriaDropdownOpen(!categoriaDropdownOpen)}
          >
            <h3 className="font-medium text-sm">Categoria</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${categoriaDropdownOpen ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>

          {categoriaDropdownOpen && (
            <div className="mt-2 p-2 bg-white rounded shadow">
              <div className="mb-2">
                <input type="radio" id="todos" name="categoria" defaultChecked className="mr-2 accent-[#98CD64]" />
                <label htmlFor="todos" className="text-sm cursor-pointer">
                  Todos os categorias
                </label>
              </div>

              {categorias.map((categoria) => (
                <div key={categoria.id} className="mb-2">
                  <input type="radio" id={categoria.id} name="categoria" className="mr-2 accent-[#98CD64]" />
                  <label htmlFor={categoria.id} className="text-sm cursor-pointer">
                    {categoria.nome}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button className="bg-[#98CD64] hover:bg-[#98CD64]/90 text-white text-xs h-8 rounded">FILTRAR</button>
          <Link
            to="/postagem"
            className="bg-[#98CD64] hover:bg-[#98CD64]/90 text-white text-xs h-8 rounded flex items-center justify-center"
          >
            NOVA POSTAGEM
          </Link>
        </div>

        <div>
          <h3 className="font-medium text-sm mb-2">Fórum da região</h3>
          <div className="max-h-80 overflow-y-auto pr-1">
            {/* Forum cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded p-3 mb-3">
                <div className="font-medium text-sm mb-1">
                  {i === 1 && "Alagamento grave"}
                  {i === 2 && "Ponto crítico"}
                  {i === 3 && "Bueiro aberto"}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {i === 1 && "Rua Exemplo, 123"}
                  {i === 2 && "Av. Principal, 456"}
                  {i === 3 && "Rua das Flores, 789"}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <div className="w-5 h-5 bg-gray-300 rounded-full mr-1.5"></div>
                  <span>
                    {i === 1 && "Por: Colaborador"}
                    {i === 2 && "Por: Usuário"}
                    {i === 3 && "Por: Morador"}
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

