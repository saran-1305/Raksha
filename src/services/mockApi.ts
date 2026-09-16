import { settlementsData } from '../data/settlements';
import { relocationSitesData } from '../data/relocationSites';
import type { Settlement, RelocationSite } from '../types';

export const mockApi = {
  getSettlementRisk: async (settlementId: string): Promise<Settlement> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = settlementsData.find(s => s.id === settlementId);
        if (data) resolve(data);
        else reject(new Error("Settlement not found"));
      }, 500);
    });
  },
  
  getRelocationCandidates: async (_settlementId: string, radius: number): Promise<RelocationSite[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const candidates = relocationSitesData.filter(site => site.distanceFromDevgram <= radius);
        resolve(candidates);
      }, 800); 
    });
  },
  
  assessSiteSafety: async (siteId: string): Promise<RelocationSite['safety']> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const site = relocationSitesData.find(s => s.id === siteId);
        if (site && site.safety) resolve(site.safety);
        else reject(new Error("Safety data not found for site."));
      }, 600);
    });
  },
  
  calculateCapacity: async (siteId: string): Promise<{ capacity: RelocationSite['capacity'], infrastructure: RelocationSite['infrastructure'] }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const site = relocationSitesData.find(s => s.id === siteId);
        if (site && site.capacity && site.infrastructure) {
          resolve({ capacity: site.capacity, infrastructure: site.infrastructure });
        } else {
          reject(new Error("Capacity data not found for site."));
        }
      }, 600);
    });
  },

  calculateSiteSuitability: async (siteId: string): Promise<RelocationSite['suitability']> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const site = relocationSitesData.find(s => s.id === siteId);
        if (site && site.suitability) resolve(site.suitability);
        else reject(new Error("Suitability data not found for site."));
      }, 600);
    });
  },

  getScenarioResult: async (settlementId: string, rainfallAnomalyPercent: number): Promise<Settlement> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = settlementsData.find(s => s.id === settlementId);
        if (data) {
          // Deterministic simulation
          const newRainfallRisk = Math.min(100, data.riskFactors.rainfall + (rainfallAnomalyPercent / 100) * 100);
          const oldRainfallFactor = data.riskFactors.rainfall * 0.15;
          const newRainfallFactor = newRainfallRisk * 0.15;
          const newRiskScore = Math.min(100, Math.round(data.riskScore - oldRainfallFactor + newRainfallFactor));
          
          resolve({
            ...data,
            riskScore: newRiskScore,
            riskFactors: {
              ...data.riskFactors,
              rainfall: Math.round(newRainfallRisk)
            }
          });
        }
        else reject(new Error("Settlement not found"));
      }, 400);
    });
  }
};
