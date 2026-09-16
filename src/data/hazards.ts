


const generatePolygon = (lat: number, lng: number, radiusKm: number, points: number = 40, noiseScale: number = 0.4) => {
  const coordinates: [number, number][] = [];
  const seed1 = Math.random() * Math.PI * 2;
  const seed2 = Math.random() * Math.PI * 2;
  
  for (let i = 0; i < points; i++) {
    const angle = (i * 360) / points;
    const rad = angle * (Math.PI / 180);
    const organicFactor = Math.sin(rad * 3 + seed1) * 0.3 + Math.cos(rad * 5 + seed2) * 0.2 + (Math.random() - 0.5) * noiseScale;
    const noisyRadius = radiusKm * (1 + organicFactor);
    const dLat = (noisyRadius / 111) * Math.cos(rad);
    const dLng = (noisyRadius / (111 * Math.cos(lat * (Math.PI / 180)))) * Math.sin(rad);
    coordinates.push([lng + dLng, lat + dLat]);
  }
  coordinates.push(coordinates[0]);
  return [coordinates];
};

const devgramCenter = { lat: 30.3207, lng: 79.2163 };
const barkotCenter = { lat: 30.8066, lng: 78.2078 };
const rudraprayagCenter = { lat: 30.2844, lng: 78.9811 };

const generateIrregularPolygon = (lat: number, lng: number, radiusKm: number, points: number, seed: number) => {
  const coordinates: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i * 360) / points;
    const rad = angle * (Math.PI / 180);
    // Organic noise for irregular faceted edges
    const noise = Math.sin(rad * 3 + seed) * 0.35 + Math.cos(rad * 5 - seed) * 0.25;
    const noisyRadius = radiusKm * (1 + noise);
    
    const dLat = (noisyRadius / 111) * Math.cos(rad);
    const dLng = (noisyRadius / (111 * Math.cos(lat * (Math.PI / 180)))) * Math.sin(rad);
    coordinates.push([lng + dLng, lat + dLat]);
  }
  coordinates.push(coordinates[0]);
  return [coordinates];
};

const generateRiskPolygons = () => {
  const features: Array<{ type: string; geometry: any; properties: any }> = [];
  
  const addPoly = (latOffset: number, lngOffset: number, radius: number, risk: string, points: number, seed: number) => {
    features.push({
      type: 'Feature',
      geometry: { type: 'Polygon', coordinates: generateIrregularPolygon(devgramCenter.lat + latOffset, devgramCenter.lng + lngOffset, radius, points, seed) },
      properties: { risk, source: 'Bhuvan / NRSC', dataStatus: 'prototype' }
    });
  };

  // GREEN (Safer) - Massive background regions
  addPoly(0.12, 0.05, 14, 'Safer', 24, 1.1);
  addPoly(0.08, -0.15, 15, 'Safer', 22, 2.2);
  addPoly(-0.1, -0.1, 16, 'Safer', 26, 3.3);
  addPoly(-0.12, 0.1, 13, 'Safer', 20, 4.4);
  addPoly(0.0, 0.18, 14, 'Safer', 25, 5.5);
  addPoly(-0.05, 0.15, 12, 'Safer', 21, 6.6);
  addPoly(0.15, -0.05, 13, 'Safer', 23, 7.7);

  // YELLOW (Moderate) - Mid-range transitional regions
  addPoly(0.06, 0.0, 8, 'Moderate', 18, 1.2);
  addPoly(0.04, -0.08, 9, 'Moderate', 20, 2.3);
  addPoly(-0.05, -0.06, 8.5, 'Moderate', 19, 3.4);
  addPoly(-0.06, 0.04, 7, 'Moderate', 21, 4.5);
  addPoly(0.02, 0.09, 8, 'Moderate', 22, 5.6);
  addPoly(0.08, 0.06, 7.5, 'Moderate', 17, 6.7);
  addPoly(-0.02, -0.1, 8, 'Moderate', 20, 7.8);

  // ORANGE (High) - Snug around the critical core
  addPoly(0.03, 0.02, 5, 'High', 16, 8.1);
  addPoly(0.01, -0.04, 4.5, 'High', 15, 8.2);
  addPoly(-0.03, -0.02, 5.5, 'High', 18, 8.3);
  addPoly(-0.02, 0.03, 4, 'High', 14, 8.4);
  addPoly(0.04, -0.02, 4.5, 'High', 17, 8.5);

  // RED (Critical) - Core Devgram footprint
  // Main massive Devgram footprint
  addPoly(0.002, -0.002, 3.5, 'Critical', 24, 9.1);
  // Faceted overlapping critical extensions
  addPoly(0.015, 0.005, 2.5, 'Critical', 16, 9.2);
  addPoly(-0.01, -0.015, 2.8, 'Critical', 18, 9.3);
  addPoly(-0.005, 0.012, 2.2, 'Critical', 15, 9.4);

  return features;
};

export const predictedRiskGeojson = {
  type: 'FeatureCollection',
  features: generateRiskPolygons()
};

// Flood hazard is typically linear (rivers)
const generateRiverBuffer = (startLat: number, startLng: number, endLat: number, endLng: number, points: number, _width: number) => {
  const line = [];
  for(let i=0; i<=points; i++) {
    const t = i/points;
    // Add some curve
    const curve = Math.sin(t * Math.PI) * 0.02;
    const lat = startLat + (endLat - startLat)*t + curve;
    const lng = startLng + (endLng - startLng)*t - curve;
    line.push([lng, lat]);
  }
  return line;
};

// We use LineString for flood, painted with a thick line
export const floodHazardGeojson: { type: 'FeatureCollection', features: any[] } = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', geometry: { type: 'LineString', coordinates: generateRiverBuffer(30.40, 79.35, 30.25, 78.95, 30, 0) }, properties: { risk: 'Flood', source: 'NRSC', dataStatus: 'prototype' } },
    { type: 'Feature', geometry: { type: 'LineString', coordinates: generateRiverBuffer(30.85, 78.25, 30.70, 78.15, 20, 0) }, properties: { risk: 'Flood', source: 'NRSC', dataStatus: 'prototype' } }
  ]
};

// Landslides are patches on slopes
export const landslideHazardGeojson: { type: 'FeatureCollection', features: any[] } = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', geometry: { type: 'Polygon', coordinates: generatePolygon(devgramCenter.lat + 0.03, devgramCenter.lng + 0.03, 2, 16, 0.6) }, properties: { risk: 'Landslide', source: 'GSI', dataStatus: 'prototype' } },
    { type: 'Feature', geometry: { type: 'Polygon', coordinates: generatePolygon(barkotCenter.lat - 0.01, barkotCenter.lng + 0.015, 1.5, 12, 0.5) }, properties: { risk: 'Landslide', source: 'GSI', dataStatus: 'prototype' } },
    { type: 'Feature', geometry: { type: 'Polygon', coordinates: generatePolygon(rudraprayagCenter.lat + 0.04, rudraprayagCenter.lng - 0.02, 2.5, 16, 0.7) }, properties: { risk: 'Landslide', source: 'GSI', dataStatus: 'prototype' } },
  ]
};
