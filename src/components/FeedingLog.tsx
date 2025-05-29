import React, { useContext } from 'react';
import { History } from 'lucide-react';
import { PetFeederContext } from '../context/PetFeederContext';
import Card from './ui/Card';

const FeedingLog: React.FC = () => {
  const { feedingHistory } = useContext(PetFeederContext);

  return (
    <Card title="Feeding History">
      <div className="max-h-96 overflow-y-auto pr-1">
        {feedingHistory.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No feeding history available</p>
        ) : (
          <div className="relative pl-6 border-l-2 border-gray-200 space-y-4">
            {feedingHistory.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[22px] bg-blue-500 rounded-full w-4 h-4 border-2 border-white"></div>
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{item.time}</span>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Released: <span className="font-semibold">{item.amount}g</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default FeedingLog;