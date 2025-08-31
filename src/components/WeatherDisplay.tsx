import { UIWeather } from '@/shared/types/weather'
import {
  ThermostatAuto,
} from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  Typography,
} from '@mui/material'
import WeatherIcon from './WeatherIcon'

interface WeatherDisplayProps {
  weather?: UIWeather
  loading: boolean
}

export default function WeatherDisplay({ weather, loading }: WeatherDisplayProps) {
  if (loading) {
    return (
      <Box>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
          Current Weather
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      </Box>
    )
  }

  if (!weather) {
    return (
      <Box>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
          Current Weather
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weather unavailable
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
        Current Weather
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <WeatherIcon 
            weatherCode={weather.weatherCode} 
            isDay={weather.isDay} 
            size="large"
          />
          <Typography variant="h4" sx={{ ml: 1, fontWeight: 500 }}>
            {weather.current}°C
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <ThermostatAuto fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              Max: {weather.max}°C
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThermostatAuto fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              Min: {weather.min}°C
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
