import { UIUser } from '@/shared/types/user'
import {
  Email,
  LocationOn,
  Person,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Chip,
  Typography,
} from '@mui/material'

interface UserInfoProps {
  user: UIUser
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <>
      {/* User Avatar and Name */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar
          src={user.avatar}
          sx={{ width: 64, height: 64, mr: 2 }}
        />
        <Box>
          <Typography variant="h6" component="h2" gutterBottom>
            {user.name}
          </Typography>
          <Chip
            icon={<Person />}
            label={user.gender}
            size="small"
            variant="outlined"
            sx={{ mb: 1 }}
          />
        </Box>
      </Box>

      {/* User Contact Details */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" component="address">
            {user.location}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
      </Box>
    </>
  )
}
