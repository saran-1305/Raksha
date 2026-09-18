# RAKSHA 2.0: Smart India Hackathon (SIH) Pitch Deck Blueprint
## Truthful, Defensible System Architecture & 10-Slide Presentation Guide

---

## Strategic Framing for Judges
> [!IMPORTANT]
> **Key Judge Defense Posture (The Honest Engineering Advantage):**  
> Do NOT claim that your prototype is an unverified "black-box AI system fusing live neural networks across every satellite." Judges will immediately probe that claim and dismantle it.
> 
> **Instead, state with supreme confidence:**  
> *"RAKSHA 2.0 is an explainable geospatial decision intelligence system with verified multi-sensor data provenance. In our working production prototype, we have implemented an end-to-end multi-sensor pipeline:*
> * 🛰️ **Sentinel-1 C-Band SAR:** *Live Planetary Computer STAC query (`sentinel-1-grd`) delivering dual-polarization (`VV`, `VH`) radar channels, orbit pass, and specular backscatter thresholding for all-weather flood detection.*
> * 🛰️ **Sentinel-2 L2A Optical:** *Live Planetary Computer STAC query (`sentinel-2-l2a`) extracting cloud cover, MGRS tile identifiers, and optical scene preview context.*
> * 🛰️ **Cartosat-3 Validation:** *Sub-meter ($0.28\text{ m}$ PAN) site validation computing verified open-staging ground ($m^2$), structural building footprint density ($< 25\%$), and emergency air-drop helipad clearance ($45\text{ m}$).*
> * 🗺️ **ISRO Bhuvan / NRSC:** *Authoritative Indian geospatial foundation providing 1:50k LULC and drainage anchor vectors.*
> * 🌐 **Terrain & Humanitarian Decision Engine:** *Open-Meteo precipitation and soil moisture telemetry, dynamic anisotropic AOI delineation, a 5×5 spatial hazard grid raster with directional runoff vectors, real-world OpenStreetMap candidate discovery, continuous 12-point SRTM DEM elevation transects, zero-tolerance hard veto safety filtering, Sphere humanitarian capacity planning, and greedy multi-site knapsack allocation ensuring 100% zero-deficit population absorption.*

---

## 🎯 The One-Line Technical Positioning
> **“RAKSHA is an explainable geospatial decision-support engine that converts hazard telemetry into safety-filtered, capacity-aware, and progressively searched relocation plans.”**

## 💡 The Killer Differentiator
> **“It doesn't simply identify where the hazard is — it determines where affected people can relocate safely, verifies open ground footprints at sub-meter resolution, and calculates exact multi-site distribution plans.”**

---

## 10-Slide Presentation Guide

### Slide 1: Title & Strategic Mission
* **Headline:** RAKSHA 2.0
* **Sub-headline:** Resilient AI & Knowledge-driven Settlement Hazard-Adaptive Relocation Engine
* **Visual:** Pitch deck hero visual (`assets/raksha_title_slide.jpg`) featuring 3D holographic terrain, orbital satellite radar beams, red dynamic hazard envelope, and green safe relocation corridors.
* **Theme:** Disaster Management & Space Technology | Target: ISRO (NRSC / Bhuvan), NDMA, MoES
* **Verbatim Script (30 Seconds):**
  > *"Respected Jury, during catastrophic floods and landslides in regions like Wayanad or Chamoli, disaster management does not end when rescue boats pull people from the water. The true humanitarian crisis begins 48 hours later: Where do thousands of displaced citizens go? Today, post-disaster relocation is ad-hoc and manual, often placing temporary camps right back into floodplains or unstable hill cuts. We built RAKSHA 2.0—an explainable geospatial decision intelligence engine that ingests Earth Observation satellite and weather telemetry to dynamically isolate hazard zones, evaluate 5x5 spatial hazard rasters, sample continuous SRTM DEM terrain profiles, validate candidate sites at sub-meter resolution, and calculate exact multi-site safe relocation allocations in seconds."*

---

