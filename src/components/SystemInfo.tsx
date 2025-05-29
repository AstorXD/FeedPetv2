import React, { useContext } from 'react';
import { Cpu, MemoryStick as Memory, Thermometer, Signal, Download } from 'lucide-react';
import { PetFeederContext } from '../context/PetFeederContext';
import Card from './ui/Card';
import ProgressBar from './ui/ProgressBar';
import Button from './ui/Button';

const SystemInfo: React.FC = () => {
  const { systemInfo, exportData } = useContext(PetFeederContext);

  const getProgressColor = (value: number) => {
    if (value < 50) return 'bg-green-500';
    if (value < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 50) return 'text-green-500';
    if (temp < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 100) return 'text-green-500';
    if (latency < 300) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card title="Informações do Sistema">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Cpu size={18} className="text-blue-500" />
              <h3 className="text-sm font-medium text-gray-700">Uso da CPU</h3>
            </div>
            <div className="mb-1 flex justify-between">
              <span className="text-xs text-gray-500">Uso</span>
              <span className="text-xs font-medium">{systemInfo.cpuUsage}%</span>
            </div>
            <ProgressBar 
              value={systemInfo.cpuUsage} 
              className={getProgressColor(systemInfo.cpuUsage)} 
            />
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Memory size={18} className="text-purple-500" />
              <h3 className="text-sm font-medium text-gray-700">Uso da RAM</h3>
            </div>
            <div className="mb-1 flex justify-between">
              <span className="text-xs text-gray-500">Uso</span>
              <span className="text-xs font-medium">{systemInfo.ramUsage}%</span>
            </div>
            <ProgressBar 
              value={systemInfo.ramUsage} 
              className={getProgressColor(systemInfo.ramUsage)} 
            />
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer size={18} className="text-orange-500" />
              <h3 className="text-sm font-medium text-gray-700">Temperatura</h3>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold leading-none mt-2">
                <span className={getTemperatureColor(systemInfo.temperature)}>
                  {systemInfo.temperature}
                </span>
                <span className="text-lg font-normal text-gray-500">°C</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">Máx: 85°C</span>
                <span className="text-xs text-gray-500">Mín: 20°C</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Signal size={18} className="text-teal-500" />
              <h3 className="text-sm font-medium text-gray-700">Latência</h3>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold leading-none mt-2">
                <span className={getLatencyColor(systemInfo.latency)}>
                  {systemInfo.latency}
                </span>
                <span className="text-lg font-normal text-gray-500">ms</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">Pico: 350ms</span>
                <span className="text-xs text-gray-500">Média: 120ms</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            onClick={exportData}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Download size={16} />
            <span>Exportar Dados</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};