import React from 'react';

interface LayoutProviderProps {
  children: React.ReactNode;
}

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  return (
    <div>layoutProvider</div>
  )
}

export default LayoutProvider