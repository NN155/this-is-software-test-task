'use client'

import RemoveButton from '@/components/RemoveButton'
import UserCard from '@/components/UserCard'
import WeatherButton from '@/components/WeatherButton'
import WeatherModal from '@/components/WeatherModal'
import { PAGES } from '@/config/pages.config'
import { useSavedUsers } from '@/hooks/useSavedUsers'
import { useWeatherModal } from '@/hooks/useWeatherModal'
import {
  Add as AddIcon,
} from '@mui/icons-material'
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Fab,
  Typography
} from '@mui/material'
import { useRouter } from 'next/navigation'

export default function SavedPage() {
  const router = useRouter()
  const { savedUsers, loading, error, removeUser } = useSavedUsers()

  const {
    handleWeatherClick,
    isOpen,
    closeModal,
    selectedUser,
    weather,
    weatherLoading
  } = useWeatherModal()

  const handleGoToHome = () => {
    router.push(PAGES.DASHBOARD)
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          Error loading saved users: {error}
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Saved Users
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your collection of saved users ({savedUsers.length})
        </Typography>
      </Box>

      {/* Empty State */}
      {savedUsers.length === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="300px"
          textAlign="center"
        >
          <Typography variant="h6" gutterBottom>
            No saved users yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Go to the home page and save some users to see them here
          </Typography>
          <Fab
            variant="extended"
            color="primary"
            onClick={handleGoToHome}
          >
            <AddIcon sx={{ mr: 1 }} />
            Find Users
          </Fab>
        </Box>
      )}

      {/* Users Grid */}
      {savedUsers.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {savedUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              actions={
                <>
                  <RemoveButton onClick={() => removeUser(user.id)} />
                  <WeatherButton onClick={() => handleWeatherClick(user)} />
                </>
              }
            />
          ))}
        </Box>
      )}
      {selectedUser && <WeatherModal
        open={isOpen}
        onClose={closeModal}
        weather={weather}
        loading={weatherLoading}
        userName={selectedUser.name}
      />}
    </Container>
  )
}
