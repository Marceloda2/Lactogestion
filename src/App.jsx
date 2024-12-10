import React, { useState } from 'react';
import Inventario from './Inventario';
import Productores from './Productores';
import Box from '@mui/material/Box';
import Despacho from './despacho';
import Recepcion from './recepcion';
import { Snackbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { Icon } from '@iconify/react'; // Importar Iconify para los íconos

function App() {
  
  const [showDespacho, setShowDespacho] = useState(false);
  const [showRecepcion, setShowRecepcion] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '' });
  const [showInventario, setShowInventario] = useState(false);

  const handleNotification = (message) => {
    setNotification({ open: true, message });
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: '' });
  };

  const [showProductores, setShowProductores] = useState(false);

  return (
    <Box sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bienvenido a LactoGestión
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
        {/* Botón de Inventario con ícono */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<Icon icon="mdi:clipboard-list-outline" width="24" />}
          onClick={() => setShowInventario(true)}
        >
          Inventario
        </Button>

        {/* Botón de Productores con ícono */}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Icon icon="mdi:account-group-outline" width="24" />}
          onClick={() => setShowProductores(true)}
        >
          Productores
        </Button>

        {/* Botón de Despacho */}
        <Button
          variant="contained"
          color="success"
          startIcon={<Icon icon="mdi:truck-delivery-outline" width="24" />}
          onClick={() => setShowDespacho(true)}
        >
          Despacho
        </Button>

        {/* Botón de Recepción */}
        <Button
          variant="contained"
          color="info"
          startIcon={<Icon icon="mdi:package-variant" width="24" />}
          onClick={() => setShowRecepcion(true)}
        >
          Recepción
        </Button>

      {/* Modal para Despacho */}
      <Dialog open={showDespacho} onClose={() => setShowDespacho(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="mdi:truck-delivery-outline" width="24" /> Despacho
          </Box>
        </DialogTitle>
        <DialogContent>
          <Despacho onAdd={() => handleNotification('Despacho agregado exitosamente.')} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDespacho(false)} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para Recepción */}
      <Dialog open={showRecepcion} onClose={() => setShowRecepcion(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="mdi:package-variant" width="24" /> Recepción
          </Box>
        </DialogTitle>
        <DialogContent>
          <Recepcion />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRecepcion(false)} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notificación */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        message={notification.message}
      />
      </Box>

      {/* Modal para Inventario */}
      <Dialog open={showInventario} onClose={() => setShowInventario(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="mdi:clipboard-list-outline" width="24" /> Inventario
          </Box>
        </DialogTitle>
        <DialogContent>
          <Inventario />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInventario(false)} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para Productores */}
      <Dialog open={showProductores} onClose={() => setShowProductores(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon icon="mdi:account-group-outline" width="24" /> Productores
          </Box>
        </DialogTitle>
        <DialogContent>
          <Productores />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowProductores(false)} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
