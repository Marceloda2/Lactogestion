import React, { useState } from 'react';
import { Inventory } from './components/Inventory';
import { Producers } from './components/Producers';
import { Dispatch } from './components/Dispatch';
import { Reception } from './components/Reception';
import { Dashboard } from './components/Dashboard';
import { ClipboardList, Users, TruckIcon, PackageCheck, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'inventario':
        return <Inventory />;
      case 'productores':
        return <Producers />;
      case 'despacho':
        return <Dispatch />;
      case 'recepcion':
        return <Reception />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-primary-white">
      <nav className="bg-primary-blue shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <motion.div 
                className="flex-shrink-0 flex items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-xl font-bold text-primary-navy">LactoGestion</h1>
              </motion.div>
              <div className="hidden md:flex space-x-8">
                {['Inicio', 'inventario', 'productores', 'despacho', 'recepcion'].map((tab) => (
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
                    {tab === 'Inicio' && <LayoutDashboard className="w-5 h-5 mr-2" />}
                    {tab === 'inventario' && <ClipboardList className="w-5 h-5 mr-2" />}
                    {tab === 'productores' && <Users className="w-5 h-5 mr-2" />}
                    {tab === 'despacho' && <TruckIcon className="w-5 h-5 mr-2" />}
                    {tab === 'recepcion' && <PackageCheck className="w-5 h-5 mr-2" />}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

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

export default App; 