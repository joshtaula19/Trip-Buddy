import { createRoutesFromElements, Route } from 'react-router-dom'
// import App from './components/App.tsx'
import Layout from './components/Layout.tsx'
import Home from './components/Home.tsx'
import UserProfile from './components/UserProfile.tsx'
import MyTrips from './components/MyTrips.tsx'
import ExplorerPage from './components/ExplorerPage.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    
    <Route path="/profile/:auth0Id" element={<UserProfile />} />

    <Route path="/itineraries" element={<MyTrips />} />
    <Route path="/explore" element={<ExplorerPage />} />
  </Route>,
)
