import React, { useContext } from 'react';
import { Wifi, WifiOff, PawPrint as Paw } from 'lucide-react';
import { PetFeederContext } from '../context/PetFeederContext';

const Header: React.FC = () => {
  const { deviceStatus } = useContext(PetFeederContext);
  
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Paw size={24} className="text-white" />
          <h1 className="text-2xl font-bold">Feed Pet</h1>
        </div>
        {deviceStatus === 'online' && (
          <div className="flex items-center gap-2">
            <Wifi size={20} className="text-green-300" />
            <span className="text-sm font-medium">Online</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;