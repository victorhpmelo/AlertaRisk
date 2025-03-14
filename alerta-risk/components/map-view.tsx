"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { RECIFE_LAT, RECIFE_LON, bairrosRecife } from "@/lib/constants"
import { fetchWeatherData, type WeatherData } from "@/lib/api"
import MapSidebar from "./map-sidebar"
import MapLegend from "./map-legend"
import { ChevronRight, Plus, Minus } from "lucide-react"

// Dynamically import Leaflet components with no SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Circle = dynamic(() => import("react-leaflet").then((mod) => mod.Circle), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })
const ZoomControl = dynamic(() => import("react-leaflet").then((mod) => mod.ZoomControl), { ssr: false })
const useMap = dynamic(() => import("react-leaflet").then((mod) => mod.useMap), { ssr: false })

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
        <Plus size={20} />
      </button>
      <button
        onClick={handleZoomOut}
        className="p-2 hover:bg-gray-100 flex items-center justify-center"
        aria-label="Diminuir zoom"
      >
        <Minus size={20} />
      </button>
    </div>
  )
}

export default function MapView() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [weatherData, setWeatherData] = useState<Map<string, WeatherData>>(new Map())
  const [isMapReady, setIsMapReady] = useState(false)

  useEffect(() => {
    // Set map as ready after component mounts
    setIsMapReady(true)

    // Fetch weather data for each neighborhood
    const fetchAllWeatherData = async () => {
      const dataMap = new Map<string, WeatherData>()

      for (const bairro of bairrosRecife) {
        try {
          // Generate slightly random coordinates around Recife
          const randomLat = RECIFE_LAT + (Math.random() - 0.5) * 0.1
          const randomLon = RECIFE_LON + (Math.random() - 0.5) * 0.1

          const data = await fetchWeatherData(randomLat, randomLon)
          dataMap.set(bairro, data)
        } catch (error) {
          console.error(`Error fetching data for ${bairro}:`, error)
        }
      }

      setWeatherData(dataMap)
    }

    fetchAllWeatherData()
  }, [])

  // Determine circle color based on precipitation
  const getCircleColor = (precipitation: number) => {
    if (precipitation > 7.6) {
      return "red"
    } else if (precipitation >= 2.5) {
      return "orange"
    } else {
      return "green"
    }
  }

  return (
    <div className="flex flex-1 relative h-[calc(100vh-64px-160px)]">
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
            {Array.from(weatherData.entries()).map(([bairro, data]) => {
              // Generate random coordinates around Recife
              const lat = RECIFE_LAT + (Math.random() - 0.5) * 0.1
              const lon = RECIFE_LON + (Math.random() - 0.5) * 0.1

              const precipitation = data.rain?.["1h"] || 0
              const color = getCircleColor(precipitation)

              return (
                <Circle
                  key={bairro}
                  center={[lat, lon]}
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
          className="absolute top-4 left-4 z-[1000] bg-primary text-white w-9 h-9 rounded-full flex items-center justify-center shadow-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? "Fechar sidebar" : "Abrir sidebar"}
        >
          <ChevronRight className={`transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Map Legend */}
        <MapLegend />
      </div>
    </div>
  )
}

