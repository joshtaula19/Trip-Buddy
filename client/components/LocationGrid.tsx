import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import useTrips from '../hooks/useTrip'

const LocationGrid = ({ data }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [selectedID, setSelectedID] = useState(null)
  console.log('trip data in Grid:', data)
  // TODO handle this with a hook to load itineraries
  
  const { user } = useAuth0()

  const auth0Id = user?.sub
  const { data: trips } = useTrips(auth0Id || '')
  console.log('list of trips in grid:', trips)
  const listOfTrips = [1, 2, 3] //Object.keys(trips[0])

  const handleClick = (id, trip_id) => {
    if (id && trip_id) {
      //TODO: delete id from itineraryID
      console.log('delete this trip id from this itineray', id, trip_id)
    } else {
      setShowMenu(!showMenu)
    } // Show the menu when the button is clicked
  }

  const handleSelect = (event, id) => {
    const selectedValue = event.target.value
    setSelectedID(selectedValue)
    setShowMenu(false) // Hide the menu after selection

    //TODO: hook to add to itinerary
    console.log('add this placeID to this itineray', id, selectedValue)
  }
  return (
    <div className="location-grid">
      {data?.map((place) => (
        <div key={place.id} className="location-card">
          <img
            src={place.imageUrl}
            alt={place.name}
            className="location-image"
          />
          <div className="location-overlay">
            <div className="location-info">
              <h3>{place.name}</h3>
              <p>{place.userRating}</p>
              <button onClick={() => handleClick(place.id, place.trip_id)}>
                {place?.trip_id ? '❌' : '✅'}
              </button>
              {showMenu && (
                <div className="popup-menu">
                  <p>add to trip:</p>
                  <select
                    id="itinerarySelect"
                    onChange={(e) => handleSelect(e, place.id)}
                  >
                    {listOfTrips.map((trip, index) => (
                      <option key={index} value={trip}>
                        {trip}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LocationGrid
