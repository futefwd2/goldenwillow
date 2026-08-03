
import './App.css'
import EntrancePageGoldenWillows from './GoldenWillows/EntrancePageGoldenWillows.tsx'
import ProjectHighlights_Gold from './GoldenWillows/ProjectHighlights_Gold.tsx'
import NabarGoldenWillows from './components/NavbarGoldenWillows.tsx'
import LocationPage_Gold from './GoldenWillows/LocationPage_Gold.tsx';
import ProjectStatus_Golden from './GoldenWillows/ProjectStatus_Golden.tsx'
import GalleryPageGolden from './GoldenWillows/GalleryPageGolden.tsx'
import GoldenWillowsLayout from './GoldenWillows/GoldenWillowsLayout.tsx'
import ProjectDetailsPage from './GoldenWillows/ProjectDetailsPage.tsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import MainTowerPage from './GoldenWillows/Towers_Golden/MainTowerPage.tsx'
import FloorPage from './GoldenWillows/Towers_Golden/FloorPage.tsx'
import UnitPage from './GoldenWillows/Towers_Golden/UnitPage.tsx'
import JodiUnit from './GoldenWillows/Towers_Golden/JodiUnit.tsx'
import IrisFloorPage from './GoldenWillows/iris_tower/FloorPage.tsx'
import IrisUnitPage from './GoldenWillows/iris_tower/UnitPage.tsx'
import IrisJodiUnit from './GoldenWillows/iris_tower/JodiUnit.tsx'
import Jasmine from './components/project_detail/jasmine.tsx'
import Lavender from './components/project_detail/lavender.tsx'
import Iris from './components/project_detail/iris.tsx';
import Aster from './components/project_detail/aster.tsx'
import Zenia from './components/project_detail/zenia.tsx'


function App() {
  const location = useLocation();

  const showNavbarGoldenWillows = ["/", "/project_highlights", "/location",
    "/project_status", "/projectdetails", "/Jasmine", "/Lavender", "/iris", "/Aster", "/Zenia"];

  const GoldenWillowsNav = showNavbarGoldenWillows.includes(location.pathname) || location.pathname.startsWith("/tower_goldenwillows/");
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
        <Route path="/iris" element={<Iris />} />
        <Route path="/Aster" element={<Aster />} />
        <Route path="/Zenia" element={<Zenia />} />

        <Route path="/tower_goldenwillows/:towerId" element={<MainTowerPage />} />
        <Route path="/golden_floor/:id" element={<FloorPage />} />
        <Route path="/golden_unit/:id" element={<UnitPage />} />
        <Route path="/golden_jodi/:id" element={<JodiUnit />} />

        {/* Jasmine Tower */}
        <Route path="/jasmine_floor/:id" element={<FloorPage />} />
        <Route path="/jasmine_unit/:id" element={<UnitPage />} />
        <Route path="/jasmine_jodi/:id" element={<JodiUnit />} />

        {/* Lavender Tower */}
        <Route path="/lavender_floor/:id" element={<FloorPage />} />
        <Route path="/lavender_unit/:id" element={<UnitPage />} />
        <Route path="/lavender_jodi/:id" element={<JodiUnit />} />

        {/* Aster Tower */}
        <Route path="/aster_floor/:id" element={<FloorPage />} />
        <Route path="/aster_unit/:id" element={<UnitPage />} />
        <Route path="/aster_jodi/:id" element={<JodiUnit />} />

        {/* Zenia Tower */}
        <Route path="/zenia_floor/:id" element={<FloorPage />} />
        <Route path="/zenia_unit/:id" element={<UnitPage />} />
        <Route path="/zenia_jodi/:id" element={<JodiUnit />} />

        <Route path="/iris_floor/:id" element={<IrisFloorPage />} />
        <Route path="/iris_unit/:id" element={<IrisUnitPage />} />
        <Route path="/iris_jodi/:id" element={<IrisJodiUnit />} />


      </Routes>
      {GoldenWillowsNav && <NabarGoldenWillows />}
    </>
  )
}

export default App
