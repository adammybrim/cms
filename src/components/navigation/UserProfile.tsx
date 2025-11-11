import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import { ArrowDropDown, NotificationsNone, Settings } from '@mui/icons-material';

type UserProfileProps = {
  isSidebarCollapsed: boolean;
};

const UserProfile: React.FC<UserProfileProps> = ({ isSidebarCollapsed }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '16px',
        right: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        zIndex: theme.zIndex.appBar,
      }}
    >
      {/* Notifications */}
      <IconButton
        size="small"
        sx={{
          color: 'text.secondary',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        <NotificationsNone />
      </IconButton>

      {/* Settings */}
      <IconButton
        size="small"
        sx={{
          color: 'text.secondary',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        <Settings />
      </IconButton>

      {/* User Profile */}
      <Box
        component="div"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
        onClick={handleClick}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          width: '61px',
          justifyContent: 'space-between'
        }}>
          <Avatar
            src="/user-avatar-placeholder.png"
            alt="User"
            sx={{
              width: 40,
              height: 40,
              bgcolor: theme.palette.grey[200],
              color: theme.palette.text.secondary,
              fontSize: '16px',
              fontWeight: 500,
            }}
          >
            JS
          </Avatar>
          <ArrowDropDown sx={{ 
            color: 'text.secondary',
            width: '16px',
            height: '16px'
          }} />
        </Box>
      </Box>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default UserProfile;
