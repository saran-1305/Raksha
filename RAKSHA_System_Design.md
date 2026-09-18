# RAKSHA 2.0: System Design & Mathematical Formulation
## Explainable Geospatial Relocation Decision Intelligence System

> **“It doesn't simply identify where the hazard is — it determines where affected people can relocate safely, how much capacity is available, and how the population can be distributed across suitable sites.”**

---

## 1. System Philosophy & Scope

### Implemented RAKSHA 2.0 Capabilities (Production-Ready Working MVP)
1. **4-Component Data Provenance Framework:**
   - Tracks telemetry sources in real time: Sentinel-2 STAC (`LIVE` vs. `DEMO FALLBACK`), Open-Meteo Weather (`LIVE`), Open-Meteo SRTM DEM (`LIVE`), and OSM Overpass (`LIVE` vs. `PRE-INDEXED`).
   - Measures and exposes upstream latency ($ms$) on the UI and logs origin endpoints in decision audit cards.
2. **Sentinel-2 L2A STAC Telemetry:** Queries Microsoft Planetary Computer STAC endpoint for Sentinel-2 L2A optical scenes (acquisition timestamp, cloud cover %, scene ID, MGRS tile, and true-color preview URL) with demo-resilient fallback.
3. **Weather & Soil Telemetry:** Integrates Open-Meteo weather API to ingest 24-hour precipitation series and volumetric soil moisture ($m^3/m^3$).
4. **Dynamic Anisotropic AOI:** Generates a dilated spatial boundary scaled by the hydro-hazard index ($\tau$) and elongated along the hydrological flow vector ($\vec{v}_{\text{flow}}$).
5. **5×5 Spatial Hazard Grid Raster:**
   - Evaluates a 25-cell raster ($1.0\text{ km}$ spatial resolution) surrounding the disaster epicenter.
   - Computes distance-decayed hazard intensity modulated by hydrological runoff flow vectors ($\vec{v}_{\text{flow}}$) and classifies cells into risk tiers (`Critical`, `High`, `Moderate`, `Low`).
6. **Continuous 12-Point SRTM DEM Transect:**
   - Samples 12 geodetic points between the disaster origin and candidate relocation sanctuaries using batch Open-Meteo SRTM DEM queries.
   - Computes `min_elev`, `max_elev`, `net_delta`, and `max_gradient_pct` to verify physical route feasibility and flood clearance.
7. **Real Candidate Discovery:** Queries OpenStreetMap (Overpass API) to identify real-world schools, colleges, sports complexes, and community centers within a 15 km radius.
8. **Zero-Tolerance Hard Veto:** Automatically rejects candidate sites with unsafe slopes ($<2^\circ$ or $>14^\circ$) or flood-depression elevations.
9. **Sphere Planning Area Capacity & Multi-Site Knapsack Allocation:**
   - Calculates safe population capacity based on Sphere project guidance ($45\text{ m}^2/\text{person}$ camp/settlement planning surface area) using an engineering assumption of 60% usable layout.
   - Executes greedy knapsack allocation across vetted safe sites to achieve 100% population coverage with zero deficit.
10. **Explainable Multi-Criteria Utility Ranking (MCDA):** Ranks surviving sites using a transparent 100-point weighted scoring function based on safety, capacity, accessibility, infrastructure, land suitability, and environmental buffer.
11. **Evacuation Logistics & DDMA Evidence Card:** Computes transport fleet requirements (buses, ambulances, water tankers, latrines) and generates a printable 7-section official operational dossier.
### Implemented RAKSHA 2.0 Capabilities (Working MVP)
1. **Data Provenance Framework:**
   - Real-time tracking of telemetry mode: 🟢 `LIVE`, 🟡 `PRE-INDEXED`, 🟠 `DEMO FALLBACK`.
   - Explicit attribution: Sentinel-2 L2A STAC (Microsoft Planetary Computer), Weather & Soil Moisture (Open-Meteo), SRTM DEM 90m (Open-Meteo), and OSM Facilities (Pre-Indexed benchmarks with live Overpass fallback).
   - Component health probes measuring upstream API latency ($ms$).
