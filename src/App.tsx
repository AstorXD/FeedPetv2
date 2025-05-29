import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { PetFeederProvider } from './context/PetFeederContext';

function App() {
  return (
    <PetFeederProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <Dashboard />
      </div>
    </PetFeederProvider>
  );
}

export default App;