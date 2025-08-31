import { WeatherService } from '@/services/weatherService'
import { useQuery } from '@tanstack/react-query'

export function useWeather(latitude: number, longitude: number, enabled = true) {
  return useQuery({
    queryKey: ['weather', latitude, longitude],
    queryFn: () => WeatherService.getWeather(latitude, longitude),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  })
}