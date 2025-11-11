import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const PageTitle = styled(Typography)({
  fontFamily: '"Jura", sans-serif',
  fontWeight: 700,
  fontSize: '28px', // Reduced from 32px
  lineHeight: '1.2',
  color: '#505050',
  margin: 0,
  padding: 0,
});

const PageSubtitle = styled(Typography)({
  fontFamily: '"Jura", sans-serif',
  fontWeight: 700,
  fontSize: '17.3px', // 28px / 1.618 (golden ratio) = ~17.3px
  lineHeight: '1.4',
  color: '#505050',
  margin: 0,
  padding: 0,
  marginTop: '6px', // Reduced from 12px
  opacity: 0.8,
});

interface PageHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      width: '100%',
      marginBottom: '24px',
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        width: '100%',
      }}>
        <PageTitle variant="h1">{title}</PageTitle>
        {subtitle && <Box sx={{ width: '100%' }}>{subtitle}</Box>}
      </Box>
    </Box>
  );
};

export default PageHeader;
