import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav>
      <h1>Navigation: </h1>
      <NavLink to="/user">User</NavLink>
      <NavLink to="/itineraries">Itineraries</NavLink>
      <NavLink to="/explore">Explore</NavLink>
    </nav>
  )
}
