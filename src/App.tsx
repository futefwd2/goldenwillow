
import './App.css'
import EntrancePageGoldenWillows from './GoldenWillows/EntrancePageGoldenWillows.tsx'
import ProjectHighlights_Gold from './GoldenWillows/ProjectHighlights_Gold.tsx'
import NabarGoldenWillows from './components/NavbarGoldenWillows.tsx'
import LocationPage_Gold from './GoldenWillows/LocationPage_Gold.tsx';
import ProjectStatus_Golden from './GoldenWillows/ProjectStatus_Golden.tsx'
import GalleryPageGolden from './GoldenWillows/GalleryPageGolden.tsx'
import GoldenWillowsLayout from './GoldenWillows/GoldenWillowsLayout.tsx'
import ProjectDetailsPage from './GoldenWillows/ProjectDetailsPage.tsx'
import { Routes, Route } from 'react-router-dom'
import MainTowerPage from './GoldenWillows/Towers_Golden/MainTowerPage.tsx'
import FloorPage from './GoldenWillows/Towers_Golden/FloorPage.tsx'
import UnitPage from './GoldenWillows/Towers_Golden/UnitPage.tsx'
import JodiUnit from './GoldenWillows/Towers_Golden/JodiUnit.tsx'
import Jasmine from './components/project_detail/jasmine.tsx'
import Lavender from './components/project_detail/lavender.tsx'

function App() {

  const showNavbarGoldenWillows = ["/", "/project_highlights", "/location",
    "/project_status", "/projectdetails", "/Jasmine", "/Lavender"];

  const GoldenWillowsNav = showNavbarGoldenWillows.includes(location.pathname);
  return (
    <>

      <Routes>
        {/* GoldenWillows */}
        <Route path="/" element={<EntrancePageGoldenWillows />} />
        <Route path="/project_highlights" element={<ProjectHighlights_Gold />} />
        <Route path="/location" element={<LocationPage_Gold />} />
        <Route path="/project_status" element={<ProjectStatus_Golden />} />
        <Route path="/gallery" element={<GalleryPageGolden />} />
        <Route path="/goldenwillowslayout" element={<GoldenWillowsLayout />} />
        <Route path="/projectdetails" element={<ProjectDetailsPage />} />
        <Route path="/Jasmine" element={<Jasmine />} />
        <Route path="/Lavender" element={<Lavender />} />

        <Route path="/tower_goldenwillows/:towerId" element={<MainTowerPage />} />
        <Route path="/golden_floor/:id" element={<FloorPage />} />
        <Route path="/golden_unit/:id" element={<UnitPage />} />
        <Route path="/golden_jodi/:id" element={<JodiUnit />} />


      </Routes>
      {GoldenWillowsNav && <NabarGoldenWillows />}
    </>
  )
}

export default App