### Slide 2: Ground Reality — The Relocation Bottleneck
* **Headline:** Post-Disaster Relocation Fails Because It Is Static, Slow, and Siloed
* **Key Ground Realities:**
  1. **The Secondary Disaster Trap:** Relief camps placed in low-lying school grounds or unstable hill cuts frequently suffer secondary flooding or cutoffs due to lack of terrain slope analysis.
  2. **Single-Site Capacity Bottleneck:** A single public school or community ground rarely accommodates an entire displaced township (e.g., 6,800+ citizens in Devgram), causing dangerous camp overcrowding unless solved by multi-site capacity allocation.
  3. **Data Fragmentation & Lack of Provenance:** Authorities cannot verify whether telemetry is live, pre-indexed, or stale. Relocation must have auditable data provenance and follow **safety-first suitability ranking**.

---

### Slide 3: Four-Pillar Satellite & Earth Observation Framework
* **Headline:** Multi-Sensor Synergy: Clear Roles for Space Technology
* **The Four-Pillar Matrix:**

| Satellite / Sensor | Operational Role | Engineering Implementation in RAKSHA 2.0 |
| :--- | :--- | :--- |
| 🛰️ **Sentinel-1 SAR** | **DETECT** | Live Planetary Computer STAC query (`sentinel-1-grd`). Cloud-penetrating C-band radar, dual polarization (`VV`, `VH`), orbit pass, and specular radar backscatter thresholding ($< -16.5\text{ dB}$). |
| 🛰️ **Sentinel-2 Optical** | **UNDERSTAND** | Live Planetary Computer STAC query (`sentinel-2-l2a`). Multi-spectral optical scene telemetry, cloud cover %, and true-color preview context. |
| 🛰️ **Cartosat-3** | **VALIDATE** | Sub-meter ($0.28\text{ m}$ PAN / $1.12\text{ m}$ MX) validation pipeline. Quantifies unblocked open staging grounds ($m^2$), structural building footprint density ($< 25\%$), and $45\text{ m}$ emergency helipad clearance. |
| 🗺️ **ISRO Bhuvan / NRSC** | **ANCHOR** | Authoritative Indian geospatial foundation providing 1:50,000 LULC classification, drainage vectors, and baseline disaster exposure layers. |

> **Axiom:** *“Sentinel-1 detects change, Sentinel-2 provides environmental context, Cartosat-3 validates sites at high resolution, and RAKSHA converts these observations into relocation decisions.”*

---

### Slide 4: End-to-End System Pipeline Architecture
* **Headline:** Transparent Multi-Sensor Ingestion to Humanitarian Execution

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        RAKSHA 2.0 MULTI-SENSOR INGESTION LAYER                         │
│                                                                                        │
│  Sentinel-1 C-SAR (Detect)  Sentinel-2 L2A (Context)  Open-Meteo Weather & Soil Moisture│
│  [All-Weather Radar STAC]   [Optical Multispectral]   [24h Rain + Volumetric Soil %]   │
│           │                           │                                │               │
│           └───────────────────────────┼────────────────────────────────┘               │
│                                       ▼                                                │
│                      Dynamic Hydro-Hazard Index (τ) & Dynamic AOI                       │
│                         (Anisotropic Dilated Hazard Envelope)                          │
│                                       │                                                │
│                                       ▼                                                │
│                    5×5 Spatial Hazard Propagation Grid (25 Cells)                      │
│                    (Directional Runoff Vector Elongation & Decay)                      │
│                                       │                                                │
│                                       ▼                                                │
│              Real OSM Candidate Discovery (Concentric Rings: 0-5, 5-10, 10-15 km)       │
│                                       │                                                │
│                                       ▼                                                │
│             Zero-Tolerance Hard Veto Filter (Slope 2°-14°, Active Flood Exclusion)      │
│                                       │                                                │
│                                       ▼                                                │
│          Cartosat-3 Sub-Meter Validation (0.28m Open Ground, Helipad Clearance)       │
│                                       │                                                │
│                                       ▼                                                │
│          Continuous 12-Point SRTM DEM Elevation Transect (Geodesic Route Profile)      │
│                                       │                                                │
│                                       ▼                                                │
│          Greedy Multi-Site Capacity Allocation (Sphere Standard 45 m²/p @ 60% usable) │
│                                       │                                                │
│                                       ▼                                                │
│          Safety-First MCDA 100-Point Ranking & "WHY THIS SITE?" Explainable Audit Trail │
│                                       │                                                │
│                                       ▼                                                │
│          Actionable Fleet Logistics, Lifeline Quotas & One-Click DDMA Evidence Dossier │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### Slide 5: Mathematical Innovation — Dynamic Anisotropic AOI & 5×5 Spatial Hazard Grid
* **Headline:** Moving Beyond Static Bounding Boxes to Flow-Biased Rasters
* **Dynamic AOI Formulation:**
  $$\mathcal{AOI} = \text{Envelope}\Big(\mathcal{P}_{\text{hazard}}(\tau) \Big) \oplus \vec{\mathcal{B}}_{\text{anisotropic}}$$
  $$\vec{\mathcal{B}}_{\text{anisotropic}} = \delta_0 \cdot \left( \mathbf{I} + \beta_1 \frac{\vec{v}_{\text{flow}}}{\|\vec{v}_{\text{flow}}\|} - \beta_2 \frac{\nabla Z}{\|\nabla Z\|} \right)$$
