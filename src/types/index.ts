export type RiskLevel = 'Critical' | 'High' | 'Moderate' | 'Safer';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface HazardZone {
  id: string;
  type: string;
  riskLevel: RiskLevel;
  polygon: Coordinates[];
}

export type SiteSafetyStatus = "pending" | "assessing" | "eligible" | "rejected";
export type SiteCapacityStatus = "pending" | "assessing" | "complete";

export interface RelocationSite {
  id: string;
  name: string;
  type: string;
  coordinates: Coordinates;
  distanceFromDevgram: number; // in km
  status: 'candidate' | 'rejected' | 'selected'; // Phase 4A uses 'candidate'
  estimatedCapacity: number;
  hazardExposure: 'low' | 'moderate' | 'high';
  roadAccess: 'good' | 'limited' | 'poor';
  nearbyHospitalDistance: number;
  source: string;
  safety?: {
    status: SiteSafetyStatus;
    hazardExposure: string;
    floodExposure: string;
    landslideExposure: string;
    terrainSuitability: string;
    accessibility: string;
    environmentalConstraint: string;
    rejectionReasons: string[];
  };
  capacity?: {
    status: SiteCapacityStatus;
    usableArea: number; // m²
    estimatedSafeCapacity: number; // people
    capacityCoverage: number; // percentage
  };
  infrastructure?: {
    roadAccess: string;
    nearestHospitalKm: number;
    nearestSchoolKm: number;
    water: string;
    power: string;
    emergencyAccess: string;
    openSpace: string;
  };
  suitability?: {
    status: "pending" | "assessing" | "complete";
    score: number;
    label: string; // 'RECOMMENDED', 'SECONDARY', 'ALTERNATIVE', 'REJECTED'
    factors: {
      safety: number;
      capacity: number;
      accessibility: number;
      infrastructure: number;
      land: number;
      environment: number;
    };
  };
}

export interface InfrastructurePoint {
  id: string;
  name: string;
  type: 'Hospital' | 'School' | 'Health Centre' | 'Primary School';
  coordinates: Coordinates;
}

export interface EvidenceSource {
  id: string;
  name: string;
  active: boolean;
}

export interface MapLayer {
  id: string;
  name: string;
  active: boolean;
  type: 'prediction' | 'flood' | 'landslide' | 'population' | 'settlements' | 'infrastructure' | 'relocation';
  icon?: string;
}

export interface Settlement {
  id: string;
  name: string;
  state: string;
  district: string;
  coordinates: Coordinates;
  riskScore: number;
  riskLevel: RiskLevel;
  population: number;
  populationExposed: number;
  buildingsExposed: number;
  criticalInfrastructureExposed: number;
  impactScore: number;
  estimatedRecoveryMin: number;
  estimatedRecoveryMax: number; // in months
  relocationPriority: 'IMMEDIATE' | 'HIGH' | 'MODERATE' | 'LOW';
  riskFactors: {
    flood: number;
    landslide: number;
    rainfall: number;
    terrain: number;
    historical: number;
    population: number;
    infrastructure: number;
  };
}
