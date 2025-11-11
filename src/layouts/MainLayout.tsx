import React, { ReactNode, useEffect } from 'react';
import { Box, CssBaseline, useTheme, useMediaQuery } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import { useSidebar } from '../context/SidebarContext';

const MainLayout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const { isCollapsed, closeSidebar } = useSidebar();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      closeSidebar();
    }
  }, [location, isMobile, closeSidebar]);

  const drawerWidth = isCollapsed ? 72 : 280; // Match the Sidebar's width
  const gap = 40; // 40px gap between sidebar and content
  const mainContentLeft = isMobile ? 0 : drawerWidth + gap;
  const mainContentWidth = isMobile ? '100%' : `calc(100% - ${mainContentLeft}px)`;

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(-45deg, rgba(255,255,255,0.95) 0%, rgba(41, 207, 38, 0.03) 100%)',
      '&::before': {
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(41, 207, 38, 0.03) 0%, rgba(255,255,255,0) 60%)',
        pointerEvents: 'none',
        zIndex: 0,
      }
    }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          position: 'absolute',
          left: { xs: 0, md: `${mainContentLeft}px` },
          right: 0,
          top: 0,
          bottom: 0,
          overflow: 'auto',
          padding: '24px 24px 24px 0',
          boxSizing: 'border-box',
          transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default MainLayout;
