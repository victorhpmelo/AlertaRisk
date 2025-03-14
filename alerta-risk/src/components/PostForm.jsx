"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { categorias } from "../lib/constants"

export default function PostForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    rua: "",
    bairro: "",
    cidade: "Recife",
    estado: "PE",
    categoria: "",
    titulo: "",
    descricao: "",
  })

  const [imagePreview, setImagePreview] = useState(null)

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Here you would typically send the data to your backend
    console.log("Form Data:", formData)

    // Show success message and redirect
    alert("Postagem enviada com sucesso!")
    navigate("/")
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-4 mb-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:bg-gray-100 p-2 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-semibold">Nova postagem</h1>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="rua" className="block font-medium mb-1">
                Rua/Avenida *
              </label>
              <input
                id="rua"
                name="rua"
                value={formData.rua}
                onChange={handleChange}
                placeholder="Nome da rua ou avenida"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="bairro" className="block font-medium mb-1">
                Bairro *
              </label>
              <input
                id="bairro"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                placeholder="Nome do bairro"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cidade" className="block font-medium mb-1">
                  Cidade *
                </label>
                <input
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label htmlFor="estado" className="block font-medium mb-1">
                  Estado *
                </label>
                <input
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="categoria" className="block font-medium mb-1">
                Categoria *
              </label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="titulo" className="block font-medium mb-1">
                Título *
              </label>
              <input
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Digite o título da sua postagem"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="descricao" className="block font-medium mb-1">
                Conteúdo *
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Descreva a situação..."
                className="w-full p-3 border border-gray-300 rounded-md min-h-[120px]"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Imagem</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-[#98CD64] transition-colors">
                <input
                  type="file"
                  id="imagem"
                  name="imagem"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="imagem" className="cursor-pointer">
                  {imagePreview ? (
                    <div className="flex justify-center">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="max-h-[200px] object-contain rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                      <span>Clique para adicionar foto</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#98CD64] hover:bg-[#98CD64]/90 text-white py-3 rounded-md mt-4">
              PUBLICAR
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

