'use client'

import { useModal } from '@/hooks/useModal'
import { useWeather } from '@/hooks/useWeather'
import { UIUser } from '@/shared/types/user'
import {
  Card,
  CardActions,
  CardContent,
  Divider,
} from '@mui/material'
import UserInfo from './UserInfo'
import WeatherDisplay from './WeatherDisplay'
import WeatherModal from './WeatherModal'

interface UserCardProps {
  user: UIUser
  actions?: React.ReactNode
}

export default function UserCard({ user, actions }: UserCardProps) {
  const weatherModal = useModal()
  
  const { 
    data: weather, 
    isLoading: weatherLoading, 
  } = useWeather(user.coordinates.latitude, user.coordinates.longitude)

  const handleWeatherClick = () => {
    weatherModal.openModal()
  }

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 3,
          '&:hover': {
            boxShadow: 6,
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <UserInfo user={user} />
          
          <Divider sx={{ my: 2 }} />
          
          <WeatherDisplay 
            weather={weather} 
            loading={weatherLoading} 
          />
        </CardContent>
        {actions && <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>{actions}</CardActions>}

        {/* <UserCardActions
          onSave={handleSave}
          onWeatherClick={handleWeatherClick}
          showSaveButton={showSaveButton}
          isRemoveMode={isRemoveMode}
        /> */}
      </Card>

      <WeatherModal
        open={weatherModal.isOpen}
        onClose={weatherModal.closeModal}
        weather={weather}
        loading={weatherLoading}
        userName={user.name}
      />
    </>
  )
}