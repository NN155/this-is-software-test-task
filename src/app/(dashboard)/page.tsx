'use client'

import SaveButton from '@/components/SaveButton'
import UserCard from '@/components/UserCard'
import WeatherButton from '@/components/WeatherButton'
import WeatherModal from '@/components/WeatherModal'
import { useUsers } from '@/hooks/useUsers'
import { useWeatherModal } from '@/hooks/useWeatherModal'
import { UIUser } from '@/shared/types/user/UIUser'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material'


export default function HomePage() {
  const {
    users,
    loading,
    error,
    loadMoreUsers,
    hasMore,
    loadingMore,
    saveUser
  } = useUsers()

  const {
    handleWeatherClick,
    isOpen,
    closeModal,
    selectedUser,
    weather,
    weatherLoading
  } = useWeatherModal()

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          Error loading users: {error}
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
        User Weather Dashboard
      </Typography>

      {loading && users.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: 3,
              mb: 4,
            }}
          >
            {users.map((user: UIUser) => (
              <UserCard
                key={user.id}
                user={user}
                actions={
                  <>
                    <SaveButton onClick={() => saveUser(user)} />
                    <WeatherButton onClick={() => handleWeatherClick(user)} />
                  </>
                }
              />
            ))}
          </Box>

          {selectedUser && <WeatherModal
            open={isOpen}
            onClose={closeModal}
            weather={weather}
            loading={weatherLoading}
            userName={selectedUser.name}
          />}

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => loadMoreUsers()}
              disabled={loadingMore || !hasMore}
              sx={{ px: 4, py: 1.5 }}
            >
              {loadingMore ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Loading...
                </>
              ) : (
                'Load More'
              )}
            </Button>
          </Box>
        </>
      )}
    </Container>
  )
}
