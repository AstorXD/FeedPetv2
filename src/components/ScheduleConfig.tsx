import React, { useState, useContext } from 'react';
import { PlusCircle, Trash2, Save } from 'lucide-react';
import { PetFeederContext } from '../context/PetFeederContext';
import Card from './ui/Card';
import Button from './ui/Button';

const ScheduleConfig: React.FC = () => {
  const { schedule, addSchedule, removeSchedule, saveSchedule } = useContext(PetFeederContext);
  const [newTime, setNewTime] = useState('');
  const [error, setError] = useState('');

  const handleAddSchedule = () => {
    if (!newTime) {
      setError('Por favor, selecione um horário');
      return;
    }

    if (schedule.includes(newTime)) {
      setError('Este horário já está agendado');
      return;
    }

    if (schedule.length >= 8) {
      setError('Limite máximo de 8 horários atingido');
      return;
    }

    addSchedule(newTime);
    setNewTime('');
    setError('');
  };

  return (
    <Card title="Configuração de Horários">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow">
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={schedule.length >= 8}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <Button 
            onClick={handleAddSchedule}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={schedule.length >= 8}
          >
            <PlusCircle size={16} />
            <span>Adicionar Horário</span>
          </Button>
        </div>

        <div className="mt-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">Horários Agendados</h3>
            <span className="text-sm text-gray-500">
              {schedule.length}/8 horários
            </span>
          </div>
          {schedule.length === 0 ? (
            <p className="text-gray-500 text-sm italic">Nenhum horário agendado</p>
          ) : (
            <ul className="space-y-2 max-h-72 overflow-y-auto pr-2">
              {schedule.sort().map((time) => (
                <li key={time} className="flex justify-between items-center p-3 bg-white rounded-md border border-gray-200">
                  <span className="font-medium">{time}</span>
                  <button
                    onClick={() => removeSchedule(time)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={saveSchedule}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Save size={16} />
            <span>Salvar Horários</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ScheduleConfig