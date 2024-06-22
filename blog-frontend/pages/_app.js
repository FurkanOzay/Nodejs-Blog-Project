import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "@/styles/globals.css";


const theme = createTheme({
  palette: {
    primary: {
      main : '#0070f3',
    },
    secondary: {
      main: '#19857b',
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {}
      <Component {...pageProps} /> {}
    </ThemeProvider>
  );
}