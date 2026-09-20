# 🎙️ RAKSHA: Official 5-Minute Demonstration Script
**Project**: RAKSHA — Explainable Multi-Sensor Geospatial Decision Intelligence for Disaster Relocation  
**Target Audience**: Hackathon Judges, Disaster Management Authorities (DDMA/NDMA), Technical Evaluators  
**Target Duration**: 5 Minutes (~650–700 Spoken Words @ 130 WPM)  
**Speaker Stance**: Confident, technical, authoritative, and mission-driven.

---

## ⏱️ Minute-by-Minute Presentation Timeline

```
[00:00 - 01:00] ─── Problem Statement & Vision (Why RAKSHA exists)
[01:00 - 02:00] ─── Multi-Sensor Earth Observation (How we fuse S1, S2, Cartosat-3, Bhuvan, DEM)
[02:00 - 03:00] ─── The Decision Engine (Dynamic AOI, Zero-Tolerance Vetoes, Sphere Standards)
[03:00 - 04:00] ─── Live Relocation Studio (MCDA TOPSIS Sensitivity Sliders, Cadastre & Zonation)
[04:00 - 05:00] ─── Incident Logistics & Statutory DDMA Executive Order (NDMA Act §34 PDF)
```

---

## 📑 Complete Script with Screen Cues

### **[00:00 – 01:00] MINUTE 1: The Urgent Problem & The RAKSHA Vision**
- **🖥️ Screen Action:** Open browser on **Landing Page** (`http://127.0.0.1:8050/`). Show the hero banner, disaster imagery, and problem statement.
- **🗣️ Spoken Words:**
> *"Respected judges and panel members, in sudden-onset disasters like the Chamoli flash floods or the Wayanad landslides, existing early-warning systems can detect that a disaster has occurred. But they completely fail at the most urgent operational question: **'Where do we move the displaced population right now?'**  
> 
> Currently, emergency relocation is chaotic and ad-hoc. Displaced families are often sent to schools situated on unstable slopes or low-lying riverbeds because incident commanders lack fused, real-time spatial intelligence.  
> 
> This is **RAKSHA**—an explainable geospatial decision intelligence platform that fuses Earth Observation satellite telemetry, terrain physics, and international humanitarian standards to automate disaster relocation planning within seconds."*

---

### **[01:00 – 02:00] MINUTE 2: Multi-Sensor Ingestion (How Data Fuels Relocation)**
- **🖥️ Screen Action:** Click **"Enter Mission Command"** or open `http://127.0.0.1:8050/overview`. Click the **Devgram (Chamoli)** preset button. Switch to the **Satellite Telemetry** tab (or open `http://127.0.0.1:8050/eo-studio`).
- **🗣️ Spoken Words:**
> *"RAKSHA does not rely on a single data feed. Real-world disaster zones are choked with heavy cloud cover, torrential rain, and severed infrastructure. We synthesize **four complementary Earth Observation satellite streams and terrain models**:
>
> 1. **Sentinel-1 SAR Radar (C-Band):** *All-weather microwave radar from ESA that penetrates storm clouds and nighttime darkness to map specular water backscatter and active flood boundaries.*
> 2. **Sentinel-2 Multi-Spectral Optical:** *10-meter resolution imagery via Microsoft Planetary Computer STAC, establishing vegetation health (NDVI) and environmental baselines.*
> 3. **ISRO Cartosat-3 (0.28m Sub-Meter Panchromatic):** *Our high-resolution ground validator. It audits open staging ground, ensures building density is under 25%, and verifies a 45-meter radius cleared helipad for emergency air-drops.*
> 4. **ISRO Bhuvan & NRSC 1:50,000 Thematic Anchor:** *Provides authoritative national land-use classification (LULC), institutional land tenure, and 10-year historical disaster zonation to prove the sanctuary is not on a recurrent floodway.*
> 5. **NASA SRTM 30m DEM:** *Generates continuous slope angles and topographic transect profiles between the disaster origin and candidate sanctuaries."*

---

### **[02:00 – 03:00] MINUTE 3: The Decision Engine (Vetoes, Buffer Rings & Sphere Standards)**
- **🖥️ Screen Action:** Point out on the map (`http://127.0.0.1:8050/overview`):
  - **Red polygon**: Dynamic Anisotropic Hazard AOI
  - **Cyan / Blue concentric circles**: Progressive 5 km and 10 km Search Buffers
  - **Red '✕' markers**: Vetoed candidate sites
  - **Green '#' markers**: Safe candidate sites
  - **Bottom chart**: SRTM DEM Terrain Elevation Transect Profile
- **🗣️ Spoken Words:**
> *"Here is how RAKSHA converts raw satellite feeds into life-saving decisions:
>
> First, we reject static circular hazard zones. Using precipitation accumulation and terrain slope vectors, RAKSHA generates a **Dynamic Anisotropic Hazard AOI** along the true hydrological runoff corridor.
>
> Second, we enforce **Zero-Tolerance Safety Vetoes**. In RAKSHA, an unsafe site is eliminated outright—never merely penalized in score. If a facility sits on a slope over 14 degrees, inside an active inundation zone, or within 50 meters of drainage corridors, it receives an instant hard veto. You can see Site D—the Upper Alaknanda riverbed—eliminated with zero tolerance.
>
> Third, for every passing site, RAKSHA enforces **Sphere Humanitarian Standards (2018)**: 45 square meters per person total settlement space and 3.5 square meters covered living space. We don’t just say 'this school is safe'—we calculate exactly how many of the 6,840 displaced citizens it can legally and humanely absorb."*

