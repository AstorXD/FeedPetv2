export interface FeedingTimeInfo {
  time: string;
  date: string;
}

export interface FeedingHistoryItem {
  time: string;
  date: string;
  amount: number;
}

export interface SystemInfoData {
  cpuUsage: number;
  ramUsage: number;
  temperature: number;
  latency: number;
}