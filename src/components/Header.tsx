'use client'

import { Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'
import SideBar from './SideBar'

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'primary.main',
          boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
          minHeight: '48px',
          top: 0,
          left: 0,
          right: 0
        }}
      >
        <Toolbar 
          sx={{ 
            minHeight: '48px !important',
            paddingY: 0,
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              onClick={toggleDrawer}
              sx={{ mr: 1 }}
              aria-label="menu"
            >
              <MenuIcon sx={{ fontSize: '24px' }} />
            </IconButton>
            
            <Typography 
              variant="h6" 
              component="div"
              sx={{ 
                fontSize: '20px',
                fontWeight: 500,
                color: 'white'
              }}
            >
              This is Software
            </Typography>
          </Box>

        </Toolbar>
      </AppBar>

      <SideBar open={drawerOpen} onClose={closeDrawer} />
    </>
  )
}