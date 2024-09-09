import { useAuth0 } from '@auth0/auth0-react'





export default function UserProfile() {
  const { user, isAuthenticated,  getAccessTokenSilently } = useAuth0()
  const auth0Id = user?.sub; // Auth0 unique identifier for the user

  // Fetch trips associated with the logged-in user
  const { data: trips, error, isError, isLoading } = useQuery<UserTrip[]>(
    ['userTrips', auth0Id],
    async () => {
      if (!auth0Id) {
        throw new Error('User ID is not available.')
      }
      const accessToken = await getAccessTokenSilently()
      return fetchUserTrips(auth0Id, accessToken)
    },
    {
      enabled: !!auth0Id // Fetch only if userId is defined
    }
  )
  // const {
  //   data: foundPets,
  //   isError: isError,
  //   isLoading: isLoading,
  // } = useQuery<Found[], Error>({
  //   queryKey: ['found'],
  //   queryFn: fetchFoundPets,
  // })

  if (!isAuthenticated || !user) {
    return <div>Please log in</div>
  }
 
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <img src={user.picture} alt={user.name} className="user-image" />
      <p>Email: {user.email}</p>
      <p>User ID: {user.sub}</p>

      {isLoading && <p>Loading trips...</p>}
      {isError && <p>Error fetching trips: {(error as Error).message}</p>}

      {trips && trips.length > 0 ? (
        <ul>
          {trips.map((trip: UserTrip) => (
              <li key={trip.id}>
              <strong>{trip.trip_name}</strong> - {trip.destination} <br />
              {`Start Date: ${trip.start_date}`} <br />
              {`End Date: ${trip.end_date}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No trips found.</p>
      )}
    </div>
  )
}

// Example Output

// User Name
// [Profile Picture]
// Email: user@example.com
// User ID: auth0|1234567890

// - Trip to Paris - Paris, France
//   Start Date: 2024-09-01
//   End Date: 2024-09-10

// - Trip to Tokyo - Tokyo, Japan
//   Start Date: 2024-10-01
//   End Date: 2024-10-15
