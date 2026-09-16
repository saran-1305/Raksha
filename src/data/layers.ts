import type { EvidenceSource, MapLayer } from '../types';

export const evidenceSourcesData: EvidenceSource[] = [
  { id: 'bhuvan', name: 'Bhuvan / NRSC', active: true },
  { id: 'worldpop', name: 'WorldPop / Census', active: true },
  { id: 'rainfall', name: 'Rainfall', active: true },
  { id: 'osm', name: 'OSM', active: true },
  { id: 'dem', name: 'DEM / Terrain', active: true },
  { id: 'eo', name: 'Earth Observation', active: false } 
];

export const mapLayersData: MapLayer[] = [
  { id: 'predictedRisk', name: 'Predicted Risk', active: true, type: 'prediction' },
  { id: 'floodHazard', name: 'Flood Hazard', active: true, type: 'flood' },
  { id: 'landslideHazard', name: 'Landslide Hazard', active: true, type: 'landslide' },
  { id: 'populationExposure', name: 'Population Exposure', active: true, type: 'population' },
  { id: 'settlements', name: 'Settlements', active: true, type: 'settlements' },
  { id: 'infrastructure', name: 'Infrastructure', active: true, type: 'infrastructure' },
  { id: 'relocationSites', name: 'Relocation Sites', active: true, type: 'relocation' },
];

export const eoLayersData = [
  { id: 'bhuvan-eo', name: 'Bhuvan / NRSC', active: true },
  { id: 'cartosat', name: 'Cartosat-3', active: true },
  { id: 'sentinel', name: 'Sentinel-1', active: false },
];
