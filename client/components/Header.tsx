import { useAuth0 } from '@auth0/auth0-react'
import User from './User'

export default function Header() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  return (
    <>
      <header>
        <h1>TripBuddy</h1>
        <User />
        <div>
          {!isAuthenticated ? (
            <button onClick={() => loginWithRedirect()}>Log In</button>
          ) : (
            <>
              <br></br>
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </header>
    </>
  )
}