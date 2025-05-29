import React, { useContext } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { PetFeederContext } from '../context/PetFeederContext';

const Header: React.FC = () => {
  const { deviceStatus } = useContext(PetFeederContext);
  
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Pet Feeder Control</h1>
          <p className="text-sm opacity-90">Device: PetFeeder Pro</p>
        </div>
        <div className="flex items-center gap-2">
          {deviceStatus === 'online' ? (
            <>
              <Wifi size={20} className="text-green-300" />
              <span className="text-sm font-medium">Online</span>
            </>
          ) : (
            <>
              <WifiOff size={20} className="text-red-300" />
              <span className="text-sm font-medium">Offline</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;