"""
RAKSHA: Earth Observation & AI-Powered Disaster Relocation System
FastAPI Web Application & Live Geospatial API Server
"""

import os
from typing import Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from satellite_service import SatelliteTelemetryService
from relocation_engine import RelocationEngine
from bhoonidhi_client import bhoonidhi_service
from bhuvan_client import bhuvan_service

app = FastAPI(
    title="RAKSHA Disaster Relocation Engine",
    description="Real-Time Earth Observation & Progressive Relocation Decision Intelligence",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Core Services
sat_service = SatelliteTelemetryService()
engine = RelocationEngine(satellite_service=sat_service)

# Mount Static Assets
assets_dir = os.path.join(os.path.dirname(__file__), "assets")
if os.path.exists(assets_dir):
    app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

PRESET_HOTSPOTS = [
    {
        "id": "devgram",
        "name": "Devgram Hazard Habitation (Chamoli, Uttarakhand)",
        "lat": 30.3207,
        "lon": 79.2163,
        "hazard_type": "Glacial Inundation & Landslide Runoff",
        "default_population": 6840,
        "description": "High-risk mountain settlement in Chamoli with multi-hazard flood and landslide exposure."
    },
    {
        "id": "wayanad",
        "name": "Wayanad Landslide Core (Meppadi/Chooralmala, Kerala)",
        "lat": 11.5126,
        "lon": 76.1287,
        "hazard_type": "Landslide & Torrential Inundation",
        "default_population": 4200,
        "description": "High-gradient Western Ghats terrain impacted by intense cloudbursts and debris flows."
    },
    {
        "id": "silchar",
        "name": "Silchar / Barak Valley Inundation (Assam)",
        "lat": 24.8333,
        "lon": 92.7789,
        "hazard_type": "Riverine Flood & Embankment Breach",
        "default_population": 12500,
        "description": "Low-lying floodplain with chronic backwater flooding and severe connectivity severance."
    },
    {
        "id": "chamoli",
        "name": "Joshimath / Chamoli Subsidence Zone (Uttarakhand)",
        "lat": 30.5574,
        "lon": 79.5670,
        "hazard_type": "Land Subsidence & Slope Destabilization",
        "default_population": 2800,
        "description": "High-altitude fragile Himalayan moraine slopes experiencing ground fissures."
    },
    {
        "id": "munambam",
        "name": "Munambam Coastal Erosion & Storm Surge (Ernakulam, Kerala)",
        "lat": 10.1792,
        "lon": 76.1738,
        "hazard_type": "Coastal Storm Surge & Sea Ingress",
        "default_population": 3500,
        "description": "Narrow barrier spit vulnerable to cyclone swells and tidal embankment overflow."
    }
]

class AnalysisRequest(BaseModel):
    lat: float = Field(..., ge=-90.0, le=90.0, description="Latitude [-90.0 to 90.0]")
    lon: float = Field(..., ge=-180.0, le=180.0, description="Longitude [-180.0 to 180.0]")
    displaced_population: int = Field(default=3500, ge=50, le=500000, description="Scenario Displaced Population [50 - 500,000]")
    hazard_type: Optional[str] = Field(default="Multi-Hazard Crisis", max_length=100)

@app.get("/api/health")
def health_check():
    return sat_service.probe_component_health()

@app.get("/api/presets")
def get_presets():
    return PRESET_HOTSPOTS

@app.post("/api/analyze")
def run_analysis(req: AnalysisRequest):
    try:
        # 1. Resolve Location
        loc_name = sat_service.get_location_name(req.lat, req.lon)

        # 2a. Live Optical Satellite EO Query (Sentinel-2 L2A STAC)
        sentinel_telemetry = sat_service.fetch_sentinel2_scene(req.lat, req.lon)

        # 2b. Live All-Weather Radar Satellite EO Query (Sentinel-1 C-Band SAR STAC)
        sentinel1_telemetry = sat_service.fetch_sentinel1_sar_scene(req.lat, req.lon)

        # 3. Live Satellite Precipitation & Soil Moisture
        meteo_telemetry = sat_service.fetch_satellite_precipitation(req.lat, req.lon)

        hazard_index = meteo_telemetry.get("computed_hazard_index", 0.65)
        hazard_level = meteo_telemetry.get("hazard_level", "Elevated")

        # 4. Compute Dynamic AOI
        aoi_data = engine.compute_dynamic_aoi(
            centroid_lat=req.lat,
            centroid_lon=req.lon,
            hazard_index=hazard_index
        )

        # 5. Progressive 5 km Ring Evaluation & Multi-Criteria Ranking
        relocation_results = engine.evaluate_relocation_rings(
            centroid_lat=req.lat,
            centroid_lon=req.lon,
            displaced_population=req.displaced_population,
            hazard_level=hazard_level,
            hazard_index=hazard_index,
            flow_bearing_deg=aoi_data.get("flow_bearing_deg", 135.0)
        )

        # 6. Cartosat-3 Sub-Meter High-Resolution Validation for Top Recommended Site
        top_site = relocation_results.get("ranked_safe_sites", [{}])[0] if relocation_results.get("ranked_safe_sites") else None
        cartosat_validation = sat_service.validate_cartosat3_site(top_site) if top_site else {}
        relocation_results["cartosat3_validation"] = cartosat_validation
        relocation_results["sentinel1_sar_telemetry"] = sentinel1_telemetry

        # 7. ISRO Bhuvan / NRSC 1:50k LULC & Historical Disaster Screening
        bhuvan_thematic = sat_service.fetch_bhuvan_thematic(top_site, req.lat, req.lon) if top_site else {}
        relocation_results["bhuvan_thematic"] = bhuvan_thematic

        return {
            "status": "success",
            "system_version": "RAKSHA Engine 2.0",
            "location_name": loc_name,
            "query_parameters": {
                "latitude": req.lat,
                "longitude": req.lon,
                "displaced_population": req.displaced_population,
                "hazard_type": req.hazard_type
            },
            "data_provenance": relocation_results.get("data_provenance", {}),
            "satellite_telemetry": sentinel_telemetry,
            "sentinel1_sar_telemetry": sentinel1_telemetry,
            "cartosat3_validation": cartosat_validation,
            "bhuvan_thematic": bhuvan_thematic,
            "precipitation_telemetry": meteo_telemetry,
            "dynamic_aoi": aoi_data,
            "relocation_decision": relocation_results
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/bhuvan/thematic")
def get_bhuvan_thematic(lat: float, lon: float, site_name: Optional[str] = None):
    return bhuvan_service.query_thematic_lulc(lat, lon, site_name or "")

@app.get("/api/bhoonidhi/status")
def get_bhoonidhi_status():
    return bhoonidhi_service.get_auth_status()

@app.get("/api/cartosat/validate")
def get_cartosat_validation(lat: float, lon: float, site_name: Optional[str] = None):
    mock_site = {
        "name": site_name or "Target Zone",
        "lat": lat,
        "lon": lon,
        "coordinates": {"lat": lat, "lon": lon},
        "gross_area_sqm": 125000
    }
    return sat_service.validate_cartosat3_site(mock_site)

@app.get("/", response_class=HTMLResponse)
@app.get("/landing", response_class=HTMLResponse)
def serve_landing():
    template_path = os.path.join(os.path.dirname(__file__), "templates", "landing.html")
    if os.path.exists(template_path):
        with open(template_path, "r", encoding="utf-8") as f:
            return f.read()
    return "<h1>RAKSHA Landing template not found</h1>"

@app.get("/simulation", response_class=HTMLResponse)
def serve_simulation():
    template_path = os.path.join(os.path.dirname(__file__), "templates", "index.html")
    if os.path.exists(template_path):
        with open(template_path, "r", encoding="utf-8") as f:
            return f.read()
    return "<h1>RAKSHA Dashboard template not found</h1>"

@app.get("/earth-observation", response_class=HTMLResponse)
@app.get("/satellite", response_class=HTMLResponse)
def serve_satellite():
    template_path = os.path.join(os.path.dirname(__file__), "templates", "satellite.html")
    if os.path.exists(template_path):
        with open(template_path, "r", encoding="utf-8") as f:
            return f.read()
    return "<h1>RAKSHA Earth Observation Studio template not found</h1>"

@app.get("/hazard-lab", response_class=HTMLResponse)
@app.get("/hazard", response_class=HTMLResponse)
def serve_hazard():
    template_path = os.path.join(os.path.dirname(__file__), "templates", "hazard_lab.html")
    if os.path.exists(template_path):
        with open(template_path, "r", encoding="utf-8") as f:
            return f.read()
    return "<h1>RAKSHA Hazard Intelligence Lab template not found</h1>"

@app.get("/relocation-engine", response_class=HTMLResponse)
@app.get("/relocation", response_class=HTMLResponse)
def serve_relocation():
    template_path = os.path.join(os.path.dirname(__file__), "templates", "relocation.html")
    if os.path.exists(template_path):
        with open(template_path, "r", encoding="utf-8") as f:
            return f.read()
    return "<h1>RAKSHA Relocation Decision Studio template not found</h1>"

@app.get("/logistics-dispatch", response_class=HTMLResponse)
@app.get("/logistics", response_class=HTMLResponse)
def serve_logistics():
    template_path = os.path.join(os.path.dirname(__file__), "templates", "logistics.html")
    if os.path.exists(template_path):
        with open(template_path, "r", encoding="utf-8") as f:
            return f.read()
    return "<h1>RAKSHA Fleet Logistics template not found</h1>"

@app.get("/ddma-dossier", response_class=HTMLResponse)
@app.get("/dossier", response_class=HTMLResponse)
def serve_dossier():
    template_path = os.path.join(os.path.dirname(__file__), "templates", "dossier.html")
    if os.path.exists(template_path):
        with open(template_path, "r", encoding="utf-8") as f:
            return f.read()
    return "<h1>RAKSHA DDMA Legal Dossier template not found</h1>"

@app.get("/workflow", response_class=HTMLResponse)
@app.get("/workflow/{step}", response_class=HTMLResponse)
@app.get("/relocation-workflow", response_class=HTMLResponse)
def serve_workflow(step: str = "1"):
    template_path = os.path.join(os.path.dirname(__file__), "templates", "workflow.html")
    if os.path.exists(template_path):
        with open(template_path, "r", encoding="utf-8") as f:
            return f.read()
    return "<h1>RAKSHA Relocation Workflow template not found</h1>"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8050, reload=False)

