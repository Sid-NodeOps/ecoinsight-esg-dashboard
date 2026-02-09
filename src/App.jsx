import React, { useState } from 'react';
import { buildings, getLEEDRecommendations, calculateOverallScore } from './data/buildings';
import BuildingSelector from './components/BuildingSelector';
import BuildingProfile from './components/BuildingProfile';
import EnergyMetrics from './components/EnergyMetrics';
import ESGScoreGauge from './components/ESGScoreGauge';
import LEEDRecommendations from './components/LEEDRecommendations';

function App() {
  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0]);
  const recommendations = getLEEDRecommendations(selectedBuilding);
  const overallScore = calculateOverallScore(selectedBuilding.metrics);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg shadow-emerald-500/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ESG Building Dashboard</h1>
                <p className="text-xs text-gray-500">Energy Efficiency Analytics</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                <span className="w-2 h-2 bg-emerald-500 rounded-full pulse-dot"></span>
                <span className="text-sm font-medium text-emerald-700">Live Data</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Last updated:</span>
                <span className="text-sm font-medium text-gray-700">
                  {new Date().toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Building Selector */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <BuildingSelector
                buildings={buildings}
                selectedBuilding={selectedBuilding}
                onSelectBuilding={setSelectedBuilding}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-8">
            {/* Building Profile & ESG Score Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <BuildingProfile building={selectedBuilding} />
              </div>
              <div className="xl:col-span-1">
                <ESGScoreGauge score={overallScore} />
              </div>
            </div>

            {/* Energy Metrics */}
            <EnergyMetrics metrics={selectedBuilding.metrics} />

            {/* LEED Recommendations */}
            <LEEDRecommendations recommendations={recommendations} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
              <span>ESG Building Analytics Platform</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-gray-500">Data aligned with</span>
              <span className="font-semibold text-emerald-600">LEED v4.1</span>
              <span className="text-gray-500">|</span>
              <span className="font-semibold text-blue-600">ENERGY STAR</span>
              <span className="text-gray-500">|</span>
              <span className="font-semibold text-purple-600">ASHRAE 90.1</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;