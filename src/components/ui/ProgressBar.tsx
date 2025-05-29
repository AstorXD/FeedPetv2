import React from 'react';

interface ProgressBarProps {
  value: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, className = 'bg-blue-500' }) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-500 ${className}`}
        style={{ width: `${Math.min(value, 100)}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;