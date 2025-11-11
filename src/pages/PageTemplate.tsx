import React from 'react';
import { Box } from '@mui/material';
import PageHeader from '../components/common/PageHeader';

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ 
  title, 
  subtitle = 'Overview', 
  children 
}) => {
  return (
    <Box>
      <PageHeader title={title} subtitle={subtitle} />
      <Box sx={{ mt: 3 }}>
        {children || (
          <Box sx={{ 
            backgroundColor: '#fff',
            borderRadius: '8px',
            p: 3,
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            This is the {title} page. Content will be added here.
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PageTemplate;
