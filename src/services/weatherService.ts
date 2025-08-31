import { UIWeather } from '@/shared/types/weather';

export class WeatherService {
  static async getWeather(latitude: number, longitude: number): Promise<UIWeather> {
    try {
      const response = await fetch(`/api/weather?latitude=${latitude}&longitude=${longitude}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch weather: ${response.status}`);
      }
      
      const weather = await response.json();
      return weather;
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  }
}
