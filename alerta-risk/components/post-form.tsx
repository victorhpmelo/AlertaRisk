"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categorias } from "@/lib/constants"

export default function PostForm() {
  const router = useRouter()
  const [step, setStep] = useState<"address" | "post">("address")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Form data state
  const [addressData, setAddressData] = useState({
    rua: "",
    bairro: "",
    cidade: "Recife",
    estado: "PE",
    referencia: "",
  })

  const [postData, setPostData] = useState({
    categoria: "",
    titulo: "",
    descricao: "",
  })

  // Handle address form input changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddressData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle post form input changes
  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPostData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setPostData((prev) => ({ ...prev, categoria: value }))
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Move to next step
  const nextStep = () => {
    setStep("post")
  }

  // Move to previous step
  const previousStep = () => {
    setStep("address")
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically send the data to your backend
    console.log("Address Data:", addressData)
    console.log("Post Data:", postData)

    // Show success message and redirect
    alert("Postagem enviada com sucesso!")
    router.push("/")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        {/* Address Form */}
        {step === "address" && (
          <form>
            <div className="flex items-center gap-4 mb-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="text-gray-500 hover:bg-gray-100 p-2 rounded-full"
              >
                <ChevronLeft size={20} />
              </button>
              <h1 className="text-2xl font-semibold">Detalhes do endereço</h1>
            </div>

            <p className="text-gray-500 mb-6">Preencha as informações detalhadas do local</p>

            <div className="space-y-4">
              <div>
                <label htmlFor="rua" className="block font-medium mb-1">
                  Rua/Avenida *
                </label>
                <Input
                  id="rua"
                  name="rua"
                  value={addressData.rua}
                  onChange={handleAddressChange}
                  placeholder="Nome da rua ou avenida"
                  required
                />
              </div>

              <div>
                <label htmlFor="bairro" className="block font-medium mb-1">
                  Bairro *
                </label>
                <Input
                  id="bairro"
                  name="bairro"
                  value={addressData.bairro}
                  onChange={handleAddressChange}
                  placeholder="Nome do bairro"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cidade" className="block font-medium mb-1">
                    Cidade *
                  </label>
                  <Input id="cidade" name="cidade" value={addressData.cidade} readOnly className="bg-gray-50" />
                </div>

                <div>
                  <label htmlFor="estado" className="block font-medium mb-1">
                    Estado *
                  </label>
                  <Input id="estado" name="estado" value={addressData.estado} readOnly className="bg-gray-50" />
                </div>
              </div>

              <div>
                <label htmlFor="referencia" className="block font-medium mb-1">
                  Ponto de Referência
                </label>
                <Input
                  id="referencia"
                  name="referencia"
                  value={addressData.referencia}
                  onChange={handleAddressChange}
                  placeholder="Ex: Próximo ao supermercado central"
                />
              </div>

              <Button type="button" onClick={nextStep} className="w-full bg-primary hover:bg-primary/90 mt-4">
                CONTINUAR
                <ChevronRight className="ml-2" size={18} />
              </Button>
            </div>
          </form>
        )}

        {/* Post Form */}
        {step === "post" && (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-4 mb-6">
              <button type="button" onClick={previousStep} className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                <ChevronLeft size={20} />
              </button>
              <h1 className="text-2xl font-semibold">Nova postagem</h1>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="categoria" className="block font-medium mb-1">
                  Categoria *
                </label>
                <Select value={postData.categoria} onValueChange={handleCategoryChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria.id} value={categoria.id}>
                        {categoria.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="titulo" className="block font-medium mb-1">
                  Título *
                </label>
                <Input
                  id="titulo"
                  name="titulo"
                  value={postData.titulo}
                  onChange={handlePostChange}
                  placeholder="Digite o título da sua postagem"
                  required
                />
              </div>

              <div>
                <label htmlFor="descricao" className="block font-medium mb-1">
                  Conteúdo *
                </label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  value={postData.descricao}
                  onChange={handlePostChange}
                  placeholder="Descreva a situação..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Imagem</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-primary transition-colors">
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
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          width={200}
                          height={150}
                          className="max-h-[200px] object-contain rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <svg
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

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4">
                PUBLICAR
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

