import { UIWeather } from '@/shared/types/weather'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import WeatherIcon from './WeatherIcon'

interface WeatherModalProps {
  open: boolean
  onClose: () => void
  weather?: UIWeather
  loading: boolean
  userName: string
}

export default function WeatherModal({ 
  open, 
  onClose, 
  weather, 
  loading, 
  userName 
}: WeatherModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth disableScrollLock={true}>
      <DialogTitle>Weather Details for {userName}</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : weather ? (
          <Box sx={{ py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="h2" sx={{ mr: 2 }}>
                <WeatherIcon 
                  weatherCode={weather.weatherCode} 
                  isDay={weather.isDay} 
                  size="large"
                />
              </Typography>
              <Box>
                <Typography variant="h4" component="div">
                  {weather.current}°C
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {weather.description}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{weather.max}°C</Typography>
                <Typography variant="caption" color="text.secondary">Max</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{weather.min}°C</Typography>
                <Typography variant="caption" color="text.secondary">Min</Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Typography>Failed to load weather data</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
