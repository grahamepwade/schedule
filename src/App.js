import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles'

import { DevExpress, Header } from './components'
 
function App() {
 
  return (
    // <ThemeProvider>
    <div>
      <Header />
      {/* <WeekSelector /> */}

      <DevExpress />
    </div>
    // </ThemeProvider>
  );
}

export default App;