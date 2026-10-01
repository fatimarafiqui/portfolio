import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import BeyondUX from './pages/BeyondUX'
import DataFactoryAgent from './pages/projects/DataFactoryAgent'
import UnifiedFabricCopilot from './pages/projects/UnifiedFabricCopilot'
import CloverDesigner from './pages/projects/CloverDesigner'
import ARAnchorCards from './pages/projects/ARAnchorCards'
import Deck from './pages/Deck'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/beyond-ux" element={<BeyondUX />} />
        <Route path="/projects/data-factory-agent" element={<DataFactoryAgent />} />
        <Route path="/projects/unified-fabric-copilot" element={<UnifiedFabricCopilot />} />
        <Route path="/projects/clover-designer" element={<CloverDesigner />} />
        <Route path="/projects/ar-anchor-cards" element={<ARAnchorCards />} />
        <Route path="/deck" element={<Deck />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