* **5×5 Spatial Hazard Propagation Grid (25 Cells, 1 km resolution):**
  $$H_{i,j} = \text{clamp}\Big(\tau \cdot \exp(-d_{i,j}/2.5\text{ km}) \cdot (1.0 + 0.35 \max(0, \cos \alpha_{i,j})), \ 0.05, \ 1.0\Big)$$
* **Why this is defensible:**
  * Fixed $2\text{ km} \times 2\text{ km}$ squares ignore topography.
  * RAKSHA propagates hazard intensity along the downstream runoff vector ($\vec{v}_{\text{flow}}$), mapping vulnerable drainage channels before floodwaters arrive.

---

### Slide 6: Zero-Tolerance Hard Veto & 12-Point DEM Transect
* **Headline:** Eliminating Unsafe Sites Before Scoring
* **The Safety Filtering Rules:**
  1. **Slope Stability Filter:** $2^\circ \le \text{Slope} \le 14^\circ$.
     * *Vetoes stagnant, zero-drainage depressions ($<2^\circ$).*
     * *Vetoes steep hillside cuts prone to debris slides and erosion ($>14^\circ$).*
  2. **Drainage Elevation Clearance:** Elevation must clear local drainage incisions.
  3. **Active Hazard Exclusion:** Automatic rejection of parcels inside active debris or surge flow paths.
* **The Zero-Tolerance Principle:**
  > **“Unsafe sites are eliminated by hard veto, not merely penalized in score.”**
* **12-Point Origin-to-Site Terrain Transect:**
  * Samples 12 continuous geodetic elevation points via batch SRTM DEM queries.
  * Measures min/max elevations and maximum terrain gradient. Proves the candidate site and path maintain safe clearance above flood depression levels.

---

### Slide 7: Sub-Meter Site Validation & Greedy Capacity Allocation
* **Headline:** Sub-Meter Physical Clearance & 100% Zero-Deficit Absorption
* **Cartosat-3 Sub-Meter Validation Framework:**
  * Quantifies total site parcel boundary ($m^2$) and unblocked open staging ground ($m^2$).
  * Verifies structural built-up density $< 25\%$ to ensure ample space for field tents.
  * Verifies $45.0\text{ m}$ emergency air-drop helipad clearance for heavy-lift relief helicopters.
* **Humanitarian Capacity Model (Sphere Standards):**
  $$\text{Capacity}(\mathcal{S}_j) = \left\lfloor \frac{\text{Gross Area}(\mathcal{S}_j) \times 0.60}{45\text{ m}^2/\text{person}} \right\rfloor$$
* **Greedy Knapsack Allocation:**
  $$\text{Allocated}_k = \min\Big(R_{k-1}, \ \text{Capacity}(\mathcal{S}_k)\Big), \quad R_k = R_{k-1} - \text{Allocated}_k$$
* **Decongestion Rationale:** Distributes the displaced population across multiple safe sites to prevent hazardous overcrowding, disease outbreak, and resource depletion at a single camp.

---

