import React from 'react';
import { Box, Typography, SvgIcon, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

type TrendType = 'up' | 'down';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  trend?: TrendType;
  period?: string;
  sx?: object;
}

const CardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '8px',
  padding: theme.spacing(1.5),
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
}));

const IconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'trend',
})<{ trend: 'up' | 'down' }>(({ theme, trend }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const ChangeIndicator = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'trend',
})<{ trend: 'up' | 'down' }>(({ theme, trend }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  fontSize: '0.75rem',
  color: trend === 'up' ? theme.palette.success.main : theme.palette.error.main,
  marginTop: theme.spacing(0.5),
  '& .MuiSvgIcon-root': {
    fontSize: '0.75rem',
  },
}));

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  trend,
  period = 'vs last period',
  sx = {},
}) => {
  const theme = useTheme();
  
  return (
    <CardContainer sx={sx}>
      <Header>
        <div>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ 
              fontWeight: 500, 
              mb: 0.25,
              fontSize: '0.75rem',
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
              lineHeight: 1.1,
              mt: 0.25,
            }}
          >
            {value}
          </Typography>
          {change !== undefined && (
            <ChangeIndicator variant="body2" trend={trend || 'up'}>
              {trend === 'up' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              {Math.abs(change)}% {period}
            </ChangeIndicator>
          )}
        </div>
        {icon && (
          <IconContainer trend={trend || 'up'}>
            {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { 
              sx: { 
                fontSize: '1.25rem',
                color: 'text.secondary',
              } 
            }) : icon}
          </IconContainer>
        )}
      </Header>
    </CardContainer>
  );
};

export default MetricCard;