2. **Sentinel-2 L2A STAC Telemetry:** Queries STAC endpoint for Sentinel-2 optical scene metadata, acquisition timestamp, platform, cloud cover %, and true-color preview URL.
3. **Hydro-Meteorological Telemetry:** Ingests 24-hour precipitation series and volumetric soil moisture ($m^3/m^3$) via Open-Meteo.
4. **Dynamic Anisotropic AOI:** Generates an impact boundary dilated by the hydro-hazard index ($\tau$) and elongated along the hydrological runoff vector ($\vec{v}_{\text{flow}}$).
5. **5×5 Spatial Hazard Propagation Grid:** Computes a 25-cell raster ($1.0\text{ km}$ spatial resolution) with distance decay and directional runoff flow boost, classified into risk tiers (`Critical`, `High`, `Moderate`, `Low`).
6. **12-Point Origin-to-Site Terrain Transect:** Batch queries the SRTM DEM for 12 geodetic points along the vector between epicenter and candidate site, evaluating route elevation clearance, minimum/maximum elevations, and terrain gradient.
7. **OSM-Based Candidate Discovery:** Identifies candidate public facilities (schools, colleges, stadiums, community grounds) via pre-indexed benchmark scenarios with live Overpass fallback for custom coordinates.
8. **Zero-Tolerance Hard Veto Filter:** Eliminates candidates with unsafe slopes ($<2^\circ$ or $>14^\circ$) or drainage depression elevations. **Unsafe sites are eliminated, not merely penalized.**
9. **Sphere-Aligned Capacity Guidance:** Estimates safe capacity ($45\text{ m}^2/\text{person}$ planned settlement surface area with 60% usable layout assumption).
10. **Greedy Multi-Site Capacity Allocation:** Solves single-site deficits by distributing the displaced population across vetted safe sites to achieve 100% zero-deficit coverage.
11. **Safety-First Suitability Ranking (MCDA):** 100-point explainable utility scoring balancing Safety (30), Capacity (25), Accessibility (15), Infrastructure (15), Land (10), and Environment (5).
12. **Estimated Infrastructure Readiness:** Estimates lifeline availability (roads, hospital proximity, water, power) from facility type and geospatial context.
13. **Evacuation Logistics & DDMA Evidence Card:** Calculates bus fleets, ambulances, and life-support quotas, generating a printable 8-section official decision record with explicit **"WHY THIS SITE?"** rationales.

### Production Architecture Roadmap
* **ISRO Bhuvan / NRSC:** National 1:50k Land Use / Land Cover (LULC), historical disaster recurrence vectors, and state cadastral land tenure data.
* **Sentinel-1 SAR:** C-Band Synthetic Aperture Radar for all-weather, day/night flood inundation mapping through dense monsoonal clouds.
* **Cartosat-3:** Sub-meter optical imagery for building footprint density and settlement exposure assessment.
* **Supervised Machine Learning:** Training spatial ML models (e.g. Random Forest / UNet) on labeled flood and landslide rasters to replace heuristic hazard scoring.
* **Sentinel-1 SAR:** All-weather, day/night radar flood extent and surface change detection through dense monsoonal cloud cover.
* **Sentinel-2 Optical (Advanced):** Automated spectral index calculation (NDVI, NDWI/MNDWI) and multi-temporal optical change detection.
* **Cartosat-3 Sub-meter Imagery:** Sub-meter ($0.28\text{ m}$) high-resolution site footprint validation, building density analysis, and open ground verification.
* **ISRO Bhuvan / NRSC:** Authoritative Indian geospatial foundation providing 1:50k LULC, flood recurrence vectors, and state cadastral land tenure data.
* **Real Population Exposure:** Intersecting hazard raster masks with High-Resolution Settlement Layer (HRSL) or Census rasters to dynamically estimate displaced persons.
* **Road-Network Routing:** Integrating OSRM / OpenRouteService for actual road-network routing, travel times, bridge availability, and road blockage risks.
* **Supervised Machine Learning:** Training spatial ML models on historical disaster recovery records.

---

## 2. Mathematical Formulations
## 2. Four-Pillar Satellite & Spatial Framework

### 2.1 Explainable Hydro-Hazard Index ($\tau$)
| Satellite / Platform | Primary Role | Operational Responsibility in RAKSHA Pipeline |
| :--- | :--- | :--- |
| 🛰️ **Sentinel-1 SAR** | **Detect** | All-weather, cloud-independent radar observation for flood extent, water-body expansion, and surface change detection. |
| 🛰️ **Sentinel-2 Optical** | **Understand** | Multi-spectral optical telemetry for land cover classification, vegetation condition, and environmental context. |
| 🛰️ **Cartosat-3** | **Validate** | Sub-meter ($0.28\text{ m}$) high-resolution verification of candidate site boundaries, building footprints, and physical access. |
| 🗺️ **ISRO Bhuvan / NRSC** | **Anchor** | Authoritative Indian geospatial foundation providing administrative boundaries, LULC, drainage, and disaster layers. |

