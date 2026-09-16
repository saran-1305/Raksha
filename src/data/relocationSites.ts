import type { RelocationSite } from '../types';

export const relocationSitesData: RelocationSite[] = [
  { 
    id: 'site-a', 
    name: 'SITE A', 
    type: 'Institutional Campus',
    coordinates: { lat: 30.3350, lng: 79.1620 },
    distanceFromDevgram: 3.2, 
    status: 'candidate', 
    estimatedCapacity: 4200,
    hazardExposure: 'low',
    roadAccess: 'good',
    nearbyHospitalDistance: 4.8,
    source: 'OSM / Prototype',
    safety: {
      status: 'eligible',
      hazardExposure: 'LOW',
      floodExposure: 'LOW',
      landslideExposure: 'LOW',
      terrainSuitability: 'GOOD',
      accessibility: 'GOOD',
      environmentalConstraint: 'NONE',
      rejectionReasons: []
    },
    capacity: {
      status: 'complete',
      usableArea: 42000,
      estimatedSafeCapacity: 4200,
      capacityCoverage: 61
    },
    infrastructure: {
      roadAccess: 'GOOD',
      nearestHospitalKm: 4.8,
      nearestSchoolKm: 1.6,
      water: 'AVAILABLE',
      power: 'AVAILABLE',
      emergencyAccess: 'GOOD',
      openSpace: 'ADEQUATE'
    },
    suitability: {
      status: 'complete',
      score: 92,
      label: 'PRIMARY',
      factors: {
        safety: 30,
        capacity: 25,
        accessibility: 15,
        infrastructure: 15,
        land: 10,
        environment: 5
      }
    }
  },
  { 
    id: 'site-b', 
    name: 'SITE B', 
    type: 'Community Facility',
    coordinates: { lat: 30.3050, lng: 79.1650 },
    distanceFromDevgram: 4.1, 
    status: 'candidate', 
    estimatedCapacity: 2800,
    hazardExposure: 'low',
    roadAccess: 'good',
    nearbyHospitalDistance: 6.2,
    source: 'Bhuvan / NRSC',
    safety: {
      status: 'eligible',
      hazardExposure: 'MODERATE-LOW',
      floodExposure: 'LOW',
      landslideExposure: 'MODERATE',
      terrainSuitability: 'ACCEPTABLE',
      accessibility: 'GOOD',
      environmentalConstraint: 'NONE',
      rejectionReasons: []
    },
    capacity: {
      status: 'complete',
      usableArea: 28000,
      estimatedSafeCapacity: 2800,
      capacityCoverage: 41
    },
    infrastructure: {
      roadAccess: 'GOOD',
      nearestHospitalKm: 6.2,
      nearestSchoolKm: 3.5,
      water: 'AVAILABLE',
      power: 'PARTIAL',
      emergencyAccess: 'ACCEPTABLE',
      openSpace: 'LIMITED'
    },
    suitability: {
      status: 'complete',
      score: 76,
      label: 'ALTERNATIVE',
      factors: {
        safety: 22,
        capacity: 15,
        accessibility: 14,
        infrastructure: 12,
        land: 9,
        environment: 4
      }
    }
  },
  {
    id: 'site-c', 
    name: 'SITE C', 
    type: 'Government Campus',
    coordinates: { lat: 30.3650, lng: 79.2250 },
    distanceFromDevgram: 4.8, 
    status: 'candidate', 
    estimatedCapacity: 2640,
    hazardExposure: 'low',
    roadAccess: 'good',
    nearbyHospitalDistance: 8.5,
    source: 'Land Records',
    safety: {
      status: 'eligible',
      hazardExposure: 'LOW',
      floodExposure: 'LOW',
      landslideExposure: 'LOW',
      terrainSuitability: 'GOOD',
      accessibility: 'GOOD',
      environmentalConstraint: 'NONE',
      rejectionReasons: []
    },
    capacity: {
      status: 'complete',
      usableArea: 26400,
      estimatedSafeCapacity: 2640,
      capacityCoverage: 39
    },
    infrastructure: {
      roadAccess: 'GOOD',
      nearestHospitalKm: 8.5,
      nearestSchoolKm: 2.1,
      water: 'AVAILABLE',
      power: 'AVAILABLE',
      emergencyAccess: 'GOOD',
      openSpace: 'AVAILABLE'
    },
    suitability: {
      status: 'complete',
      score: 89,
      label: 'SECONDARY',
      factors: {
        safety: 30,
        capacity: 16,
        accessibility: 15,
        infrastructure: 14,
        land: 9,
        environment: 5
      }
    }
  },
  {
    id: 'site-d', 
    name: 'SITE D', 
    type: 'Institutional Site',
    coordinates: { lat: 30.2850, lng: 79.2350 },
    distanceFromDevgram: 6.3, 
    status: 'candidate', 
    estimatedCapacity: 3500,
    hazardExposure: 'high',
    roadAccess: 'limited',
    nearbyHospitalDistance: 12.0,
    source: 'Satellite Detection',
    safety: {
      status: 'rejected',
      hazardExposure: 'HIGH',
      floodExposure: 'MODERATE',
      landslideExposure: 'VERY HIGH',
      terrainSuitability: 'UNSUITABLE',
      accessibility: 'LIMITED',
      environmentalConstraint: 'HIGH',
      rejectionReasons: [
        'HIGH HAZARD EXPOSURE',
        'VERY HIGH LANDSLIDE EXPOSURE',
        'UNSUITABLE TERRAIN',
        'LIMITED EMERGENCY ACCESS'
      ]
    },
    capacity: {
      status: 'pending',
      usableArea: 0,
      estimatedSafeCapacity: 0,
      capacityCoverage: 0
    },
    suitability: {
      status: 'pending',
      score: 0,
      label: 'REJECTED',
      factors: {
        safety: 0,
        capacity: 0,
        accessibility: 0,
        infrastructure: 0,
        land: 0,
        environment: 0
      }
    }
  }
];
