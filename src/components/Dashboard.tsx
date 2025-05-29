import React from 'react';
import QuickInfo from './QuickInfo';
import ScheduleConfig from './ScheduleConfig';
import FeedingLog from './FeedingLog';
import SystemInfo from './SystemInfo';

const Dashboard: React.FC = () => {
  return (
    <main className="container mx-auto pt-24 px-4 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <QuickInfo />
        </div>
        <div className="lg:col-span-2">
          <ScheduleConfig />
        </div>
        <div className="lg:col-span-1">
          <FeedingLog />
        </div>
        <div className="lg:col-span-4">
          <SystemInfo />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;