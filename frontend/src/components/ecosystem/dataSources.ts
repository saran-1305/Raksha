export type SourceStatus = 'LIVE PROTOTYPE' | 'STAC PROTOTYPE' | 'TARGET ARCHITECTURE';

export interface DataSource {
  id: string;
  category: string;
  title: string;
  status: SourceStatus;
  description: string;
  metadata: {
    label: string;
    value: string;
  }[];
  useCases: string[];
  x: number; // relative position percentage 0-100
  y: number; // relative position percentage 0-100
}

export const dataSources: DataSource[] = [
  {
    id: 'dem',
    category: 'SATELLITE / TERRAIN',
    title: 'DEM / TERRAIN',
    status: 'LIVE PROTOTYPE',
    description: 'SRTM 30m topographic elevation models, slope gradient derivation and cross-section transects.',
    metadata: [
      { label: 'DATA TYPE', value: 'Digital Elevation Model' },
      { label: 'RESOLUTION', value: '30 m' },
      { label: 'REVISIT TIME', value: 'Static Baseline' }
    ],
    useCases: ['Slope analysis', 'Flood modeling', 'Line-of-sight'],
    x: 75,
    y: 35
  },
  {
    id: 'weather',
    category: 'WEATHER',
    title: 'WEATHER / RAIN',
    status: 'LIVE PROTOTYPE',
    description: '24-hour antecedent precipitation, cloudburst thresholds and runoff saturation heuristics.',
    metadata: [
      { label: 'DATA TYPE', value: 'Meteorological' },
      { label: 'RESOLUTION', value: '0.25° grid' },
      { label: 'REVISIT TIME', value: 'Real-time / 1-hour' }
    ],
    useCases: ['Rainfall tracking', 'Flash flood prediction', 'Storm pathing'],
    x: 25,
    y: 35
  },
  {
    id: 'osm',
    category: 'INFRASTRUCTURE',
    title: 'OSM / INFRA',
    status: 'LIVE PROTOTYPE',
    description: 'Pre-indexed educational institutions, sports stadia, community halls and primary road lifelines.',
    metadata: [
      { label: 'DATA TYPE', value: 'Vector / POI' },
      { label: 'RESOLUTION', value: 'Asset Level' },
      { label: 'REVISIT TIME', value: 'Continuous' }
    ],
    useCases: ['Shelter identification', 'Routing', 'Exposure mapping'],
    x: 88,
    y: 50
  },
  {
    id: 'aoi',
    category: 'HAZARD',
    title: 'DYNAMIC AOI',
    status: 'LIVE PROTOTYPE',
    description: 'Automated disaster envelope computation expanding radius based on hazard severity and terrain.',
    metadata: [
      { label: 'DATA TYPE', value: 'Computed Polygon' },
      { label: 'RESOLUTION', value: 'Dynamic' },
      { label: 'REVISIT TIME', value: 'Event-driven' }
    ],
    useCases: ['Impact boundary', 'Evacuation zones', 'Resource allocation'],
    x: 80,
    y: 65
  },
  {
    id: 'sentinel1',
    category: 'SATELLITE',
    title: 'SENTINEL-1 SAR',
    status: 'STAC PROTOTYPE',
    description: 'Planetary Computer STAC catalog querying C-band radar backscatter and orbit metadata.',
    metadata: [
      { label: 'DATA TYPE', value: 'Synthetic Aperture Radar (C-band)' },
      { label: 'RESOLUTION', value: '10 m' },
      { label: 'REVISIT TIME', value: '6–12 days' }
    ],
    useCases: ['All-weather observation', 'Surface change detection', 'Flood mapping', 'Terrain analysis'],
    x: 12,
    y: 50
  },
  {
    id: 'sentinel2',
    category: 'SATELLITE',
    title: 'SENTINEL-2 L2A',
    status: 'STAC PROTOTYPE',
    description: '10m optical multispectral imagery catalog querying true-color scenes and MGRS cloud telemetry.',
    metadata: [
      { label: 'DATA TYPE', value: 'Multispectral Optical' },
      { label: 'RESOLUTION', value: '10 m' },
      { label: 'REVISIT TIME', value: '5 days' }
    ],
    useCases: ['Vegetation index', 'Damage assessment', 'Land cover classification'],
    x: 20,
    y: 65
  },
  {
    id: 'cartosat',
    category: 'SATELLITE',
    title: 'CARTOSAT-3',
    status: 'TARGET ARCHITECTURE',
    description: '0.28m sub-meter catalog architecture for potential emergency access site assessment.',
    metadata: [
      { label: 'DATA TYPE', value: 'Panchromatic & Multispectral' },
      { label: 'RESOLUTION', value: '0.28 m' },
      { label: 'REVISIT TIME', value: 'On-demand' }
    ],
    useCases: ['Building damage assessment', 'Road blockages', 'Micro-terrain features'],
    x: 65,
    y: 78
  },
  {
    id: 'bhuvan',
    category: 'NATIONAL',
    title: 'ISRO BHUVAN',
    status: 'TARGET ARCHITECTURE',
    description: 'NRSC 1:50,000 Land Use/Land Cover (LULC) baseline and national disaster exposure layer integration.',
    metadata: [
      { label: 'DATA TYPE', value: 'Thematic Maps' },
      { label: 'RESOLUTION', value: '1:50,000' },
      { label: 'REVISIT TIME', value: 'Annual / Seasonal' }
    ],
    useCases: ['Land use baseline', 'Historical risk', 'National integration'],
    x: 35,
    y: 78
  }
];
