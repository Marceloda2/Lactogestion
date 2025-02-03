import React from 'react';
import { AuthProvider, useAuth } from './components/auth/AuthProvider';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './components/Dashboard';
import { Inventory } from './components/Inventory';
import { Producers } from './components/Producers';
import { ProducerMilkTotals } from './components/user/ProducerMilkTotals';
import { ClipboardList, Users, LayoutDashboard, LogOut, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reception } from './components/Reception';
import { Dispatch } from './components/Dispatch';
import Rejections from './components/Rejections'; // Importar el componente Rejections

function AppContent() {
  const { isAuthenticated, logout, user } = useAuth();
  const [activeTab, setActiveTab] = React.useState('inventario');

  // Renderiza el contenido según la pestaña activa y el rol del usuario
  const renderContent = () => {
    if (user?.role === 'user') {
      return <ProducerMilkTotals />;
    }

    switch (activeTab) {
      case 'inventario':
        return <Inventory />;
      case 'productores':
        return <Producers />;
      case 'recepcion':
        return <Reception />;
      case 'despacho':
        return <Dispatch />;
      case 'dashboard':
        return <Dashboard />;
      case 'rechazos': // Agregar el caso para la pestaña de rechazos
        return <Rejections />;
      default:
        return <Inventory />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-primary-white">
      {/* Navegación */}
      <nav className="bg-primary-blue shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Título del sistema */}
            <motion.div 
              className="flex-shrink-0 flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-xl font-bold text-primary-navy">LactoGestion</h1>
            </motion.div>

            {/* Pestañas de navegación */}
            {user?.role === 'admin' ? (
              <div className="hidden md:flex space-x-8">
                {['inventario', 'productores', 'recepcion', 'despacho', 'rechazos','dashboard'].map((tab) => ( // Agregar 'rechazos' a la lista de pestañas
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      activeTab === tab
                        ? 'border-primary-navy text-primary-navy'
                        : 'border-transparent text-primary-navy/70 hover:text-primary-navy hover:border-primary-navy/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab === 'dashboard' && <LayoutDashboard className="w-5 h-5 mr-2" />}
                    {tab === 'inventario' && <ClipboardList className="w-5 h-5 mr-2" />}
                    {tab === 'productores' && <Users className="w-5 h-5 mr-2" />}
                    {tab === 'recepcion' && <Users className="w-5 h-5 mr-2" />}
                    {tab === 'despacho' && <Users className="w-5 h-5 mr-2" />}
                    {tab === 'rechazos' && <XCircle className="w-5 h-5 mr-2" />}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-primary-navy">Total Leche por Productor</span>
              </div>
            )}

            {/* Botón de cerrar sesión */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="flex items-center px-3 py-2 rounded text-primary-navy hover:bg-primary-navy/10"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Cerrar Sesión
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-secondary-yellow/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;