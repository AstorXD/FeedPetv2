import { FeedingHistoryItem, SystemInfoData } from '../types';

export const mockFeedingHistory: FeedingHistoryItem[] = [
  { time: '18:00', date: 'May 15', amount: 100 },
  { time: '12:00', date: 'May 15', amount: 80 },
  { time: '08:00', date: 'May 15', amount: 100 },
  { time: '18:00', date: 'May 14', amount: 100 },
  { time: '12:00', date: 'May 14', amount: 80 },
  { time: '08:00', date: 'May 14', amount: 100 },
  { time: '18:00', date: 'May 13', amount: 100 },
  { time: '12:00', date: 'May 13', amount: 80 },
  { time: '08:00', date: 'May 13', amount: 100 },
  { time: '18:00', date: 'May 12', amount: 100 },
];

export const mockSystemInfo: SystemInfoData = {
  cpuUsage: 42,
  ramUsage: 35,
  temperature: 48,
  latency: 85,
};