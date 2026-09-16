import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Map, { NavigationControl, Marker, Source, Layer, Popup, useMap } from 'react-map-gl/maplibre';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Search, MapPin, Plus, BookOpen, Globe, Map as MapIcon } from 'lucide-react';
import { settlementsData } from '../../data/settlements';
import { infrastructureData } from '../../data/infrastructure';
import { predictedRiskGeojson, floodHazardGeojson, landslideHazardGeojson } from '../../data/hazards';
import { populationExposureGeojson } from '../../data/populationExposure';
import { useMapState } from '../../context/MapContext';
import { ZoneIntelligenceCard } from './ZoneIntelligenceCard';
import { cn } from '../../utils/cn';

// ──── Geometry helpers ────
const getAoiBox = (lat: number, lng: number, km: number) => {
  const dLat = km / 111;
  const dLng = km / (111 * Math.cos(lat * (Math.PI / 180)));
  return [
    [lng - dLng, lat - dLat], [lng + dLng, lat - dLat],
    [lng + dLng, lat + dLat], [lng - dLng, lat + dLat],
    [lng - dLng, lat - dLat]
  ];
};

const createCircle = (lat: number, lng: number, radiusKm: number, points: number = 32) => {
  const coordinates = [];
  for (let i = 0; i < points; i++) {
    const angle = (i * 360) / points;
    const rad = angle * (Math.PI / 180);
    const dLat = (radiusKm / 111) * Math.cos(rad);
    const dLng = (radiusKm / (111 * Math.cos(lat * (Math.PI / 180)))) * Math.sin(rad);
    coordinates.push([lng + dLng, lat + dLat]);
  }
  coordinates.push(coordinates[0]);
  return coordinates;
};

// ──── Globe Projection Controller ────
const GlobeController: React.FC = () => {
  const { current: mapRef } = useMap();
  const { mapView } = useMapState();

  useEffect(() => {
    const map = mapRef?.getMap();
    if (!map) return;

    const applyProjection = () => {
      if (mapView === '3d') {
        map.setProjection({ type: 'globe' });
      } else {
        map.setProjection({ type: 'mercator' });
      }
    };

    // Apply immediately if style is loaded, otherwise wait
    if (map.isStyleLoaded()) {
      applyProjection();
    } else {
      map.on('style.load', applyProjection);
    }

    return () => {
      map.off('style.load', applyProjection);
    };
  }, [mapRef, mapView]);

  return null;
};

// ──── Infrastructure Icon ────
const InfraIcon: React.FC<{ type: string }> = ({ type }) => {
  if (type === 'Hospital' || type === 'Health Centre') {
    return <Plus className="w-3 h-3 text-danger" />;
  }
  return <BookOpen className="w-3 h-3 text-cyan-400" />;
};