> **“Sentinel-1 detects change, Sentinel-2 provides environmental context, Cartosat-3 validates sites at high resolution, and RAKSHA converts these observations into relocation decisions.”**

---

## 3. Mathematical Formulations

### 3.1 Hydro-Meteorological Hazard Index ($\tau$)
$$\tau = \min\left(1.0, \ 0.6 \cdot \frac{P_{24\text{h}}}{120\text{ mm}} + 0.4 \cdot \frac{\theta_{\text{soil}}}{0.50\text{ m}^3/\text{m}^3} \right)$$
Where:
* $P_{24\text{h}}$ is the 24-hour accumulated rainfall (mm).
* $\theta_{\text{soil}}$ is volumetric soil moisture saturation ($m^3/m^3$).
* When $\tau \ge 0.70$, the scenario is classified as **Critical** (evacuation mandatory).
Where $P_{24\text{h}}$ is the 24-hour accumulated rainfall (mm) and $\theta_{\text{soil}}$ is volumetric soil moisture ($m^3/m^3$).

---

### 2.2 5×5 Spatial Hazard Grid Raster
Let the grid consist of 25 cells $\mathcal{C}_{i,j}$ for $i, j \in \{-2, -1, 0, 1, 2\}$, spaced at $1.0\text{ km}$ resolution:
$$\text{lat}_{i,j} = \text{lat}_0 + i \cdot \Delta\text{lat}, \quad \text{lon}_{i,j} = \text{lon}_0 + j \cdot \Delta\text{lon}$$
Where $\Delta\text{lat} \approx 1.0 / 111.0^\circ$ and $\Delta\text{lon} \approx 1.0 / (111.0 \cdot \cos(\text{lat}_0))^\circ$.

The raw distance from the epicenter is:
### 3.2 5×5 Spatial Hazard Propagation Grid
Let the raster consist of 25 cells $\mathcal{C}_{i,j}$ for $i, j \in \{-2, -1, 0, 1, 2\}$ spaced at $1.0\text{ km}$ resolution around epicenter $(\text{lat}_0, \text{lon}_0)$:
$$d_{i,j} = \sqrt{i^2 + j^2} \times 1.0\text{ km}$$

The distance decay factor is:
$$\mathcal{D}(d_{i,j}) = \exp\left( -\frac{d_{i,j}}{2.5\text{ km}} \right)$$

The directional hydrological runoff alignment is computed via unit vectors:
$$\vec{u}_{i,j} = \frac{(j, i)}{\sqrt{i^2 + j^2}}, \quad \vec{u}_{\text{flow}} = (\sin \theta_{\text{flow}}, \cos \theta_{\text{flow}})$$
$$\cos \alpha_{i,j} = \vec{u}_{i,j} \cdot \vec{u}_{\text{flow}}$$
$$\mathcal{F}_{\text{flow}}(i, j) = 1.0 + 0.35 \cdot \max(0, \cos \alpha_{i,j})$$

The composite cell hazard intensity $H_{i,j}$ is:
Directional runoff alignment with unit vector $\vec{u}_{\text{flow}} = (\sin \theta_{\text{flow}}, \cos \theta_{\text{flow}})$:
$$\cos \alpha_{i,j} = \vec{u}_{i,j} \cdot \vec{u}_{\text{flow}}, \quad \mathcal{F}_{\text{flow}}(i, j) = 1.0 + 0.35 \cdot \max(0, \cos \alpha_{i,j})$$
$$H_{i,j} = \text{clamp}\Big(\tau \cdot \mathcal{D}(d_{i,j}) \cdot \mathcal{F}_{\text{flow}}(i, j), \ 0.05, \ 1.0\Big)$$

Risk Classification Tiers:
* **Critical Risk:** $H_{i,j} \ge 0.70$ (Deep Red)
* **High Risk:** $0.50 \le H_{i,j} < 0.70$ (Amber Red)
* **Moderate Risk:** $0.30 \le H_{i,j} < 0.50$ (Yellow Orange)
* **Low Risk:** $H_{i,j} < 0.30$ (Muted Emerald)

---

