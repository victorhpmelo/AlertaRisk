import { API_KEY } from "./constants"

export async function fetchWeatherData(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Falha ao buscar dados do tempo")
    }

    const data = await response.json()

    // Garantir que rain seja 0 quando não há precipitação
    if (!data.rain) {
      data.rain = { "1h": 0 }
    }

    return data
  } catch (error) {
    console.error("Erro na API:", error)
    // Retornar dados simulados em caso de erro, sem precipitação
    return {
      main: {
        temp: 25 + Math.random() * 5,
        humidity: 60 + Math.random() * 20,
      },
      weather: [{ description: "céu limpo" }],
      rain: { "1h": 0 }, // Sem precipitação por padrão
    }
  }
}

