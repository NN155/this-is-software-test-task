import { useModal } from '@/hooks/useModal'
import { UIUser } from '@/shared/types/user'
import { useState } from 'react'
import { useWeather } from './useWeather'

export function useWeatherModal() {
  const modal = useModal()
  const [selectedUser, setSelectedUser] = useState<UIUser | null>(null)

  const {
    data: weather,
    isLoading: weatherLoading
  } = useWeather(
    selectedUser?.coordinates.latitude || 0,
    selectedUser?.coordinates.longitude || 0,
    !!selectedUser // Only fetch weather when user is selected
  )

  const handleWeatherClick = (user: UIUser) => {
    console.log('Weather clicked for:', user.name)
    setSelectedUser(user)
    modal.openModal()
  }


  const handleCloseModal = () => {
    modal.closeModal()
    setSelectedUser(null)
  }

  return {
    // Actions
    handleWeatherClick,
    
    // Modal state
    isOpen: modal.isOpen,
    openModal: modal.openModal,
    closeModal: handleCloseModal,

    // Selected user
    selectedUser,

    // Weather data
    weather,
    weatherLoading,
  }
}