### 2.3 Dynamic Anisotropic AOI Envelope
### 3.3 Dynamic Anisotropic AOI Envelope
$$\mathcal{AOI} = \text{Envelope}\Big(\mathcal{P}_{\text{hazard}}(\tau)\Big) \oplus \vec{\mathcal{B}}_{\text{anisotropic}}$$
$$\vec{\mathcal{B}}_{\text{anisotropic}} = \delta_0 \cdot \left( \mathbf{I} + \beta_1 \frac{\vec{v}_{\text{flow}}}{\|\vec{v}_{\text{flow}}\|} - \beta_2 \frac{\nabla Z}{\|\nabla Z\|} \right)$$
* Base buffer $\delta_0 = 1000\text{ m} \cdot (1.0 + 1.5\tau)$.
* Downstream stretch factor $\beta_1 = 1.4$ extends the perimeter along the natural drainage path.
Base buffer $\delta_0 = 1000\text{ m} \cdot (1.0 + 1.5\tau)$, with downstream stretch factor $\beta_1 = 1.4$.

---

### 2.4 Continuous 12-Point Geodetic SRTM DEM Elevation Transect
For a route connecting epicenter $p_0 = (\text{lat}_0, \text{lon}_0)$ to candidate site $p_c = (\text{lat}_c, \text{lon}_c)$, 12 equidistant geodetic points are sampled:
### 3.4 12-Point Origin-to-Site Terrain Transect
Equidistant geodetic points between epicenter $p_0$ and candidate site $p_c$:
$$p_k = p_0 + \frac{k}{11} (p_c - p_0), \quad k \in \{0, 1, \dots, 11\}$$
Elevations $Z_k = \text{DEM}(p_k)$ are fetched from the SRTM elevation model.
The transect profile outputs:
Elevations $Z_k = \text{DEM}(p_k)$ are sampled from the SRTM model. The profile outputs:
$$Z_{\min} = \min_{k} Z_k, \quad Z_{\max} = \max_{k} Z_k, \quad \Delta Z_{\text{net}} = Z_{11} - Z_0$$
$$\text{Max Gradient } (\%) = \max_{0 \le k < 11} \left( \frac{|Z_{k+1} - Z_k|}{d(p_k, p_{k+1})} \right) \times 100$$

---

### 2.5 Zero-Tolerance Hard Veto Safety Filter
A candidate facility $p$ is strictly eligible iff:
$$\Phi(p) = \mathbb{I}(\text{Slope}(p) \le 14.0^\circ) \land \mathbb{I}(\text{FloodSafe}(p)) \land \mathbb{I}(\text{Dist}(p) \le 16\text{ km}) \land \neg \text{ForceVeto}(p) = 1$$
Where $\text{FloodSafe}(p)$ verifies elevation above storm surge ($\ge 2.5\text{ m MSL}$) in coastal plains and above hydrological drainage incised ravines in mountain valleys. Sites located in active debris corridors receive zero tolerance ($\Phi(p) = 0$).
### 3.5 Zero-Tolerance Hard Veto Filter
$$\Phi(p) = \mathbb{I}(2.0^\circ \le \text{Slope}(p) \le 14.0^\circ) \land \mathbb{I}(\text{FloodSafe}(p)) \land \mathbb{I}(\text{Dist}(p) \le 16\text{ km}) \land \neg \text{ForceVeto}(p)$$
* **Zero-Tolerance Principle:** Unsafe sites are completely eliminated ($\Phi(p) = 0$), never recommended with a low score.

---

### 2.6 Humanitarian Planning-Area Capacity & Multi-Site Knapsack Allocation
The gross planning capacity of candidate $\mathcal{S}_j$ is:
### 3.6 Estimated Safe Capacity & Greedy Multi-Site Allocation
$$\text{Capacity}(\mathcal{S}_j) = \left\lfloor \frac{\text{Gross Area}(\mathcal{S}_j) \times 0.60}{45\text{ m}^2/\text{person}} \right\rfloor$$
*(Sphere Project guidance for planned settlement site surface area, with 60% shelter ground and 40% reserved for access corridors, drainage, and emergency logistics)*.
*(Sphere Project guidance for planned camp surface area, with 60% shelter ground and 40% reserved for access corridors, drainage, and emergency logistics)*.

