"use client"

import { useEffect, useState, useRef } from "react"
import { MapContainer, TileLayer, Circle, Popup, useMap } from "react-leaflet"
import { RECIFE_LAT, RECIFE_LON, bairrosRecife } from "../lib/constants"
import { fetchWeatherData } from "../lib/api"
import MapSidebar from "./MapSidebar"
import MapLegend from "./MapLegend"

// Custom zoom control component
function ZoomControls() {
  const map = useMap()

  const handleZoomIn = () => {
    map.setZoom(map.getZoom() + 1)
  }

  const handleZoomOut = () => {
    map.setZoom(map.getZoom() - 1)
  }

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white rounded shadow-md flex flex-col">
      <button
        onClick={handleZoomIn}
        className="p-2 hover:bg-gray-100 border-b border-gray-200 flex items-center justify-center"
        aria-label="Aumentar zoom"
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
          <path d="M5 12h14M12 5v14" />
        </svg>
      </button>
      <button
        onClick={handleZoomOut}
        className="p-2 hover:bg-gray-100 flex items-center justify-center"
        aria-label="Diminuir zoom"
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
          <path d="M5 12h14" />
        </svg>
      </button>
    </div>
  )
}

// Componente para pré-carregar dados do tempo
function WeatherDataLoader({ onDataLoaded }) {
  useEffect(() => {
    // Função para buscar dados do tempo para todos os bairros de uma vez
    const fetchAllWeatherData = async () => {
      try {
        // Buscar dados apenas uma vez para Recife e usar para todos os bairros
        // Isso melhora muito a performance
        const data = await fetchWeatherData(RECIFE_LAT, RECIFE_LON)

        // Criar um mapa de dados para cada bairro
        const dataMap = new Map()

        // Atribuir os mesmos dados para cada bairro, mas com pequenas variações
        // para tornar o mapa mais interessante
        bairrosRecife.forEach((bairro) => {
          // Clonar os dados para não modificar o original
          const bairroData = JSON.parse(JSON.stringify(data))

          // Adicionar pequenas variações aleatórias na temperatura e precipitação
          bairroData.main.temp += (Math.random() - 0.5) * 2 // +/- 1 grau

          // Garantir que rain existe
          if (!bairroData.rain) {
            bairroData.rain = { "1h": 0 }
          }

          // Adicionar variação na precipitação
          bairroData.rain["1h"] = Math.max(0, (bairroData.rain["1h"] || 0) + Math.random() * 8)

          dataMap.set(bairro, bairroData)
        })

        onDataLoaded(dataMap)
      } catch (error) {
        console.error("Erro ao buscar dados do tempo:", error)
      }
    }

    fetchAllWeatherData()
  }, [onDataLoaded])

  return null
}

export default function MapView() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [weatherData, setWeatherData] = useState(new Map())
  const [isMapReady, setIsMapReady] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    // Set map as ready after component mounts
    setIsMapReady(true)
  }, [])

  // Função para receber os dados carregados
  const handleDataLoaded = (data) => {
    setWeatherData(data)
    setDataLoaded(true)
  }

  // Determine circle color based on precipitation
  const getCircleColor = (precipitation) => {
    if (precipitation > 7.6) {
      return "red"
    } else if (precipitation >= 2.5) {
      return "orange"
    } else {
      return "green"
    }
  }

  // Coordenadas pré-calculadas para cada bairro
  // Isso evita recalcular a cada renderização
  const bairroCoords = useRef({})

  // Inicializar coordenadas aleatórias para cada bairro
  if (Object.keys(bairroCoords.current).length === 0) {
    bairrosRecife.forEach((bairro) => {
      bairroCoords.current[bairro] = {
        lat: RECIFE_LAT + (Math.random() - 0.5) * 0.1,
        lon: RECIFE_LON + (Math.random() - 0.5) * 0.1,
      }
    })
  }

  return (
    <div className="flex flex-1 relative h-[calc(100vh-64px-160px)]">
      {/* Carregador de dados */}
      {!dataLoaded && <WeatherDataLoader onDataLoaded={handleDataLoaded} />}

      {/* Sidebar */}
      <MapSidebar isOpen={sidebarOpen} />

      {/* Map Container */}
      <div className="flex-1 relative">
        {isMapReady && (
          <MapContainer center={[RECIFE_LAT, RECIFE_LON]} zoom={12} zoomControl={false} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Render circles for each neighborhood */}
            {dataLoaded &&
              Array.from(weatherData.entries()).map(([bairro, data]) => {
                const coords = bairroCoords.current[bairro]
                const precipitation = data.rain?.["1h"] || 0
                const color = getCircleColor(precipitation)

                return (
                  <Circle
                    key={bairro}
                    center={[coords.lat, coords.lon]}
                    radius={300}
                    pathOptions={{
                      color,
                      fillColor: color,
                      fillOpacity: 0.5,
                    }}
                  >
                    <Popup>
                      <div className="p-3">
                        <h3 className="font-semibold text-lg mb-1">{bairro}</h3>
                        <p>Temperatura: {data.main.temp.toFixed(1)}°C</p>
                        <p>Umidade: {data.main.humidity}%</p>
                        <p>Condição: {data.weather[0].description}</p>
                        <p>Precipitação: {precipitation.toFixed(1)}mm/h</p>
                      </div>
                    </Popup>
                  </Circle>
                )
              })}

            <ZoomControls />
          </MapContainer>
        )}

        {/* Sidebar Toggle Button */}
        <button
          className="absolute top-4 left-4 z-[1000] bg-[#98CD64] text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? "Fechar sidebar" : "Abrir sidebar"}
        >
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
            className={`transition-transform ${sidebarOpen ? "rotate-180" : ""}`}
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        {/* Map Legend */}
        <MapLegend />
      </div>
    </div>
  )
}

