// frontend/src/components/Navbar.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

/**
 * Componente Navbar: Una barra de navegación simple para la aplicación.
 */
function Navbar() {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Mi App Fullstack
        </Typography>
        <Box>
          <Button color="inherit" href="#items" sx={{ mx: 1 }}>Ítems</Button>
          {/* Puedes añadir más enlaces aquí si tuvieras diferentes secciones */}
          {/* <Button color="inherit" href="#about" sx={{ mx: 1 }}>Acerca de</Button> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
