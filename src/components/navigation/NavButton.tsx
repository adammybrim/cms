import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface NavButtonProps {
  text: string;
  path: string;
  icon: React.ReactElement;
  isCollapsed: boolean;
  onClick?: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({
  text,
  path,
  icon,
  isCollapsed,
  onClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === path;

  const handleClick = () => {
    navigate(path);
    if (onClick) onClick();
  };

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={handleClick}
        sx={{
          minHeight: 48,
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          px: 2.5,
          py: 1.5,
          mx: 1,
          borderRadius: '8px',
          bgcolor: isActive ? 'rgba(41, 207, 38, 0.1)' : 'transparent',
          '&:hover': {
            backgroundColor: isActive ? 'rgba(41, 207, 38, 0.15)' : 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isCollapsed ? 'auto' : 2,
            justifyContent: 'center',
            color: isActive ? 'primary.main' : 'text.secondary',
          }}
        >
          {React.cloneElement(icon, {
            style: {
              fontSize: '24px',
              opacity: isActive ? 1 : 0.8,
            },
          } as React.HTMLAttributes<SVGElement>)}
        </ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{
            fontWeight: isActive ? 600 : 500,
            color: isActive ? 'primary.main' : 'text.primary',
            display: isCollapsed ? 'none' : 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default NavButton;