// ──── Main Map Component ────
export const GISMap: React.FC = () => {
  const {
    selectedSettlement, setSelectedSettlement,
    visibleLayers, mapView, setMapView, basemap, setBasemap,
    hoveredFeature, setHoveredFeature,
    zoneCardState, setZoneCardState,
    relocationState, searchRadius, candidateSites,
    currentSafetySite, currentCapacitySite
  } = useMapState();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredInfra, setHoveredInfra] = useState<string | null>(null);
  const savedZoomRef = useRef(11);

  const [viewState, setViewState] = useState({
    longitude: selectedSettlement.coordinates.lng,
    latitude: selectedSettlement.coordinates.lat,
    zoom: 11,
    pitch: 0,
    bearing: 0
  });

  // Pan to selected settlement
  useEffect(() => {
    setViewState(prev => ({
      ...prev,
      longitude: selectedSettlement.coordinates.lng,
      latitude: selectedSettlement.coordinates.lat,
    }));
  }, [selectedSettlement.id]);

  // Handle 2D/3D view transitions
  useEffect(() => {
    if (mapView === '3d') {
      savedZoomRef.current = viewState.zoom;
      setViewState(prev => ({
        ...prev,
        zoom: 2.5,
        pitch: 0,
        bearing: 0
      }));
    } else {
      setViewState(prev => ({
        ...prev,
        zoom: savedZoomRef.current || 11,
        pitch: 0,
        bearing: 0
      }));
    }
  }, [mapView]);

  // Basemap style URL
  const mapStyleUrl = useMemo(() => {
    switch (basemap) {
      case 'terrain': return 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';
      case 'dark':
      default: return 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
    }
  }, [basemap]);

  const aoiGeojson = useMemo(() => ({
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [getAoiBox(selectedSettlement.coordinates.lat, selectedSettlement.coordinates.lng, 1)] }
  }), [selectedSettlement]);

  const searchAreaGeojson = useMemo(() => ({
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [createCircle(selectedSettlement.coordinates.lat, selectedSettlement.coordinates.lng, searchRadius)] }
  }), [selectedSettlement, searchRadius]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const result = settlementsData.find(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
      if (result) {
        setSelectedSettlement(result);
        setZoneCardState('detected');
      }
    }
  };

  const handleSettlementClick = useCallback((settlement: typeof selectedSettlement) => {
    setSelectedSettlement(settlement);
    setZoneCardState('detected');
    setHoveredFeature(null);
  }, [setSelectedSettlement, setZoneCardState, setHoveredFeature]);

  return (
    <div className="flex-1 relative bg-[#0a0d14] w-full h-full overflow-hidden" onClick={() => { setHoveredFeature(null); setZoneCardState('hidden'); }}>
      
      {/* Search Bar */}
      <div className="absolute top-4 left-4 z-20 w-72">
        <div className="relative flex items-center group">
          <Search className="absolute left-3.5 w-3.5 h-3.5 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
          <input 
            type="text" 
            placeholder="Search location, village, district..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full bg-black/80 border border-white/20 rounded-full py-2 pl-10 pr-4 text-[11px] text-white placeholder-textMuted focus:outline-none focus:border-primary/60 transition-all shadow-lg backdrop-blur-md"
          />
        </div>
      </div>

      {/* Map View + Basemap Switcher */}
      <div className="absolute top-4 right-4 z-20 flex items-center bg-black/85 border border-white/15 rounded-full p-0.5 shadow-lg backdrop-blur-md text-[9px] font-bold uppercase tracking-widest">
        {/* View Mode */}
        <button 
          onClick={(e) => { e.stopPropagation(); setMapView('2d'); }}
          className={cn("flex items-center gap-1 px-3 py-1.5 transition-all rounded-full", mapView === '2d' ? "bg-primary/20 text-primary border border-primary/40" : "text-textMuted hover:text-white")}
        >
          <MapIcon className="w-3 h-3" /> 2D
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); setMapView('3d'); }}
          className={cn("flex items-center gap-1 px-3 py-1.5 transition-all rounded-full", mapView === '3d' ? "bg-primary/20 text-primary border border-primary/40" : "text-textMuted hover:text-white")}
        >
          <Globe className="w-3 h-3" /> 3D
        </button>

        <div className="w-px h-4 bg-white/20 mx-1" />

        {/* Basemap */}
        {(['dark', 'satellite', 'terrain', 'hybrid'] as const).map(mode => (
          <button 
            key={mode}
            onClick={(e) => { e.stopPropagation(); setBasemap(mode); }}
            className={cn("px-3 py-1.5 transition-all rounded-full", basemap === mode ? "bg-white/10 text-white border border-white/30" : "text-textMuted hover:text-white")}
          >
            {mode === 'satellite' ? 'SAT' : mode.toUpperCase()}
          </button>
        ))}
      </div>

      {/* The Map */}
      <Map
        id="raksha-map"
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle={mapStyleUrl}
        style={{ width: '100%', height: '100%' }}
        mapLib={maplibregl as any}
        interactiveLayerIds={['hazard-fill', 'flood-line', 'landslide-fill']}
        onClick={(e) => {
          if (e.features && e.features.length > 0) {
            e.originalEvent.stopPropagation();
          }
        }}
      >
        {/* Globe projection controller */}
        <GlobeController />

        {/* Satellite/Hybrid Raster */}
        {(basemap === 'satellite' || basemap === 'hybrid') && (
          <Source id="satellite" type="raster" tiles={['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}']} tileSize={256}>
            <Layer id="satellite-layer" type="raster" paint={{ 'raster-opacity': basemap === 'hybrid' ? 0.6 : 0.85 }} />
          </Source>
        )}

        {/* ──── Hazard Layers ──── */}

        {/* Predicted Risk */}
        {visibleLayers.predictedRisk && (
          <Source id="hazards" type="geojson" data={predictedRiskGeojson as any}>
            <Layer 
              id="hazard-fill" type="fill" 
              paint={{
                'fill-color': ['match', ['get', 'risk'], 'Critical', '#FF3030', 'High', '#FF8A00', 'Moderate', '#FFD21F', 'Safer', '#00D084', '#ffffff'],
                'fill-opacity': ['match', ['get', 'risk'], 'Critical', 0.30, 'High', 0.24, 'Moderate', 0.18, 'Safer', 0.12, 0.15]
              }} 
            />
          </Source>
        )}

        {/* Flood */}
        {visibleLayers.floodHazard && (
          <Source id="flood" type="geojson" data={floodHazardGeojson as any}>
            <Layer id="flood-line" type="line" paint={{ 'line-color': '#00e5ff', 'line-width': 6, 'line-opacity': 0.25, 'line-blur': 4 }} />
          </Source>
        )}

        {/* Landslide */}
        {visibleLayers.landslideHazard && (
          <Source id="landslide" type="geojson" data={landslideHazardGeojson as any}>
            <Layer id="landslide-fill" type="fill" paint={{ 'fill-color': '#8B4513', 'fill-opacity': 0.22 }} />
          </Source>
        )}

        {/* Population */}
        {visibleLayers.populationExposure && (
          <Source id="population" type="geojson" data={populationExposureGeojson as any}>
            <Layer id="population-heat" type="circle" paint={{ 'circle-radius': ['interpolate', ['linear'], ['get', 'population'], 1000, 10, 5000, 30, 10000, 50], 'circle-color': '#ffffff', 'circle-opacity': 0.12, 'circle-blur': 1 }} />
          </Source>
        )}

        {/* ──── Boundaries ──── */}

        {/* Search Boundary */}
        {relocationState !== 'idle' && (
          <Source id="search-area" type="geojson" data={searchAreaGeojson as any}>
            <Layer id="search-area-line" type="line" paint={{ 'line-color': '#00e5ff', 'line-width': 1, 'line-dasharray': [6, 4], 'line-opacity': 0.35 }} />
          </Source>
        )}

        {/* AOI Box — subtle white dashed */}
        <Source id="aoi" type="geojson" data={aoiGeojson as any}>
          <Layer id="aoi-line" type="line" paint={{ 'line-color': '#ffffff', 'line-width': 1, 'line-dasharray': [4, 4], 'line-opacity': 0.4 }} />
        </Source>

        {/* AOI Label */}
        <Marker longitude={selectedSettlement.coordinates.lng} latitude={selectedSettlement.coordinates.lat - 0.012} anchor="center">
          <div className="text-white/50 text-[8px] font-mono tracking-widest uppercase pointer-events-none">
            2 KM × 2 KM AOI
          </div>
        </Marker>

        {/* Search Radius Label */}
        {relocationState !== 'idle' && (
          <Marker longitude={selectedSettlement.coordinates.lng} latitude={selectedSettlement.coordinates.lat + (searchRadius * 0.009)} anchor="center">
            <div className="text-cyan-400/50 text-[8px] font-mono tracking-widest uppercase pointer-events-none">
              INITIAL SEARCH · AOI + {searchRadius} KM
            </div>
          </Marker>
        )}

        {/* ──── Settlement Markers ──── */}
        {visibleLayers.settlements && settlementsData.map(settlement => {
          const isSelected = selectedSettlement.id === settlement.id;
          return (
            <Marker 
              key={`set-${settlement.id}`} 
              longitude={settlement.coordinates.lng} 
              latitude={settlement.coordinates.lat} 
              anchor="bottom"
              style={{ zIndex: isSelected ? 50 : 10 }}
            >
              <div 
                className="flex flex-col items-center cursor-pointer"
                onClick={(e) => { e.stopPropagation(); handleSettlementClick(settlement); }}
                onMouseEnter={() => !isSelected && setHoveredFeature({ type: 'settlement', data: settlement })}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={cn(
                  "relative flex items-center justify-center transition-all",
                  isSelected ? "w-8 h-8" : "w-3 h-3"
                )}>
                  {isSelected ? (
                    <>
                      {zoneCardState === 'analyzing' && (
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-75" />
                      )}
                      <MapPin className={cn(
                        "w-8 h-8 transition-colors",
                        zoneCardState === 'analyzing' 
                          ? "text-cyan-400 fill-cyan-400/20 drop-shadow-[0_0_12px_rgba(0,229,255,0.8)]" 
                          : zoneCardState === 'complete'
                          ? "text-safe fill-safe/20 drop-shadow-[0_0_12px_rgba(0,208,132,0.8)]"
                          : "text-danger fill-danger/20 drop-shadow-[0_0_8px_rgba(255,51,51,1)]"
                      )} />
                    </>
                  ) : (
                    <div className="w-3 h-3 bg-warning rounded-full border border-white/60 shadow-md hover:scale-150 transition-transform" />
                  )}
                </div>
                {isSelected && (
                  <div className="mt-1 bg-black/90 border border-white/20 px-2 py-1 rounded-sm">
                    <span className="text-white text-[10px] font-black tracking-widest">{settlement.name}</span>
                  </div>
                )}
              </div>
            </Marker>
          );
        })}

        {/* ──── Zone Intelligence Card (OSIRIS-style popup) ──── */}
        {zoneCardState !== 'hidden' && (
          <Popup 
            longitude={selectedSettlement.coordinates.lng} 
            latitude={selectedSettlement.coordinates.lat} 
            anchor="left"
            offset={[20, -20]}
            closeButton={false}
            closeOnClick={false}
            className="raksha-popup"
          >
            <div onClick={(e) => e.stopPropagation()}>
              <ZoneIntelligenceCard />
            </div>
          </Popup>
        )}

        {/* ──── Relocation Site Markers ──── */}
        {visibleLayers.relocationSites && candidateSites.map(site => {
          const status = site.safety?.status;
          const isReject = status === 'rejected';
          const isEligible = status === 'eligible';
          const isAssessing = (relocationState === 'assessing_safety' && currentSafetySite === site.id) || (relocationState === 'assessing_capacity' && currentCapacitySite === site.id);

          let markerColor = "text-cyan-400 fill-cyan-400/20 drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]";
          let labelColor = "text-cyan-400";
          let borderColor = "border-cyan-500/30";

          if (isAssessing) {
            markerColor = "text-warning fill-warning/20 drop-shadow-[0_0_8px_rgba(255,153,0,0.6)]";
            labelColor = "text-warning";
            borderColor = "border-warning/30";
          } else if (isReject) {
            markerColor = "text-white/30 fill-transparent opacity-50";
            labelColor = "text-white/40";
            borderColor = "border-danger/20";
          } else if (isEligible) {
            markerColor = "text-safe fill-safe/20 drop-shadow-[0_0_8px_rgba(0,208,132,0.6)]";
            labelColor = "text-safe";
            borderColor = "border-safe/30";
          }

          return (
            <Marker key={site.id} longitude={site.coordinates.lng} latitude={site.coordinates.lat} anchor="bottom">
              <div className={cn("flex flex-col items-center cursor-pointer", isReject && "grayscale-[0.5]")} onClick={(e) => e.stopPropagation()}>
                <div className="relative flex items-center justify-center w-6 h-6">
                  {isAssessing && <div className="absolute inset-0 rounded-full border-2 border-warning animate-ping opacity-60" />}
                  <MapPin className={cn("w-6 h-6 transition-colors", markerColor)} />
                </div>
                <div className={cn("mt-0.5 px-1.5 py-0.5 flex flex-col items-center rounded-sm border bg-black/90", borderColor)}>
                  <span className={cn("text-[9px] font-bold tracking-widest", labelColor)}>{site.name}</span>
                  <span className="text-[8px] font-mono text-textMuted">{site.distanceFromDevgram} km</span>
                  {isReject && <span className="text-danger text-[7px] font-bold">REJECTED</span>}
                </div>
              </div>
            </Marker>
          );
        })}

        {/* ──── Infrastructure Markers (icon-only) ──── */}
        {visibleLayers.infrastructure && infrastructureData.map(infra => (
          <Marker key={infra.id} longitude={infra.coordinates.lng} latitude={infra.coordinates.lat} anchor="center">
            <div 
              className="w-5 h-5 bg-black/80 border border-white/15 rounded-full flex items-center justify-center cursor-pointer hover:border-white/40 hover:scale-125 transition-all relative"
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => setHoveredInfra(infra.id)}
              onMouseLeave={() => setHoveredInfra(null)}
            >
              <InfraIcon type={infra.type} />
              {hoveredInfra === infra.id && (
                <div className="absolute bottom-full mb-1 bg-black/95 border border-white/20 px-2 py-1 rounded-sm whitespace-nowrap z-50 pointer-events-none">
                  <span className="text-white text-[8px] font-bold tracking-widest uppercase">{infra.name}</span>
                </div>
              )}
            </div>
          </Marker>
        ))}

        {/* Map Controls */}
        <NavigationControl position="bottom-right" showCompass showZoom />
      </Map>

      {/* Hover Tooltip (non-selected settlements) */}
      {hoveredFeature && hoveredFeature.type === 'settlement' && hoveredFeature.data.id !== selectedSettlement.id && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 bg-black/90 border border-white/20 text-white px-3 py-2 rounded-sm shadow-lg pointer-events-none">
          <span className="text-[10px] font-bold tracking-widest">{hoveredFeature.data.name}</span>
          <span className="text-[9px] text-textMuted ml-2">Risk: {hoveredFeature.data.riskScore}</span>
        </div>
      )}
    </div>
  );
};
