import { useAuth0 } from '@auth0/auth0-react'
import User from './User'
import { NavLink } from 'react-router-dom'

export default function Header() {
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  const scrollToSearch = () => {
    const searchElement = document.getElementById('search-container')
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className="header-main">
        <User />
        <div>
          {!isAuthenticated ? (
            <button className="credentials" onClick={() => loginWithRedirect()}>
              Login
            </button>
          ) : (
            <nav>
              <ul className="nav-links">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink onClick={scrollToSearch} to="/itineraries">
                    Itineraries
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={scrollToSearch} to="/explore">
                    Explore
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}

          <div className="main-page-title">
            <h1>TripBuddy</h1>
            <button className="find-activities-btn" onClick={scrollToSearch}>
              Find Activities
            </button>
          </div>
        </div>

        <div id="search-container"></div>
      </header>
    </>
  )
}
