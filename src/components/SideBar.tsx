'use client'

import { PAGES } from '@/config/pages.config'
import {
  Home,
  List as ListIcon
} from '@mui/icons-material'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { useRouter } from 'next/navigation'

const menuItems = [
  { text: 'Dashboard', icon: <Home />, path: PAGES.DASHBOARD },
  { text: 'Saved', icon: <ListIcon />, path: PAGES.SAVED },
]

export default function SideBar({ open, onClose } : { open: boolean, onClose: () => void }) {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
    onClose()
  }

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
        },
      }}
      disableScrollLock={true}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                onClick={() => handleNavigation(item.path)}
                sx={{
                  py: 1.5,
                  px: 2,
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 40 
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}