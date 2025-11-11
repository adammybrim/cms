import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const PageTitle = styled(Typography)({
  fontFamily: '"Jura", sans-serif',
  fontWeight: 700,
  fontSize: '32px',
  lineHeight: '40px',
  color: '#505050',
  margin: 0,
  padding: 0,
});

const PageSubtitle = styled(Typography)({
  fontFamily: '"Jura", sans-serif',
  fontWeight: 700,
  fontSize: '22px',
  lineHeight: '28px',
  color: '#505050',
  margin: 0,
  padding: 0,
  marginTop: '12px',
});

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start',
      marginBottom: '24px',
    }}>
      <PageTitle variant="h1">{title}</PageTitle>
      {subtitle && <PageSubtitle variant="h2">{subtitle}</PageSubtitle>}
    </Box>
  );
};

export default PageHeader;
