import LocationGrid from './LocationGrid'
import { useState } from 'react'
import useTrips from '../hooks/useTrip'
import { useAuth0 } from '@auth0/auth0-react'
import LoadingIndicator from './LoadingIndicator'


export default function Itineraries() {
  //Placeholder Data
  const { user, isAuthenticated ,isLoading:auth0Loading} = useAuth0()

  const auth0Id = user?.sub
  
  const { data, add ,isLoading:dataLoading} = useTrips(auth0Id || '') //if auth0Id is undefined, pass '' to api
  
 
  const [input, setInput] = useState(false)
  const [trip_name, setTrip_name] = useState('')

  function handleAddInput() {
    setInput(!input)
    // console.log(input)
  }

  function handleChangeTripName(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setTrip_name(event.target.value)
    // console.log(tripName)
  }

  const handleAddTrip = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      add.mutate({ trip_name: trip_name, auth0Id: auth0Id })
    } catch (error) {
      console.error('Error adding trip:', error)
    }

    setTrip_name('')
    setInput(false)
  }
  if(dataLoading || auth0Loading){<LoadingIndicator/>}
  if (isAuthenticated && data) {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h2>Trips:</h2>
          <button onClick={handleAddInput}>➕</button>

          {input && (
            <form>
              <input
                type="text"
                placeholder="Trip name..."
                value={trip_name}
                onChange={handleChangeTripName}
              />
              <button onClick={handleAddTrip}>Add</button>
            </form>
          )}
        </div>
        {data.trips && data.trips.length > 0 ? (
          Object.keys(data.trips[0]).map((attraction) => (
            <div key={attraction}>
              <h3>{attraction}</h3>
              <LocationGrid data={data.trips[0][attraction]} />
            </div>
          ))
        ) : (
          <p>No trips found. Add a new trip to get started!</p>
        )}
      </>
    )
  }
}
