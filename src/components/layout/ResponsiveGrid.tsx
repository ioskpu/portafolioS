import React from 'react';

interface ResponsiveGridProps {
  children: React.ReactNode;
  minWidth?: string;
  className?: string;
}

export const ResponsiveGrid = ({ children, minWidth = '250px', className = '' }: ResponsiveGridProps) => {
  return (
    <div
      className={`grid gap-6 ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`
      }}
    >
      {children}
    </div>
  );
};
