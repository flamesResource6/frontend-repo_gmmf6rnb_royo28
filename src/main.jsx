import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Massagen from './pages/Massagen'
import Wellness from './pages/Wellness'
import Oil from './pages/Oil'
import Sport from './pages/Sport'
import Test from './Test'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}> 
          <Route index element={<Home />} />
          <Route path="massagen" element={<Massagen />} />
          <Route path="wellness" element={<Wellness />} />
          <Route path="oil" element={<Oil />} />
          <Route path="sport" element={<Sport />} />
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
