import React, { useContext } from 'react';
import { Clock, Clock as ClockCountdown } from 'lucide-react';
import { PetFeederContext } from '../context/PetFeederContext';
import Card from './ui/Card';

const QuickInfo: React.FC = () => {
  const { lastFeeding, nextFeeding } = useContext(PetFeederContext);

  return (
    <Card title="Informações Rápidas">
      <div className="flex flex-col gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={18} className="text-blue-500" />
            <h3 className="text-sm font-medium text-gray-700">Última Alimentação</h3>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-900">
              {lastFeeding ? lastFeeding.time : 'Sem dados'}
            </p>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {lastFeeding ? lastFeeding.date : ''}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <ClockCountdown size={18} className="text-orange-500" />
            <h3 className="text-sm font-medium text-gray-700">Próxima Alimentação</h3>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-900">
              {nextFeeding ? nextFeeding.time : 'Não agendado'}
            </p>
            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
              {nextFeeding ? nextFeeding.date : ''}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuickInfo