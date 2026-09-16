import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Printer, FileText, ArrowRight, ArrowDown } from 'lucide-react';
import { useMapState } from '../../context/MapContext';
import { mockApi } from '../../services/mockApi';
import type { Settlement, RelocationSite } from '../../types';
import { cn } from '../../utils/cn';

export const Reports: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedSettlement, setSelectedSettlement } = useMapState();
  const [data, setData] = useState<Settlement | null>(null);
  const [sites, setSites] = useState<RelocationSite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReportData = async () => {
      setLoading(true);
      try {
        const settlementId = id || selectedSettlement.id;
        const [settlementData, candidateSites] = await Promise.all([
          mockApi.getSettlementRisk(settlementId),
          mockApi.getRelocationCandidates(settlementId, 5)
        ]);
        
        setData(settlementData);
        if (settlementData.id !== selectedSettlement.id) {
          setSelectedSettlement(settlementData);
        }

        const hydratedSites = await Promise.all(candidateSites.map(async (site) => {
          const s1 = await mockApi.assessSiteSafety(site.id);
          let s2, s3;
          if (s1 && s1.status === 'eligible') {
            s2 = await mockApi.calculateCapacity(site.id);
            s3 = await mockApi.calculateSiteSuitability(site.id);
          }
          return { ...site, safety: s1, capacity: s2?.capacity, infrastructure: s2?.infrastructure, suitability: s3 };
        }));

        setSites(hydratedSites.filter(s => s.safety?.status === 'eligible').sort((a,b) => (b.suitability?.score || 0) - (a.suitability?.score || 0)));

      } catch (err) {
        console.error("Failed to load report data", err);
      } finally {
        setLoading(false);
      }
    };
    loadReportData();
  }, [id, selectedSettlement.id, setSelectedSettlement]);

  if (loading || !data) return (
    <div className="w-full h-full bg-white text-gray-900 p-8 flex items-center justify-center pointer-events-auto">
      <div className="flex flex-col items-center gap-4">
        <FileText className="w-8 h-8 text-gray-400 animate-pulse" />
        <span className="font-mono text-[10px] tracking-widest uppercase text-gray-500">GENERATING DOCUMENT...</span>
      </div>
    </div>
  );

  const safeCapacity = sites.reduce((acc, s) => acc + (s.capacity?.estimatedSafeCapacity || 0), 0);

  const handlePrint = () => { window.print(); };

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden bg-gray-100 pointer-events-auto relative z-10">

      {/* HEADER BAR — hidden when printing */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 bg-white flex items-center justify-between print:hidden shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-900">REP-2026-{data.id.toUpperCase()}-1739</span>
          <div className="h-4 w-px bg-gray-300" />
          <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">CLASSIFICATION: CONFIDENTIAL</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handlePrint} className="px-3 py-1.5 border border-gray-300 text-gray-600 text-[9px] uppercase font-bold tracking-widest hover:text-gray-900 hover:bg-gray-50 transition-colors">
            <span className="flex items-center gap-2"><Printer className="w-3 h-3" /> Print</span>
          </button>
          <button onClick={handlePrint} className="px-3 py-1.5 border border-gray-900 bg-gray-900 text-white text-[9px] uppercase font-bold tracking-widest hover:bg-gray-800 transition-colors">
            <span className="flex items-center gap-2"><Download className="w-3 h-3" /> Export PDF</span>
          </button>
        </div>
      </div>

      {/* DOCUMENT PREVIEW */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-100 p-8 md:p-16 print:p-0 print:bg-white">
        <div className="max-w-4xl mx-auto flex flex-col gap-12 bg-white p-12 border border-gray-200 shadow-xl print:border-none print:shadow-none">

          {/* ═══════════════════ DOC HEADER ═══════════════════ */}
          <div className="flex flex-col gap-4 border-b-2 border-gray-900 pb-8">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold tracking-[0.2em] uppercase text-gray-900">RAKSHA</span>
              <span className="text-sm font-mono text-gray-500">15 SEP 2026</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-900">RELOCATION INTELLIGENCE DOSSIER</span>
              <h1 className="text-3xl font-bold uppercase text-gray-900 tracking-wide mt-2">{data.name} — MULTI-HAZARD ASSESSMENT</h1>
            </div>
            <div className="grid grid-cols-6 gap-4 mt-6">
              <HdrMeta label="TARGET" value={data.name} />
              <HdrMeta label="DISTRICT" value={data.district} />
              <HdrMeta label="STATE" value={data.state} />
              <HdrMeta label="DATE" value="15 SEP 2026" />
              <HdrMeta label="TYPE" value="RELOCATION INTEL" />
              <HdrMeta label="STATUS" value="IMMEDIATE" accent />
            </div>
          </div>

          {/* ═══════════════════ EXECUTIVE SUMMARY ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>Executive Decision Summary</SectionHead>
            <p className="text-sm font-mono text-gray-700 leading-relaxed">
              RAKSHA identifies <strong className="text-gray-900">{data.name.toUpperCase()}, {data.district.toUpperCase()}</strong> as a high-priority habitation requiring immediate relocation assessment due to elevated multi-hazard exposure, significant population exposure ({data.populationExposed.toLocaleString()} estimated), and an estimated long recovery period (8–12 months).
            </p>
            <div className="grid grid-cols-6 gap-4 mt-2">
              <StatBox label="POPULATION" value={data.populationExposed.toLocaleString()} />
              <StatBox label="RISK SCORE" value={`${data.riskScore}/100`} sub="CRITICAL" color="danger" />
              <StatBox label="IMPACT SCORE" value={`${data.impactScore}/100`} sub="HIGH" color="amber" />
              <StatBox label="RECOVERY" value="8–12 MO" sub="LONG" color="amber" />
              <StatBox label="PRIORITY" value="IMMEDIATE" color="danger" />
              <StatBox label="COVERAGE" value="100%" color="green" />
            </div>
          </div>

          {/* ═══════════════════ 01. HABITATION & HAZARD ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>01 — Habitation & Hazard Profile</SectionHead>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              <DataRow label="TARGET HABITATION" value={data.name.toUpperCase()} />
              <DataRow label="LOCATION" value={`${data.district}, ${data.state}`} />
            </div>
            <div className="mt-4">
              <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500 mb-3 block">PRIMARY HAZARDS</span>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                <HazardRow label="FLOOD" level="HIGH" />
                <HazardRow label="LANDSLIDE" level="HIGH" />
                <HazardRow label="RAINFALL-DRIVEN SATURATION" level="HIGH" />
                <HazardRow label="TERRAIN SUSCEPTIBILITY" level="HIGH" />
                <HazardRow label="HISTORICAL RECURRENCE" level="ELEVATED" isElevated />
              </div>
            </div>
            <p className="text-sm font-mono text-gray-500 leading-relaxed mt-4">
              The habitation is assessed against multiple interacting hazard factors including flood susceptibility, landslide susceptibility, rainfall conditions, terrain characteristics and historical hazard evidence. The combined assessment produces a high-risk profile rather than relying on a single hazard layer.
            </p>
          </div>

          {/* ═══════════════════ 02. RISK ASSESSMENT ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>02 — Risk Assessment</SectionHead>
            <div className="flex items-center gap-6 mb-2">
              <div className="flex flex-col items-center gap-1 bg-gray-50 border border-gray-200 px-6 py-4">
                <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500">OVERALL RISK</span>
                <span className="text-4xl font-bold font-mono text-red-600">{data.riskScore}</span>
                <span className="text-[10px] font-mono text-gray-400">/ 100</span>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-1">
                <HazardRow label="FLOOD EXPOSURE" level="HIGH" />
                <HazardRow label="LANDSLIDE SUSCEPTIBILITY" level="HIGH" />
                <HazardRow label="RAINFALL INFLUENCE" level="HIGH" />
                <HazardRow label="TERRAIN / SLOPE" level="HIGH" />
                <HazardRow label="HISTORICAL HAZARD EVIDENCE" level="ELEVATED" isElevated />
                <HazardRow label="POPULATION EXPOSURE" level="HIGH" />
                <HazardRow label="INFRASTRUCTURE EXPOSURE" level="SIGNIFICANT" isElevated />
              </div>
            </div>
            <p className="text-[11px] font-mono text-gray-500 italic leading-relaxed">
              <strong className="text-gray-700">RISK INTERPRETATION:</strong> RAKSHA's risk score represents an explainable aggregation of hazard and exposure indicators. It is a decision-support score and should not be interpreted as a guaranteed prediction of disaster occurrence.
            </p>
          </div>

          {/* ═══════════════════ 03. POPULATION & ASSET EXPOSURE ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>03 — Population & Asset Exposure</SectionHead>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <DataRow label="ESTIMATED EXPOSED POPULATION" value={data.populationExposed.toLocaleString()} large />
                <div className="flex flex-col gap-1 mt-2">
                  <ExpRow label="HIGH / CRITICAL EXPOSURE" value="4,980" pct="73%" color="danger" />
                  <ExpRow label="MODERATE EXPOSURE" value="1,860" pct="27%" color="amber" />
                  <ExpRow label="LOW / SAFE" value="0" pct="" color="green" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500">PHYSICAL EXPOSURE</span>
                <div className="flex flex-col gap-1 mt-1">
                  <ExpRow label="BUILDINGS" value="1,420" />
                  <ExpRow label="HABITATIONS" value="4" />
                  <ExpRow label="CRITICAL INFRASTRUCTURE" value="17" />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-4 mt-2">
              <p className="text-[11px] font-mono text-gray-600 leading-relaxed">
                Approximately 4,980 people fall within the high/critical exposure category and therefore require priority assessment. This does not by itself constitute an automatic evacuation order.
              </p>
            </div>
          </div>

          {/* ═══════════════════ 04. IMPACT ASSESSMENT ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>04 — Impact Assessment</SectionHead>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500">IMPACT SCORE</span>
              <span className="text-2xl font-bold font-mono text-orange-600">{data.impactScore}</span>
              <span className="text-[10px] font-mono text-gray-400">/ 100</span>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 text-[9px] font-bold tracking-widest text-gray-500 uppercase">FACTOR</th>
                  <th className="py-2 text-[9px] font-bold tracking-widest text-gray-500 uppercase">ASSESSMENT</th>
                  <th className="py-2 text-[9px] font-bold tracking-widest text-gray-500 uppercase text-right">SIGNIFICANCE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <ImpactRow factor="Population exposure" assessment="6,840" sig="HIGH" />
                <ImpactRow factor="Building exposure" assessment="1,420" sig="HIGH" />
                <ImpactRow factor="Critical infrastructure" assessment="17" sig="SIGNIFICANT" isAmber />
                <ImpactRow factor="Hazard intensity" assessment="Elevated" sig="HIGH" />
                <ImpactRow factor="Road accessibility" assessment="Constrained" sig="MODERATE/HIGH" isAmber />
                <ImpactRow factor="Terrain vulnerability" assessment="High" sig="HIGH" />
              </tbody>
            </table>
            <p className="text-[11px] font-mono text-gray-500 leading-relaxed">
              The impact assessment combines population exposure, physical assets, infrastructure, hazard intensity, terrain and accessibility to estimate the severity of potential disruption.
            </p>
          </div>

          {/* ═══════════════════ 05. RECOVERY & RELOCATION URGENCY ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>05 — Recovery & Relocation Urgency</SectionHead>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-200 p-6 text-center">
                <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500">ESTIMATED RECOVERY DURATION</span>
                <span className="text-3xl font-bold font-mono text-gray-900 mt-2">8–12 MONTHS</span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-orange-600 mt-2">CLASSIFICATION: LONG</span>
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <HazardRow label="DAMAGE / HAZARD SEVERITY" level="HIGH" />
                <HazardRow label="INFRASTRUCTURE EXPOSURE" level="SIGNIFICANT" isElevated />
                <HazardRow label="ROAD ACCESSIBILITY" level="CONSTRAINED" isElevated />
                <HazardRow label="HAZARD PERSISTENCE" level="ELEVATED" isElevated />
                <HazardRow label="HISTORICAL RECOVERY SIGNAL" level="LONG" isElevated />
              </div>
            </div>
            <div className="flex items-center justify-between bg-red-50 border border-red-200 p-4 mt-2">
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-700">RELOCATION PRIORITY</span>
              <span className="text-xl font-bold font-mono tracking-widest uppercase text-red-600">IMMEDIATE</span>
            </div>
            <p className="text-[11px] font-mono text-gray-500 italic">
              The recovery duration is an estimated decision-support classification derived from hazard severity, infrastructure exposure, accessibility, hazard persistence and historical recovery indicators. It is not an authoritative prediction of exact recovery time.
            </p>
          </div>

          {/* ═══════════════════ 06. RELOCATION SEARCH STRATEGY ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>06 — Relocation Search Strategy</SectionHead>
            <div className="flex items-center gap-3 flex-wrap bg-gray-50 border border-gray-200 p-6 justify-center">
              <StepBox text="DEVGRAM" active />
              <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
              <StepBox text="AOI 2×2 KM" isDanger />
              <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
              <StepBox text="SEARCH +5 KM" />
              <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
              <StepBox text="CANDIDATES" />
              <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
              <StepBox text="SAFETY FILTER" isGreen />
              <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
              <StepBox text="RECOMMENDATION" active />
            </div>
            <p className="text-sm font-mono text-gray-500 leading-relaxed">
              RAKSHA prioritizes safety first and does not blindly select the nearest available site. If the initial search region cannot provide sufficient safe relocation capacity, the search expands progressively:
            </p>
            <div className="flex items-center gap-3 font-mono font-bold text-sm justify-center py-2 text-gray-900">
              <span>5 KM</span> <ArrowRight className="w-3 h-3 text-gray-400" /> 
              <span>10 KM</span> <ArrowRight className="w-3 h-3 text-gray-400" /> 
              <span>15 KM</span> <ArrowRight className="w-3 h-3 text-gray-400" /> 
              <span className="text-gray-400">MAX SEARCH LIMIT</span>
            </div>
            <p className="text-[11px] font-mono text-gray-500">
              The search expands only when the existing candidate set cannot satisfy minimum safety and capacity requirements.
            </p>
          </div>

          {/* ═══════════════════ 07. SUITABILITY MODEL ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>07 — Relocation Suitability Model</SectionHead>
            <div className="grid grid-cols-6 gap-4">
              <ModelWeight label="SAFETY / HAZARD" weight="30%" />
              <ModelWeight label="POPULATION CAPACITY" weight="25%" />
              <ModelWeight label="DISTANCE / ACCESS" weight="15%" />
              <ModelWeight label="INFRASTRUCTURE" weight="15%" />
              <ModelWeight label="LAND SUITABILITY" weight="10%" />
              <ModelWeight label="ENVIRONMENT" weight="5%" />
            </div>
            <p className="text-[11px] font-mono text-gray-500">
              Safety is treated as the dominant criterion. A closer site is not preferred if its hazard or capacity characteristics are unsuitable. Total: 100%.
            </p>
          </div>

          {/* ═══════════════════ 08. CANDIDATE SITE ANALYSIS ═══════════════════ */}
          <div className="flex flex-col gap-6">
            <SectionHead>08 — Candidate Site Analysis</SectionHead>
            {sites.map((site, idx) => (
              <div key={site.id} className="flex flex-col border border-gray-300">
                <div className="flex justify-between items-center bg-gray-900 px-4 py-3 border-b border-gray-300">
                  <span className="text-sm font-bold tracking-widest uppercase text-white">{site.name}</span>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-cyan-400">RANK {String(idx + 1).padStart(2, '0')}</span>
                </div>
                <div className="p-4 grid grid-cols-2 gap-x-8 gap-y-3">
                  <DataRow label="DISTANCE" value={`${site.distanceFromDevgram} KM`} />
                  <DataRow label="SUITABILITY SCORE" value={`${site.suitability?.score} / 100`} accent />
                  <DataRow label="EST. SAFE CAPACITY" value={`${site.capacity?.estimatedSafeCapacity.toLocaleString()} PEOPLE`} />
                  <DataRow label="USABLE AREA" value={`${site.capacity?.usableArea.toLocaleString()} SQM`} />
                  <DataRow label="ROAD ACCESSIBILITY" value={site.infrastructure?.roadAccess?.toUpperCase() || 'N/A'} />
                  <DataRow label="NEAREST HOSPITAL" value={`${site.infrastructure?.nearestHospitalKm} KM`} />
                  <DataRow label="FLOOD EXPOSURE" value={site.safety?.floodExposure?.toUpperCase() || 'N/A'} />
                  <DataRow label="LANDSLIDE RISK" value={site.safety?.landslideExposure?.toUpperCase() || 'N/A'} />
                  <DataRow label="TERRAIN" value={site.safety?.terrainSuitability?.toUpperCase() || 'N/A'} />
                </div>
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500 block mb-2">SCORING BREAKDOWN</span>
                  <div className="grid grid-cols-6 gap-4 text-center">
                    <ScoreCol label="SAFETY" value={site.suitability?.factors.safety} max={30} />
                    <ScoreCol label="CAPACITY" value={site.suitability?.factors.capacity} max={25} />
                    <ScoreCol label="ACCESS" value={site.suitability?.factors.accessibility} max={15} />
                    <ScoreCol label="INFRA" value={site.suitability?.factors.infrastructure} max={15} />
                    <ScoreCol label="LAND" value={site.suitability?.factors.land} max={10} />
                    <ScoreCol label="ENV" value={site.suitability?.factors.environment} max={5} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ═══════════════════ 09. REJECTED CANDIDATES ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>09 — Rejected / Unsuitable Candidates</SectionHead>
            <div className="border border-gray-300">
              <div className="flex justify-between items-center bg-gray-100 px-4 py-3 border-b border-gray-300">
                <span className="text-sm font-bold tracking-widest uppercase text-gray-700">SITE D</span>
                <span className="text-[9px] font-bold tracking-widest uppercase text-red-600">STATUS: REJECTED</span>
              </div>
              <div className="p-4">
                <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500 block mb-2">REASONS:</span>
                <ul className="list-disc pl-5 flex flex-col gap-1">
                  <li className="text-sm font-mono text-gray-700">HIGH LANDSLIDE EXPOSURE</li>
                  <li className="text-sm font-mono text-gray-700">UNSUITABLE TERRAIN</li>
                  <li className="text-sm font-mono text-gray-700">LIMITED EMERGENCY ACCESS</li>
                </ul>
                <p className="text-[11px] font-mono text-gray-500 mt-3">
                  The candidate was excluded before final ranking because it failed minimum safety / suitability requirements.
                </p>
              </div>
            </div>
          </div>

          {/* ═══════════════════ 10. FINAL RECOMMENDATION ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>10 — Final Relocation Recommendation</SectionHead>
            <div className="bg-gray-900 border border-gray-900 p-8 flex flex-col items-center text-center gap-4">
              <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400">RECOMMENDED RELOCATION PLAN</span>
              <h2 className="text-2xl font-bold tracking-widest uppercase text-cyan-400">
                {sites.slice(0,2).map(s => s.name).join(' + ')}
              </h2>
              <div className="flex items-center justify-center gap-6 text-sm font-mono font-bold tracking-widest uppercase mt-2 text-white">
                {sites.slice(0,2).map((s, i) => (
                  <React.Fragment key={s.id}>
                    {i > 0 && <span className="text-gray-600">+</span>}
                    <div className="flex flex-col items-center gap-1">
                      <span>{s.name}</span>
                      <span className="text-[10px] text-gray-400">{s.capacity?.estimatedSafeCapacity.toLocaleString()} PEOPLE</span>
                    </div>
                  </React.Fragment>
                ))}
                <span className="text-gray-600">=</span>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-cyan-400">TOTAL</span>
                  <span className="text-[10px] text-gray-400">{safeCapacity.toLocaleString()} PEOPLE</span>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 mt-2" />
              <div className="flex flex-col items-center gap-1 mt-1">
                <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400">ESTIMATED COVERAGE</span>
                <span className="text-xl font-bold font-mono text-green-400">100%</span>
              </div>
            </div>
            <p className="text-sm font-mono text-gray-600 leading-relaxed">
              RAKSHA recommends a combined relocation strategy using {sites[0]?.name} as the primary relocation destination and {sites[1]?.name} as the secondary destination. Together, the sites provide approximately {safeCapacity.toLocaleString()} estimated safe relocation capacity, matching the estimated exposed population for the current assessment scenario.
            </p>
          </div>

          {/* ═══════════════════ 11. DECISION JUSTIFICATION ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>11 — Decision Justification</SectionHead>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <JustRow num="1" title="SAFETY" text="Both recommended sites show low flood exposure and low landslide risk in the current assessment." />
              <JustRow num="2" title="CAPACITY" text={`Combined estimated safe capacity is approximately ${safeCapacity.toLocaleString()}.`} />
              <JustRow num="3" title="ACCESSIBILITY" text="Both sites have good road accessibility." />
              <JustRow num="4" title="TERRAIN" text="Both sites have favorable terrain characteristics." />
              <JustRow num="5" title="DISTANCE" text="Both remain within the initial search region." />
              <JustRow num="6" title="ROBUSTNESS" text="Using two sites avoids dependence on a single relocation location." />
            </div>
            <div className="bg-red-50 border border-red-200 p-4 mt-2">
              <span className="text-[9px] font-bold tracking-widest uppercase text-red-700 block mb-2">WHY NOT SITE D?</span>
              <p className="text-sm font-mono text-gray-700">
                High landslide exposure + unsuitable terrain + limited emergency access. Therefore excluded.
              </p>
            </div>
          </div>

          {/* ═══════════════════ 12. SCENARIO SENSITIVITY ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>12 — Scenario Sensitivity</SectionHead>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 border border-gray-200 p-4 flex flex-col gap-2">
                <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500 border-b border-gray-200 pb-2">BASELINE (0% ANOMALY)</span>
                <SensRow label="RISK" value="91" />
                <SensRow label="EXPOSURE" value="6,840" />
                <SensRow label="SAFE SITES" value="3" />
                <SensRow label="CAPACITY" value="9,640" />
                <SensRow label="COVERAGE" value="100%" accent />
              </div>
              <div className="bg-orange-50 border border-orange-200 p-4 flex flex-col gap-2">
                <span className="text-[9px] font-bold tracking-widest uppercase text-orange-600 border-b border-orange-200 pb-2">SIMULATED: 20% ANOMALY</span>
                <p className="text-[11px] font-mono text-gray-600">• Risk increases.</p>
                <p className="text-[11px] font-mono text-gray-600">• Exposure increases.</p>
                <p className="text-[11px] font-mono text-gray-600">• Nearby safe capacity may decrease.</p>
                <p className="text-[11px] font-mono text-gray-600">• Adaptive search may activate.</p>
              </div>
              <div className="bg-red-50 border border-red-200 p-4 flex flex-col gap-2">
                <span className="text-[9px] font-bold tracking-widest uppercase text-red-600 border-b border-red-200 pb-2">SIMULATED: 50% ANOMALY</span>
                <p className="text-[11px] font-mono text-gray-600">• Extreme simulated escalation.</p>
                <p className="text-[11px] font-mono text-gray-600">• Larger hazard footprint.</p>
                <p className="text-[11px] font-mono text-gray-600">• Reduced nearby capacity.</p>
                <p className="text-[11px] font-mono text-gray-600">• Potential search-radius expansion.</p>
              </div>
            </div>
            <p className="text-[11px] font-mono text-gray-500 italic">
              This simulation is intended to stress-test the relocation strategy and is not a deterministic prediction of future rainfall or disaster occurrence.
            </p>
          </div>

          {/* ═══════════════════ 13. DECISION TRACE ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>13 — Decision Trace</SectionHead>
            <div className="flex flex-col items-center gap-1.5 py-6 bg-gray-50 border border-gray-200">
              <TraceChip text="HAZARD" />
              <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
              <TraceChip text="RISK 91" color="danger" />
              <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
              <TraceChip text="EXPOSED POPULATION 6,840" />
              <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
              <TraceChip text="IMPACT 84" color="danger" />
              <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
              <TraceChip text="RECOVERY 8–12 MONTHS" color="amber" />
              <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
              <TraceChip text="PRIORITY IMMEDIATE" color="danger" />
              <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
              <TraceChip text="AOI 2 × 2 KM" />
              <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
              <TraceChip text="SEARCH +5 KM" />
              <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
              <TraceChip text="CANDIDATE SITES" />
              <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
              <TraceChip text="SAFETY FILTER" />
              <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
              <TraceChip text="CAPACITY CHECK" />
              <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
              <TraceChip text="SITE RANKING" />
              <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
              <TraceChip text={`${sites[0]?.name} + ${sites[1]?.name}`} active />
              <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
              <TraceChip text={`${safeCapacity.toLocaleString()} ESTIMATED CAPACITY`} />
              <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
              <TraceChip text="100% ESTIMATED COVERAGE" color="green" />
            </div>
          </div>

          {/* ═══════════════════ 14. DATA & EVIDENCE SOURCES ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>14 — Data & Evidence Sources</SectionHead>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 text-[9px] font-bold tracking-widest text-gray-500 uppercase">SOURCE</th>
                  <th className="py-2 text-[9px] font-bold tracking-widest text-gray-500 uppercase">ROLE IN ASSESSMENT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <EvidenceRow src="Bhuvan / NRSC" role="Hazard, terrain, land-use and geospatial evidence" />
                <EvidenceRow src="NDEM" role="National disaster geospatial / decision-support context" />
                <EvidenceRow src="Satellite / Earth Observation" role="Spatial validation and land / built-up assessment" />
                <EvidenceRow src="DEM / Terrain" role="Elevation, slope and terrain suitability" />
                <EvidenceRow src="Population datasets" role="Population exposure estimation" />
                <EvidenceRow src="Settlement / Built-up data" role="Habitation and building exposure" />
                <EvidenceRow src="Road / Infrastructure data" role="Accessibility and critical infrastructure assessment" />
                <EvidenceRow src="OSM / POI data" role="Candidate-site and infrastructure discovery" />
                <EvidenceRow src="Historical hazard data" role="Recurrence / historical evidence" />
              </tbody>
            </table>
          </div>

          {/* ═══════════════════ 15. ASSUMPTIONS & LIMITATIONS ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>15 — Assumptions & Limitations</SectionHead>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              {[
                'Population figures are estimated decision-support values.',
                'Relocation capacity is estimated safe capacity, not legally certified occupancy.',
                'Recovery duration is an estimated classification, not an exact recovery forecast.',
                'Hazard scores represent modeled / aggregated decision-support indicators.',
                'Site suitability requires field verification before operational relocation.',
                'Environmental, legal, land ownership and access permissions require authoritative verification.',
                'Satellite-derived or mapped site characteristics should be validated before final action.',
                'Scenario simulation represents what-if analysis and is not a guaranteed disaster prediction.',
              ].map((item, i) => (
                <li key={i} className="text-sm font-mono text-gray-600">{item}</li>
              ))}
            </ul>
          </div>

          {/* ═══════════════════ 16. RECOMMENDED NEXT ACTIONS ═══════════════════ */}
          <div className="flex flex-col gap-4">
            <SectionHead>16 — Recommended Next Actions</SectionHead>
            <div className="flex flex-col gap-2">
              <ActionItem num="01" title="FIELD VALIDATION" desc={`Verify ${sites[0]?.name} and ${sites[1]?.name} physical conditions.`} />
              <ActionItem num="02" title="CAPACITY VALIDATION" desc="Confirm usable area and safe occupancy with authorities." />
              <ActionItem num="03" title="ACCESS CHECK" desc="Verify emergency vehicle access and route reliability." />
              <ActionItem num="04" title="CRITICAL SERVICES" desc="Confirm water, sanitation, healthcare and power availability." />
              <ActionItem num="05" title="LAND / LEGAL CHECK" desc="Verify ownership, permissions and environmental constraints." />
              <ActionItem num="06" title="CONTINGENCY" desc="Prepare expanded search if hazard conditions deteriorate." />
              <ActionItem num="07" title="MONITORING" desc="Continue hazard and exposure assessment as conditions change." />
            </div>
          </div>

          {/* ═══════════════════ FOOTER / SIGN-OFF ═══════════════════ */}
          <div className="mt-12 pt-8 border-t border-gray-300 flex flex-col gap-6">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500">SYSTEM GENERATED</span>
                <span className="text-sm font-bold tracking-widest uppercase text-gray-900">RAKSHA DECISION INTELLIGENCE</span>
                <span className="text-[10px] font-mono text-gray-500 mt-2">ASSESSMENT STATUS: DECISION-SUPPORT OUTPUT</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-48 h-px bg-gray-900" />
                <span className="text-[9px] font-bold tracking-widest uppercase text-gray-700">AUTHORIZING OFFICER</span>
                <span className="text-[9px] font-mono text-gray-500">SIGNATURE & SEAL</span>
                <span className="text-[9px] font-mono text-gray-500 mt-1">DATE: __________________</span>
              </div>
            </div>
            <p className="text-[9px] font-mono text-gray-500 leading-relaxed">
              RAKSHA reports multi-hazard exposure, risk assessment, population exposure, infrastructure analysis and relocation intelligence using geospatial, terrain, satellite and settlement data.
              Suitability scores are decision-support indicators and should be verified by field assessment before operational action.
              Automated recommendations are probabilistic and should be validated by authorized personnel.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   SUB-COMPONENTS — WHITE DOCUMENT STYLE
   ═══════════════════════════════════════════════════════ */

const SectionHead = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500 border-b border-gray-300 pb-2">
    {children}
  </h2>
);

const HdrMeta = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500">{label}</span>
    <span className={cn("text-[11px] font-mono", accent ? "text-red-600 font-bold" : "text-gray-900")}>{value}</span>
  </div>
);

const DataRow = ({ label, value, large, accent }: { label: string; value: string; large?: boolean; accent?: boolean }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500">{label}</span>
    <span className={cn("font-mono", 
      large ? "text-2xl font-bold text-gray-900" : "text-[11px] text-gray-900",
      accent && "text-green-700"
    )}>{value}</span>
  </div>
);

const HazardRow = ({ label, level, isElevated }: { label: string; level: string; isElevated?: boolean }) => (
  <div className="flex justify-between items-center py-1 border-b border-gray-100">
    <span className="text-[10px] font-mono text-gray-700">{label}</span>
    <span className={cn("text-[10px] font-bold font-mono tracking-widest", isElevated ? "text-orange-600" : "text-red-600")}>{level}</span>
  </div>
);

const ExpRow = ({ label, value, pct, color }: { label: string; value: string; pct?: string; color?: string }) => (
  <div className="flex justify-between items-center py-1 border-b border-gray-100">
    <span className="text-[10px] font-mono text-gray-600">{label}</span>
    <div className="flex gap-2 items-center">
      <span className={cn("text-[11px] font-bold font-mono",
        color === 'danger' ? "text-red-600" : color === 'amber' ? "text-orange-600" : color === 'green' ? "text-green-600" : "text-gray-900"
      )}>{value}</span>
      {pct && <span className="text-[9px] font-mono text-gray-400">{pct}</span>}
    </div>
  </div>
);

const StatBox = ({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) => (
  <div className="flex flex-col gap-1.5 bg-gray-50 border border-gray-200 p-3">
    <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500">{label}</span>
    <span className={cn("text-lg font-bold font-mono leading-none",
      color === 'danger' ? "text-red-600" : color === 'amber' ? "text-orange-600" : color === 'green' ? "text-green-600" : "text-gray-900"
    )}>{value}</span>
    {sub && <span className={cn("text-[9px] font-bold tracking-widest",
      color === 'danger' ? "text-red-600" : color === 'amber' ? "text-orange-600" : "text-gray-500"
    )}>{sub}</span>}
  </div>
);

const ImpactRow = ({ factor, assessment, sig, isAmber }: { factor: string; assessment: string; sig: string; isAmber?: boolean }) => (
  <tr>
    <td className="py-2 text-[10px] font-mono text-gray-700">{factor}</td>
    <td className="py-2 text-[10px] font-mono text-gray-700">{assessment}</td>
    <td className={cn("py-2 text-[10px] font-bold font-mono text-right", isAmber ? "text-orange-600" : "text-red-600")}>{sig}</td>
  </tr>
);

const StepBox = ({ text, active, isDanger, isGreen }: { text: string; active?: boolean; isDanger?: boolean; isGreen?: boolean }) => (
  <span className={cn("text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 border",
    active ? "bg-gray-900 border-gray-900 text-white" :
    isDanger ? "bg-red-50 border-red-300 text-red-600" :
    isGreen ? "bg-green-50 border-green-300 text-green-600" :
    "bg-white border-gray-300 text-gray-700"
  )}>{text}</span>
);

const ModelWeight = ({ label, weight }: { label: string; weight: string }) => (
  <div className="flex flex-col items-center gap-1 bg-gray-50 border border-gray-200 p-3 text-center">
    <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500">{label}</span>
    <span className="text-sm font-bold font-mono text-gray-900">{weight}</span>
  </div>
);

const ScoreCol = ({ label, value, max }: { label: string; value?: number; max: number }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[8px] font-bold tracking-widest text-gray-500">{label}</span>
    <span className="text-[11px] font-mono font-bold text-gray-900">{value ?? '–'} / {max}</span>
  </div>
);

const TraceChip = ({ text, active, color }: { text: string; active?: boolean; color?: string }) => (
  <span className={cn("text-[9px] font-bold font-mono tracking-widest uppercase px-4 py-1.5 border min-w-[220px] text-center",
    active ? "bg-gray-900 border-gray-900 text-white" :
    color === 'danger' ? "bg-red-50 border-red-200 text-red-600" :
    color === 'amber' ? "bg-orange-50 border-orange-200 text-orange-600" :
    color === 'green' ? "bg-green-50 border-green-200 text-green-600" :
    "bg-white border-gray-300 text-gray-700"
  )}>{text}</span>
);

const JustRow = ({ num, title, text }: { num: string; title: string; text: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[9px] font-bold tracking-widest uppercase text-gray-500">{num}. {title}</span>
    <span className="text-sm font-mono text-gray-600">{text}</span>
  </div>
);

const SensRow = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="flex justify-between items-center">
    <span className="text-[10px] font-mono text-gray-500">{label}</span>
    <span className={cn("text-[11px] font-mono font-bold", accent ? "text-green-600" : "text-gray-900")}>{value}</span>
  </div>
);

const EvidenceRow = ({ src, role }: { src: string; role: string }) => (
  <tr>
    <td className="py-2 text-[10px] font-mono font-bold text-gray-900">{src}</td>
    <td className="py-2 text-[10px] font-mono text-gray-600">{role}</td>
  </tr>
);

const ActionItem = ({ num, title, desc }: { num: string; title: string; desc: string }) => (
  <div className="flex items-start gap-4 p-3 border border-gray-200 bg-gray-50">
    <span className="text-sm font-bold font-mono text-gray-400">{num}</span>
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-bold tracking-widest uppercase text-gray-900">{title}</span>
      <span className="text-[11px] font-mono text-gray-600">{desc}</span>
    </div>
  </div>
);
