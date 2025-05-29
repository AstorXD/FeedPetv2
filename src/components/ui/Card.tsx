import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-gray-800 font-semibold">{title}</h2>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default Card;