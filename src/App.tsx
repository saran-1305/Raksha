import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MapProvider } from './context/MapContext';
import { MainLayout } from './components/layout/MainLayout';
import { MapContainer } from './components/layout/MapContainer';
import { CommandCenter } from './pages/CommandCenter';
import { HazardIntelligence } from './pages/HazardIntelligence';
import { RelocationPlanning } from './pages/RelocationPlanning';
import { PopulationAnalytics } from './pages/PopulationAnalytics';
import { ScenarioSimulation } from './pages/ScenarioSimulation';
import { Reports } from './pages/Reports';

function App() {
  return (
    <MapProvider>
      <BrowserRouter>
        <MainLayout>
          
          <MapContainer />
          
          <div className="flex-1 h-full min-w-0 relative pointer-events-none">
            <Routes>
              <Route path="/" element={<CommandCenter />} />
              <Route path="/hazard-intelligence/:id?" element={<HazardIntelligence />} />
              <Route path="/relocation-planning/:id?" element={<RelocationPlanning />} />
              <Route path="/population-analytics" element={<PopulationAnalytics />} />
              <Route path="/scenario-simulation" element={<ScenarioSimulation />} />
              <Route path="/reports/:id?" element={<Reports />} />
            </Routes>
          </div>

        </MainLayout>
      </BrowserRouter>
    </MapProvider>
  );
}

export default App;