---

### **[03:00 – 04:00] MINUTE 4: Relocation Engineering Studio (MCDA Sensitivity & Zonation)**
- **🖥️ Screen Action:** Navigate to the **Relocation Studio** (`http://127.0.0.1:8050/relocation`):
  - Move the **Safety Priority Slider** or the **Hard Veto Slope Limit Slider** to show live TOPSIS recalculation.
  - Click the **"Zonation"** tab to reveal the 34,200 m² sector blueprint (family tents, triage clinic, sanitation buffer, helipad).
  - Click the **"Cadastre"** tab to highlight geotechnical bearing capacity (185 kN/m²) and hydraulic freeboard (+24m).
- **🗣️ Spoken Words:**
> *"Moving to our **Relocation Engineering Studio**, district magistrates have interactive sensitivity control.
>
> Using our **MCDA TOPSIS Sensitivity Simulator**, administrators can tune policy weights across Safety (35%), Proximity (25%), Usable Capacity (20%), and Road Ingress (20%). If we tighten our hard veto slope limit down to 10 degrees, the model dynamically re-evaluates all candidates in real time.
>
> Under our **Zonation Blueprint**, RAKSHA automatically drafts the tactical camp layout: family shelter clusters, medical triage clinics, and sanitary buffers placed downwind and strictly 50 meters away from groundwater sources.
>
> Under the **Cadastral Inspector**, we verify statutory land tenure under District Collector Requisition powers, ensuring immediate administrative access without private land disputes."*

---

### **[04:00 – 05:00] MINUTE 5: Logistics Fleet & Statutory Executive Order (NDMA Act §34)**
- **🖥️ Screen Action:** Open the **DDMA Executive Dossier** (`http://127.0.0.1:8050/ddma`). Click the primary button: **"Download PDF Order (.pdf)"**. Show the direct `.pdf` document instantly downloaded in the browser.
- **🗣️ Spoken Words:**
> *"Finally, intelligence without logistics cannot save lives.  
> 
> RAKSHA calculates the full **Humanitarian Fleet Mobilization**: 42 state transport buses (50-seaters), 6 ALS/BLS triage ambulances, 102,600 liters per day of potable water, and 680 family tent units.
>
> With one click on **'Download PDF Order'**, RAKSHA compiles an official statutory directive under **Section 34 of the Disaster Management Act, 2005**, complete with GPS coordinates, capacity quotas, and commanding authority signatures ready for dispatch to the SDRF and NDRF.
>
> In summary: **Sentinel-1 detects the hazard. Sentinel-2 provides environmental context. Cartosat-3 validates ground reality. Bhuvan anchors statutory zoning. And RAKSHA transforms all of it into immediate, explainable, life-saving relocation action.**  
>
> Thank you. We are now open for your questions."*

---

## 🧠 Judge Q&A Defense Guide

| Anticipated Question | Rapid 15-Second Defense |
| :--- | :--- |
| **Q1: "What if heavy rain and monsoon clouds block satellite optical cameras?"** | *"That is precisely why we ingest **Sentinel-1 C-Band SAR radar**. SAR uses active microwave signals (5.4 GHz) that penetrate through torrential rain, cloud cover, and nighttime smoke, detecting floodwater backscatter drop regardless of weather."* |
| **Q2: "How do you ensure you aren't overcrowding relocation centers?"** | *"We strictly compute capacity using **Sphere Humanitarian Standards (2018)**: 45 m² total settlement space and 3.5 m² covered shelter space per capita. Our greedy multi-site allocation spreads excess populations across secondary and tertiary 5km rings."* |
| **Q3: "Can a high-scoring site still be selected if it has high landslide risk?"** | *"No. RAKSHA enforces **Zero-Tolerance Hard Vetoes**. Safety criteria are boolean gatekeepers, not weighted scores. If slope exceeds 14° or active inundation is detected, the site score is nullified to 0 and eliminated."* |
| **Q4: "Why include Cartosat-3 and Bhuvan when Sentinel is globally available?"** | *"Global feeds are 10m to 30m resolution. **ISRO Cartosat-3 gives 0.28m sub-meter clarity** to inspect ingress roads and helipads, while **ISRO Bhuvan provides authoritative Indian cadastral tenure and 1:50k LULC** required for District Magistrate requisition."* |
| **Q5: "Is the PDF export just a print dialog?"** | *"No, it uses a bundled client-side PDF document compiler (`html2pdf.js`) that directly compiles vector DOM elements into a clean, A4-formatted statutory executive directive under NDMA Act §34 with zero server latency."* |

---

## 🚀 Live Demo Quick Reference Links (Port 8050)
- **1. Landing Page:** [http://127.0.0.1:8050/](http://127.0.0.1:8050/)
- **2. Overview Command Center:** [http://127.0.0.1:8050/overview](http://127.0.0.1:8050/overview)
- **3. EO Studio:** [http://127.0.0.1:8050/eo-studio](http://127.0.0.1:8050/eo-studio)
- **4. Relocation Engineering Studio:** [http://127.0.0.1:8050/relocation](http://127.0.0.1:8050/relocation)
- **5. DDMA Executive Dossier:** [http://127.0.0.1:8050/ddma](http://127.0.0.1:8050/ddma)
