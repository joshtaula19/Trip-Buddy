import { createRoutesFromElements, Route } from 'react-router-dom'
// import App from './components/App.tsx'
import Layout from './components/Layout.tsx'
import Home from './components/Home.tsx'
import Profile from './components/UserProfile.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="/UserProfile" element={<Profile />} />
    <Route index element={<Home />} />
  </Route>,
)
