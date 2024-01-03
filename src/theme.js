// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // A cool color for primary actions and elements
      main: '#1c75bc', // Example: Moon Blue
    },
    secondary: {
      // A contrasting color for secondary actions and elements
      main: '#FF6057', // Example: Blood Orange
    },
    background: {
      default: '#fff', // White background for a clean, minimalistic look
      paper: '#fff',
    },
    text: {
      primary: '#424242', // Dark grey for readability
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: [
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','), // Modern, clean font
    h5: {
      fontWeight: 500,
      color: '#424242',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
    },
  },
  components: {
    // Overrides and additional styles for specific components
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Buttons with regular capitalization for a friendly vibe
        },
      },
    },
    // Add more component overrides as needed
  },
  // Include additional global styles or overrides if necessary
});

export default theme;
