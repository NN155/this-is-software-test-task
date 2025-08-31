import { NextRequest, NextResponse } from 'next/server'
import type { UIWeather, WeatherResponse } from '@/shared/types/weather'

const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1'

function getWeatherIcon(weatherCode: number, isDay: boolean): string {
  const weatherIcons: { [key: number]: { day: string; night: string } } = {
    0: { day: '☀️', night: '🌙' }, // Clear sky
    1: { day: '🌤️', night: '🌙' }, // Mainly clear
    2: { day: '⛅', night: '☁️' }, // Partly cloudy
    3: { day: '☁️', night: '☁️' }, // Overcast
    45: { day: '🌫️', night: '🌫️' }, // Fog
    48: { day: '🌫️', night: '🌫️' }, // Depositing rime fog
    51: { day: '🌦️', night: '🌧️' }, // Drizzle: Light
    53: { day: '🌦️', night: '🌧️' }, // Drizzle: Moderate
    55: { day: '🌦️', night: '🌧️' }, // Drizzle: Dense
    61: { day: '🌧️', night: '🌧️' }, // Rain: Slight
    63: { day: '🌧️', night: '🌧️' }, // Rain: Moderate
    65: { day: '🌧️', night: '🌧️' }, // Rain: Heavy
    71: { day: '🌨️', night: '🌨️' }, // Snow: Slight
    73: { day: '🌨️', night: '🌨️' }, // Snow: Moderate
    75: { day: '🌨️', night: '🌨️' }, // Snow: Heavy
    77: { day: '🌨️', night: '🌨️' }, // Snow grains
    80: { day: '🌦️', night: '🌧️' }, // Rain showers: Slight
    81: { day: '🌦️', night: '🌧️' }, // Rain showers: Moderate
    82: { day: '🌦️', night: '🌧️' }, // Rain showers: Violent
    85: { day: '🌨️', night: '🌨️' }, // Snow showers: Slight
    86: { day: '🌨️', night: '🌨️' }, // Snow showers: Heavy
    95: { day: '⛈️', night: '⛈️' }, // Thunderstorm: Slight or moderate
    96: { day: '⛈️', night: '⛈️' }, // Thunderstorm with slight hail
    99: { day: '⛈️', night: '⛈️' }, // Thunderstorm with heavy hail
  }

  const iconSet = weatherIcons[weatherCode] || weatherIcons[0]
  return isDay ? iconSet.day : iconSet.night
}

function getWeatherDescription(weatherCode: number): string {
  const descriptions: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Thunderstorm with heavy hail',
  }

  return descriptions[weatherCode] || 'Unknown'
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const latitude = searchParams.get('latitude')
    const longitude = searchParams.get('longitude')

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      )
    }

    const response = await fetch(
      `${WEATHER_BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
    )
    if (!response.ok) {
      throw new Error(`Weather API error! status: ${response.status}`)
    }

    const data: WeatherResponse = await response.json()
    
    const weather: UIWeather = {
      current: Math.round(data.current_weather.temperature),
      min: Math.round(data.daily.temperature_2m_min[0]),
      max: Math.round(data.daily.temperature_2m_max[0]),
      weatherCode: data.current_weather.weathercode,
      isDay: data.current_weather.is_day === 1,
      icon: getWeatherIcon(data.current_weather.weathercode, data.current_weather.is_day === 1),
      description: getWeatherDescription(data.current_weather.weathercode),
    }

    return NextResponse.json(weather)
  } catch (error) {
    console.error('Error fetching weather:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}
