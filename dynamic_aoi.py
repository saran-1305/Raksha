"""
RAKSHA Core Mathematical Engine Prototype
Module: dynamic_aoi.py
Description: Mathematical implementation of Dynamic AOI Generation with anisotropic buffer.
"""

import math
from typing import Dict, List, Tuple

class DynamicAOIGenerator:
    def __init__(self, default_radius_m: float = 1000.0, hazard_threshold: float = 0.65):
        """
        Initializes the Dynamic AOI Generator.
        :param default_radius_m: Initial seed radius (e.g., 1000m -> 2km x 2km bounding box)
        :param hazard_threshold: Cut-off hazard probability tau (default 0.65)
        """
        self.delta_0 = default_radius_m
        self.tau = hazard_threshold
        self.beta_flow = 0.40   # Weight along river channel flow direction
        self.beta_slope = 0.25  # Weight along downhill terrain gradient

    def compute_anisotropic_buffer(
        self, 
        flow_vector: Tuple[float, float], 
        slope_vector: Tuple[float, float]
    ) -> Dict[str, float]:
        """
        Calculates anisotropic buffer distances in North, South, East, West (in meters).
        B_aniso = delta_0 * (I + beta_1 * flow_hat - beta_2 * slope_hat)
        """
        # Normalize vectors
        def norm(v):
            mag = math.hypot(v[0], v[1])
            return (v[0]/mag, v[1]/mag) if mag > 1e-6 else (0.0, 0.0)

        f_x, f_y = norm(flow_vector)
        s_x, s_y = norm(slope_vector)

        # Base isotropic buffer
        dx_east = self.delta_0 * (1.0 + self.beta_flow * max(0, f_x) + self.beta_slope * max(0, -s_x))
        dx_west = self.delta_0 * (1.0 + self.beta_flow * max(0, -f_x) + self.beta_slope * max(0, s_x))
        dy_north = self.delta_0 * (1.0 + self.beta_flow * max(0, f_y) + self.beta_slope * max(0, -s_y))
        dy_south = self.delta_0 * (1.0 + self.beta_flow * max(0, -f_y) + self.beta_slope * max(0, s_y))

        return {
            "east_m": dx_east,
            "west_m": dx_west,
            "north_m": dy_north,
            "south_m": dy_south
        }

    def generate_aoi_bbox(
        self, 
        centroid_lat: float, 
        centroid_lon: float, 
        flow_vec: Tuple[float, float] = (0.7, -0.3), 
        slope_vec: Tuple[float, float] = (0.2, 0.8)
    ) -> Dict[str, float]:
        """
        Converts meter offsets into geodetic coordinate bounding box (WGS84).
        """
        buffers = self.compute_anisotropic_buffer(flow_vec, slope_vec)

        # 1 deg lat ~ 111,000 meters
        # 1 deg lon ~ 111,000 * cos(lat) meters
        meters_per_deg_lat = 111000.0
        meters_per_deg_lon = 111000.0 * math.cos(math.radians(centroid_lat))

        min_lat = centroid_lat - (buffers["south_m"] / meters_per_deg_lat)
        max_lat = centroid_lat + (buffers["north_m"] / meters_per_deg_lat)
        min_lon = centroid_lon - (buffers["west_m"] / meters_per_deg_lon)
        max_lon = centroid_lon + (buffers["east_m"] / meters_per_deg_lon)

        area_km2 = ((buffers["east_m"] + buffers["west_m"]) * (buffers["north_m"] + buffers["south_m"])) / 1e6

        return {
            "min_lat": round(min_lat, 6),
            "max_lat": round(max_lat, 6),
            "min_lon": round(min_lon, 6),
            "max_lon": round(max_lon, 6),
            "area_sq_km": round(area_km2, 2),
            "buffer_metrics": buffers
        }

if __name__ == "__main__":
    aoi_gen = DynamicAOIGenerator()
    sample_aoi = aoi_gen.generate_aoi_bbox(centroid_lat=11.605, centroid_lon=76.083) # Wayanad coordinates
    print("Generated Dynamic AOI (Wayanad Trigger Baseline):")
    print(sample_aoi)
