import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles'

import { Availability, Header } from './components'
import './App.css'
 
function App() {
 
  return (
    // <ThemeProvider>
    <div>
      <Header />
      <Availability />
    </div>
    // </ThemeProvider>
  );
}

export default App;