### Slide 8: The Flagship Scenario — Devgram Benchmark (6,840 Citizens)
* **Headline:** End-to-End Operational Proof: 0 to 100% Absorption
* **The Story Arc:**
  * **Affected Habitation:** Devgram, Chamoli ($30.3207^\circ\text{N}, 79.2163^\circ\text{E}$).
  * **Displacement Cohort:** 6,840 citizens requiring immediate relocation.
  * **Progressive Concentric Search:**
    * **Ring 1 ($0\text{--}5\text{ km}$):** Discovers Site A (4,200 capacity) $\rightarrow$ **INSUFFICIENT** (2,640 deficit).
    * **Ring 2 ($5\text{--}10\text{ km}$):** Expands search $\rightarrow$ Discovers Site C (2,640 capacity) $\rightarrow$ **SUFFICIENT**.
  * **Hard Veto Action:** *Site D (Upper Alaknanda Riverbed Terrace)* is completely rejected due to river gorge inundation risk and unstable slope ($>14^\circ$).
  * **Cartosat-3 Validation:** Site A verified with $244,125\text{ m}^2$ open staging ground and $45\text{ m}$ helipad clearance.
  * **Greedy Multi-Site Allocation:**
    * **Primary Sanctuary (Site A - Pipalkoti Campus):** 4,200 people allocated (61.4% capacity, score 97/100).
    * **Supplementary Sanctuary (Site C - Govt Campus):** 2,640 people allocated (38.6% capacity, score 93/100).
    * **Total Coverage:** $4,200 + 2,640 = 6,840$ persons (**100.0% Coverage, 0 Deficit**).

---

### Slide 9: Safety-First MCDA Ranking & Explicit "WHY THIS SITE?"
* **Headline:** Transparent, Auditable Scoring Free from Black-Box Bias
* **100-Point MCDA Scoring Rubric:**
  * **Safety Factor (30 pts):** Terrain slope stability and distance from active hazard boundary.
  * **Capacity Factor (25 pts):** Sphere-compliant shelter capacity coverage.
  * **Accessibility Factor (15 pts):** Proximity to affected habitation and transit corridors.
  * **Infrastructure Readiness (15 pts):** Estimated from facility type, hospital proximity, and utility context.
  * **Land Suitability (10 pts):** Terrace engineering gradient and gravity drainage.
  * **Environmental Buffer (5 pts):** Distance from historical landslide scars.
* **Explainable "WHY THIS SITE?" Output:**
  * Displays explicit operational checkmarks in the dashboard for each recommended sanctuary.

---

### Slide 10: Actionable Output — Evacuation Fleet & DDMA Evidence Card
* **Headline:** From Geospatial Coordinate to Field Execution Order
* **Operational Deliverables:**
  * **Evacuation Fleet Sizing:** 50-seater transport buses ($\lceil N / 50 \rceil$) and ALS/BLS priority ambulances.
  * **Life-Support Quotas:** Potable water ($15\text{ L/person/day}$ Sphere standard), portable latrines ($1\text{ per } 20\text{ persons}$), and family tents ($5\text{ persons/tent}$).
  * **Origin-to-Site Terrain Profile:** Cross-section ribbon with elevation metrics and maximum terrain gradient.
  * **Interactive DDMA Evidence Card & Audit Dossier:** 8-section official decision record complete with live data provenance badges, upstream latency ($ms$), and one-click PDF/print export for District Collectors.

---

## 🧭 Live Demo Checklist for Hackathon Judges

1. **Open Dashboard:** Navigate to `http://127.0.0.1:8050`. Show the header provenance badges: `S1-SAR: LIVE`, `S2-L2A: LIVE`, `Cartosat-3: 0.28m VALID`, `Wx: LIVE`, `DEM: LIVE`, `OSM: PRE-INDEXED`.
2. **Select Devgram Preset:** Point out the coordinates ($30.3207^\circ\text{N}, 79.2163^\circ\text{E}$) and displaced population ($6,840$).
3. **Execute Analysis:** Click `EXECUTE MULTI-HAZARD EO ANALYSIS`.
4. **Step 1 (Discover):** Point out Sentinel-1 SAR telemetry card (Scene ID, Ascending pass, dual VV/VH polarization) and Cartosat-3 sub-meter card ($244,125\text{ m}^2$ open ground, $45\text{ m}$ helipad clearance).
5. **Step 2 (Safety):** Show the Zero-Tolerance Hard Veto table and highlight why *Site D* was eliminated.
6. **Step 3 (Capacity):** Show why Ring 1 alone was insufficient ($4,200 < 6,840$) and how the greedy allocation absorbs all $6,840$ persons.
7. **Step 4 (Infrastructure):** Show facility readiness auditing for schools and campuses.
8. **Step 5 (Suitability):** Show the transparent 100-point MCDA breakdown.
9. **Step 6 (Recommendation):** Review the complete deployment plan, bus fleet, and water quota.
10. **Open Audit Dossier:** Click `GENERATE AUDIT DOSSIER` to display the formal 8-section executive card with one-click print capability.
