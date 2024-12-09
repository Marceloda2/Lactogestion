import React, { useState } from 'react';
import Inventario from './Inventario';
import Productores from './Productores';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from '@iconify/react'; // Importar Iconify

function App() {
  const [showInventario, setShowInventario] = useState(false);
  const [showProductores, setShowProductores] = useState(false);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Bienvenido a LactoGestión</h1>
      <div className="d-flex justify-content-center gap-3 mt-4">
        {/* Botón de Inventario con ícono */}
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={() => setShowInventario(true)}
        >
          <Icon icon="mdi:clipboard-list-outline" width="24" /> Inventario
        </button>

        {/* Botón de Productores con ícono */}
        <button
          className="btn btn-secondary d-flex align-items-center gap-2"
          onClick={() => setShowProductores(true)}
        >
          <Icon icon="mdi:account-group-outline" width="24" /> Productores
        </button>
      </div>

      {/* Modal para Inventario */}
      {showInventario && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Icon icon="mdi:clipboard-list-outline" width="24" /> Inventario
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowInventario(false)}
                ></button>
              </div>
              <div className="modal-body">
                <Inventario />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowInventario(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Productores */}
      {showProductores && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <Icon icon="mdi:account-group-outline" width="24" /> Productores
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowProductores(false)}
                ></button>
              </div>
              <div className="modal-body">
                <Productores />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowProductores(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;