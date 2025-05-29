import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { 
  ref,
  onValue,
  set,
  push,
  update,
  query,
  limitToLast,
  orderByChild,
  get
} from 'firebase/database';
import { db } from '../firebase/config';
import { formatTime } from '../utils/dateHelpers';
import { 
  FeedingHistoryItem, 
  SystemInfoData, 
  FeedingTimeInfo 
} from '../types';

interface PetFeederContextType {
  deviceStatus: 'online' | 'offline';
  lastFeeding: FeedingTimeInfo | null;
  nextFeeding: FeedingTimeInfo | null;
  schedule: string[];
  feedingHistory: FeedingHistoryItem[];
  systemInfo: SystemInfoData;
  addSchedule: (time: string) => Promise<void>;
  removeSchedule: (time: string) => Promise<void>;
  saveSchedule: () => Promise<void>;
  exportData: () => Promise<void>;
}

export const PetFeederContext = createContext<PetFeederContextType>({
  deviceStatus: 'offline',
  lastFeeding: null,
  nextFeeding: null,
  schedule: [],
  feedingHistory: [],
  systemInfo: {
    cpuUsage: 0,
    ramUsage: 0,
    temperature: 0,
    latency: 0
  },
  addSchedule: async () => {},
  removeSchedule: async () => {},
  saveSchedule: async () => {},
  exportData: async () => {}
});

export const PetFeederProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [deviceStatus, setDeviceStatus] = useState<'online' | 'offline'>('online');
  const [schedule, setSchedule] = useState<string[]>([]);
  const [feedingHistory, setFeedingHistory] = useState<FeedingHistoryItem[]>([]);
  const [systemInfo, setSystemInfo] = useState<SystemInfoData>({
    cpuUsage: 0,
    ramUsage: 0,
    temperature: 0,
    latency: 0
  });

  // Subscribe to real-time updates
  useEffect(() => {
    // Subscribe to feeding history
    const historyRef = query(
      ref(db, 'feeding_history'),
      orderByChild('timestamp'),
      limitToLast(10)
    );
    
    const unsubHistory = onValue(historyRef, (snapshot) => {
      const history: FeedingHistoryItem[] = [];
      snapshot.forEach((child) => {
        history.unshift({
          ...child.val(),
          id: child.key
        });
      });
      setFeedingHistory(history);
    });

    // Subscribe to system info
    const systemRef = ref(db, 'system_info');
    const unsubSystem = onValue(systemRef, (snapshot) => {
      if (snapshot.exists()) {
        setSystemInfo(snapshot.val());
        setDeviceStatus('online');
      } else {
        setDeviceStatus('offline');
      }
    });

    // Subscribe to schedule
    const scheduleRef = ref(db, 'settings/schedule');
    const unsubSchedule = onValue(scheduleRef, (snapshot) => {
      if (snapshot.exists()) {
        setSchedule(snapshot.val().times || []);
      }
    });

    return () => {
      unsubHistory();
      unsubSystem();
      unsubSchedule();
    };
  }, []);

  const lastFeeding = feedingHistory.length > 0 
    ? { 
        time: feedingHistory[0].time,
        date: feedingHistory[0].date
      }
    : null;

  const currentTime = formatTime(new Date());
  const sortedSchedule = [...schedule].sort();
  const nextScheduledTime = sortedSchedule.find(time => time > currentTime) || sortedSchedule[0];
  
  const nextFeeding = schedule.length > 0
    ? {
        time: nextScheduledTime,
        date: 'Today'
      }
    : null;

  const addSchedule = async (time: string) => {
    const newSchedule = [...schedule, time].sort();
    await set(ref(db, 'settings/schedule'), {
      times: newSchedule,
      updatedAt: Date.now()
    });
  };

  const removeSchedule = async (time: string) => {
    const newSchedule = schedule.filter(t => t !== time);
    await set(ref(db, 'settings/schedule'), {
      times: newSchedule,
      updatedAt: Date.now()
    });
  };

  const saveSchedule = async () => {
    try {
      await set(ref(db, 'settings/schedule'), {
        times: schedule,
        updatedAt: Date.now()
      });
      alert('Feeding schedule saved successfully!');
    } catch (error) {
      console.error('Error saving schedule:', error);
      alert('Failed to save schedule. Please try again.');
    }
  };

  const exportData = async () => {
    try {
      const historySnapshot = await get(ref(db, 'feeding_history'));
      const historyData = historySnapshot.val();

      const systemSnapshot = await get(ref(db, 'system_info'));
      const systemData = systemSnapshot.val();

      const exportData = {
        feedingHistory: historyData,
        systemInfo: systemData,
        schedule,
        exportDate: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pet-feeder-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  return (
    <PetFeederContext.Provider value={{
      deviceStatus,
      lastFeeding,
      nextFeeding,
      schedule,
      feedingHistory,
      systemInfo,
      addSchedule,
      removeSchedule,
      saveSchedule,
      exportData
    }}>
      {children}
    </PetFeederContext.Provider>
  );
};