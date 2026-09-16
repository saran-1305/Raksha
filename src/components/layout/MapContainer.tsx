import React from 'react';
import { useLocation } from 'react-router-dom';
import { MapView } from '../map/MapView';
import { cn } from '../../utils/cn';

export const MapContainer: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let widthClass = 'w-full absolute inset-0'; // Live map (with panels overlaying)

  if (path.includes('/hazard-intelligence')) {
    widthClass = 'w-[60%] relative';
  } else if (path.includes('/relocation-planning')) {
    widthClass = 'w-[40%] relative';
  } else if (path.includes('/population-analytics')) {
    widthClass = 'w-[30%] relative';
  } else if (path.includes('/scenario-simulation')) {
    widthClass = 'w-[50%] relative';
  } else if (path.includes('/reports')) {
    widthClass = 'w-[20%] relative';
  }

  return (
    <div className={cn("h-full transition-all duration-500 ease-in-out shrink-0 z-0", widthClass)}>
      <MapView />
    </div>
  );
};
