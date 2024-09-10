import { useAuth0 } from '@auth0/auth0-react'

import useProfile from '../hooks/useProfile'
import '../styles/userprofile.css'
import useTrips from '../hooks/useTrip'
export default function UserProfile() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  // const auth0Id = user?.sub; // Auth0 unique identifier for the user

  // Fetch trips associated with the logged-in user

  const { data, isLoading, isError, error } = useTrips(getAccessTokenSilently)
  if (!isAuthenticated || !user) {
    return <div>Please log in</div>
  }

  return (
    <div className="mainBody">
      <h2>{user.name}</h2>
      <img src={user.picture} alt={user.name} className="user-image" />
      <p>Email: {user.email}</p>
      <p>User ID: {user.sub}</p>

      {isLoading && <p>Loading trips...</p>}
      {isError && <p>Error fetching trips: {(error as Error).message}</p>}
      {!data ? (
        <p>No trip </p>
      ) : (
        <ul>
          {Object.keys(data.trips[0]).map((trip) => (
            <li key={trip}>
              <strong>{trip}</strong>
            </li>
          ))}
        </ul>
      )}
      {/* {data.trips && data.trips[0].length > 0 ? (
        <ul>
          {Object.keys(data.trips[0]).map((trip) => (
            <li key={trip}>
              <strong>{trip}</strong>
            </li>
          ))}
        </ul>
      ) : (
        null
      )} */}
    </div>
  )
}
