import { API_KEY } from "./constants"

export async function fetchWeatherData(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Falha ao buscar dados do tempo")
  }

  return await response.json()
}

