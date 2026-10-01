import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import BeyondUX from './pages/BeyondUX'
import CopilotInDataFactory from './pages/projects/CopilotInDataFactory'
import DbtJob from './pages/projects/DbtJob'
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
        <Route path="/projects/dbt-job" element={<DbtJob />} />
        <Route path="/projects/copilot-in-data-factory" element={<CopilotInDataFactory />} />
        <Route path="/projects/clover-designer" element={<CloverDesigner />} />
        <Route path="/projects/ar-anchor-cards" element={<ARAnchorCards />} />
        <Route path="/deck" element={<Deck />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
