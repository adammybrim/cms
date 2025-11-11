import React, { useState } from 'react';
import { Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, useTheme, useMediaQuery, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import NavButton from './NavButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const menuItems = [
  { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { text: 'Sites', path: '/sites', icon: <LocationOnIcon /> },
  { text: 'Chargers', path: '/chargers', icon: <ElectricCarIcon /> },
  { text: 'Users', path: '/users', icon: <PeopleIcon /> },
  { text: 'Generate Report', path: '/reports', icon: <AssessmentIcon /> },
  { text: 'OCPP Logs', path: '/ocpp-logs', icon: <ReceiptIcon /> },
  { text: 'Energy Usage', path: '/energy-usage', icon: <FlashOnIcon /> },
];

const helpItem = {
  text: 'Help and Docs',
  path: '/help',
  icon: <HelpOutlineIcon />
};

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = isCollapsed ? 72 : 280;
  
  // User profile menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const activeRoute = (routePath: string) => {
    if (routePath === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(routePath);
  };

  const renderNavItems = () => (
    <List sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {menuItems.map((item) => (
        <NavButton
          key={item.text}
          text={item.text}
          path={item.path}
          icon={item.icon}
          isCollapsed={isCollapsed}
        />
      ))}
    </List>
  );

  const renderHelpItem = () => (
    <Box sx={{ mt: 'auto', mb: 1, px: 1 }}>
      <List sx={{ display: 'flex', flexDirection: 'column' }}>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => navigate(helpItem.path)}
            sx={{
              minHeight: 36,
              height: 36,
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              px: 1.5,
              py: 0.75,
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? 'auto' : 1.5,
                justifyContent: 'center',
                color: 'text.secondary',
                '& svg': {
                  fontSize: '16px',
                  opacity: 0.8,
                }
              }}
            >
              {helpItem.icon}
            </ListItemIcon>
            <ListItemText 
              primary={helpItem.text} 
              primaryTypographyProps={{
                fontWeight: 400,
                fontSize: '0.8rem',
                display: isCollapsed ? 'none' : 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  // User profile component
  const renderUserProfile = () => (
    <>
      <Box 
        sx={{ 
          mt: 'auto',
          py: 1,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)'
          },
          px: 1,
          mx: 0,
        }}
        onClick={handleProfileClick}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          minHeight: '40px',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src="/user-avatar-placeholder.png"
              alt="User"
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#F2F4F7',
                color: '#344054',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              JS
            </Avatar>
            {!isCollapsed && (
              <Box sx={{ ml: 2, overflow: 'hidden' }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  John Smith
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  Admin
                </Typography>
              </Box>
            )}
          </Box>
          {!isCollapsed && (
            <ArrowDropDownIcon sx={{ color: 'text.secondary' }} />
          )}
        </Box>
      </Box>

      {/* User Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 2,
          sx: {
            mt: 1.5,
            minWidth: '200px',
            borderRadius: '8px',
            '& .MuiList-root': {
              padding: '8px 0',
            },
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Typography variant="body2">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography variant="body2">Settings</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography variant="body2" color="error">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={!isCollapsed || isMobile}
      onClose={toggleSidebar}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: 'none',
          backgroundColor: '#ffffff',
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          ...(isCollapsed && !isMobile && {
            width: 72,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }),
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          pt: '16px',
          px: '8px',
          pb: '8px',
        }}
      >
        {/* Collapse button */}
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mb: '32px',
            px: 1,
          }}
        >
          <IconButton 
            onClick={toggleSidebar}
            size="small"
            sx={{
              p: 0.5,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>

        {/* Logo - Only show when expanded */}
        {!isCollapsed && (
          <Box 
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: '24px',
              px: 2,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
            aria-label="Go to dashboard"
            role="button"
          >
            <Box 
              component="img"
              src="/brim-logo.png"
              alt="Brim Logo"
              sx={{
                height: '36px',
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
        )}

        {/* Navigation items */}
        <Box sx={{ flexGrow: 1 }}>
          {renderNavItems()}
        </Box>

        {/* User Profile */}
        {renderUserProfile()}
        
        {/* Help Item */}
        {renderHelpItem()}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
