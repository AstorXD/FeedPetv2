import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;