When total displaced population $N_{\text{displaced}} > \text{Capacity}(\mathcal{S}_1)$, a greedy multi-site knapsack allocation distributes the population across safe, ranked candidates $\{\mathcal{S}_1, \mathcal{S}_2, \dots, \mathcal{S}_M\}$:
1. Initialize remaining population $R_0 = N_{\text{displaced}}$.
2. For each ranked safe candidate $k = 1, \dots, M$:
   $$\text{Allocated}_k = \min\Big(R_{k-1}, \ \text{Capacity}(\mathcal{S}_k)\Big)$$
   $$R_k = R_{k-1} - \text{Allocated}_k$$
   $$\text{Utilization}_k = \left(\frac{\text{Allocated}_k}{\text{Capacity}(\mathcal{S}_k)}\right) \times 100\%$$
For total displaced population $N_{\text{displaced}}$, greedy allocation over ranked safe sites $\{\mathcal{S}_1, \dots, \mathcal{S}_M\}$:
1. $R_0 = N_{\text{displaced}}$.
2. For $k = 1, \dots, M$:
   $$\text{Allocated}_k = \min\Big(R_{k-1}, \ \text{Capacity}(\mathcal{S}_k)\Big), \quad R_k = R_{k-1} - \text{Allocated}_k$$
3. Guaranteed Coverage:
   $$\text{Total Absorbed} = \sum_{k=1}^M \text{Allocated}_k, \quad \text{Coverage \%} = \min\left(100.0, \frac{\text{Total Absorbed}}{N_{\text{displaced}}} \times 100\right)$$
   $$\text{Residual Deficit} = \max(0, \ N_{\text{displaced}} - \text{Total Absorbed})$$

---

### 2.7 100-Point Multi-Criteria Decision Analysis (MCDA) Scoring
For eligible candidates passing the zero-tolerance hard veto ($\Phi(p) = 1$):
$$\text{Score}(\mathcal{S}_j) = \mathcal{F}_{\text{safety}} + \mathcal{F}_{\text{capacity}} + \mathcal{F}_{\text{access}} + \mathcal{F}_{\text{infra}} + \mathcal{F}_{\text{land}} + \mathcal{F}_{\text{env}} \quad \in [0, 100]$$

| Factor Component | Maximum Weight | Scientific & Operational Rationale |
| :--- | :---: | :--- |
| $\mathcal{F}_{\text{safety}}$ | **30 pts** | Terrain stability gradient, distance from dynamic active hazard boundary. |
| $\mathcal{F}_{\text{capacity}}$ | **25 pts** | Sphere-standard shelter capacity coverage ratio relative to exposed population. |
| $\mathcal{F}_{\text{access}}$ | **15 pts** | Proximity to origin habitation ($<5\text{ km}$ Ring 1 bonus) and all-weather road viability. |
| $\mathcal{F}_{\text{infra}}$ | **15 pts** | Readiness of existing facilities (College/Campus: 15 pts, Grounds: 13 pts), distance to hospital and school. |
| $\mathcal{F}_{\text{land}}$ | **10 pts** | Engineering terrace suitability, flat slope drainage gradient. |
| $\mathcal{F}_{\text{env}}$ | **5 pts** | Environmental buffer distance from active historical landslide scars. |

---

### 2.8 Actionable Emergency Fleet Logistics
For an allocated population $N_{\text{site}}$ at candidate site $\mathcal{S}_j$:
$$\text{Buses Required} = \left\lceil \frac{N_{\text{site}}}{50} \right\rceil$$
$$\text{Priority Ambulances (ALS/BLS)} = \max\left(2, \ \left\lceil \frac{N_{\text{site}}}{250} \right\rceil\right)$$
$$\text{Potable Water Supply} = N_{\text{site}} \times 15.0\text{ Litres/day (Sphere Standard)}$$
$$\text{Emergency Latrines} = \left\lceil \frac{N_{\text{site}}}{20} \right\rceil$$
$$\text{Family Shelter Tents} = \left\lceil \frac{N_{\text{site}}}{5} \right\rceil$$
### 3.7 Safety-First MCDA Suitability Scoring
For candidates passing the hard veto ($\Phi(p) = 1$):
$$\text{Score}(\mathcal{S}_j) = \mathcal{F}_{\text{safety}}(30) + \mathcal{F}_{\text{capacity}}(25) + \mathcal{F}_{\text{access}}(15) + \mathcal{F}_{\text{infra}}(15) + \mathcal{F}_{\text{land}}(10) + \mathcal{F}_{\text{env}}(5)$$
Sites are sorted by total score: $\text{Rank } 1 \rightarrow \text{Primary Sanctuary}$, $\text{Rank } 2 \rightarrow \text{Supplementary Sanctuary}$.
