import React from 'react';
import { GISMap } from './GISMap';

// Future architectural placeholder for 3D mapping and Globe view.
// In later phases, this component will read from state to switch between:
// - 2D GIS (GISMap)
// - 3D Terrain
// - Global Globe
export const MapView: React.FC = () => {
  return (
    <GISMap />
  );
};
