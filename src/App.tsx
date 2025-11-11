import React, { useEffect, useState } from 'react';

// Material-UI imports
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, useMediaQuery } from '@mui/material';

// Font imports
import '@fontsource/jura/300.css';
import '@fontsource/jura/400.css';
import '@fontsource/jura/500.css';
import '@fontsource/jura/600.css';
import '@fontsource/jura/700.css';

// Component imports
import AppRouter from './router/AppRouter';
import { SidebarProvider } from './context/SidebarContext';

declare module '@mui/material/styles' {
  interface TypeBackground {
    default: string;
    paper: string;
    gradient: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#29cf26',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1a1a1a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
      gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F8FBF8 50%, #F6F9FD 100%)',
    } as const,
  },
  typography: {
    fontFamily: '"Jura", "Helvetica", "Arial", sans-serif',
    // Heading styles
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
      '@media (max-width:900px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.25,
      letterSpacing: '-0.25px',
      '@media (max-width:900px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
      '@media (max-width:900px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.35,
      '@media (max-width:900px)': {
        fontSize: '1.25rem',
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.45,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    // Text styles
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    caption: {
      fontSize: '0.8125rem',
      lineHeight: 1.5,
      color: 'rgba(0, 0, 0, 0.6)',
    },
    overline: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    // Button styles
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.25px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

function App() {
  const [mounted, setMounted] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    // Add any client-side only logic here
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <ThemeProvider theme={theme}>
      <SidebarProvider>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: theme.palette.background.default,
          }}
        >
          <AppRouter />
        </Box>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
