export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', { 
    day: 'numeric',
    month: 'short'
  });
};

export const timeToInt = (time: string): number => {
  const [hours, minutes] = time.split(':');
  return parseInt(hours) * 100 + parseInt(minutes);
};

export const intToTime = (timeInt: number): string => {
  const hours = Math.floor(timeInt / 100);
  const minutes = timeInt % 100;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};