import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Settlement, RelocationSite } from '../types';
import { settlementsData } from '../data/settlements';

export type MapView = '2d' | '3d';
export type BasemapStyle = 'dark' | 'satellite' | 'terrain' | 'hybrid';
export type ZoneCardState = 'hidden' | 'detected' | 'analyzing' | 'complete';
export type RelocationState = 'idle' | 'searching' | 'candidates_found' | 'assessing_safety' | 'safety_complete' | 'assessing_capacity' | 'capacity_complete';

interface MapStateContextType {
  selectedSettlement: Settlement;
  setSelectedSettlement: (settlement: Settlement) => void;
  visibleLayers: Record<string, boolean>;
  toggleLayer: (layerId: string) => void;
  earthObservation: Record<string, boolean>;
  toggleEarthObservation: (layerId: string) => void;
  mapView: MapView;
  setMapView: (view: MapView) => void;
  basemap: BasemapStyle;
  setBasemap: (style: BasemapStyle) => void;
  hoveredFeature: { type: 'settlement' | 'risk' | 'relocation', data: any } | null;
  setHoveredFeature: (feature: any) => void;
  zoneCardState: ZoneCardState;
  setZoneCardState: (state: ZoneCardState) => void;
  relocationState: RelocationState;
  setRelocationState: (state: RelocationState) => void;
  searchRadius: number;
  setSearchRadius: (radius: number) => void;
  candidateSites: RelocationSite[];
  setCandidateSites: (sites: RelocationSite[]) => void;
  selectedCandidate: RelocationSite | null;
  setSelectedCandidate: (site: RelocationSite | null) => void;
  currentSafetySite: string | null;
  setCurrentSafetySite: (siteId: string | null) => void;
  currentCapacitySite: string | null;
  setCurrentCapacitySite: (siteId: string | null) => void;
}

const MapStateContext = createContext<MapStateContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSettlement, setSelectedSettlement] = useState<Settlement>(
    settlementsData.find(s => s.id === 'devgram') || settlementsData[0]
  );
  
  const [visibleLayers, setVisibleLayers] = useState<Record<string, boolean>>({
    predictedRisk: true,
    floodHazard: true,
    landslideHazard: true,
    populationExposure: true,
    settlements: true,
    infrastructure: true,
    relocationSites: true,
  });

  const [earthObservation, setEarthObservation] = useState<Record<string, boolean>>({
    'bhuvan-eo': true,
    'cartosat': true,
    'sentinel': false,
  });

  const [mapView, setMapView] = useState<MapView>('2d');
  const [basemap, setBasemap] = useState<BasemapStyle>('dark');
  const [hoveredFeature, setHoveredFeature] = useState<MapStateContextType['hoveredFeature']>(null);
  const [zoneCardState, setZoneCardState] = useState<ZoneCardState>('hidden');

  const [relocationState, setRelocationState] = useState<RelocationState>('idle');
  const [searchRadius, setSearchRadius] = useState<number>(5);
  const [candidateSites, setCandidateSites] = useState<RelocationSite[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<RelocationSite | null>(null);
  const [currentSafetySite, setCurrentSafetySite] = useState<string | null>(null);
  const [currentCapacitySite, setCurrentCapacitySite] = useState<string | null>(null);

  const toggleLayer = (layerId: string) => {
    setVisibleLayers(prev => ({ ...prev, [layerId]: !prev[layerId] }));
  };

  const toggleEarthObservation = (layerId: string) => {
    setEarthObservation(prev => ({ ...prev, [layerId]: !prev[layerId] }));
  };

  return (
    <MapStateContext.Provider value={{
      selectedSettlement,
      setSelectedSettlement,
      visibleLayers,
      toggleLayer,
      earthObservation,
      toggleEarthObservation,
      mapView,
      setMapView,
      basemap,
      setBasemap,
      hoveredFeature,
      setHoveredFeature,
      zoneCardState,
      setZoneCardState,
      relocationState,
      setRelocationState,
      searchRadius,
      setSearchRadius,
      candidateSites,
      setCandidateSites,
      selectedCandidate,
      setSelectedCandidate,
      currentSafetySite,
      setCurrentSafetySite,
      currentCapacitySite,
      setCurrentCapacitySite
    }}>
      {children}
    </MapStateContext.Provider>
  );
};

export const useMapState = () => {
  const context = useContext(MapStateContext);
  if (context === undefined) {
    throw new Error('useMapState must be used within a MapProvider');
  }
  return context;
};
