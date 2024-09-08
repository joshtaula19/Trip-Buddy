import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import useTrips from '../hooks/useTrip'
import useAttractions from '../hooks/useAttractions'
import * as sort from '../utility/dataSortingFn'
interface LocationGridProps {
  data: {
    id: number
    name: string
    imageUrl: string
    price: string
    userRating: number
    itineraryID?: number // Optional property
  }[]
}

const LocationGrid: React.FC<LocationGridProps> = ({ data }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [selectedID, setSelectedID] = useState<number | null>(null)

  // TODO handle this with a hook to load itineraries
  const { del, add } = useAttractions()
  const { user } = useAuth0()

  const auth0Id = user?.sub
  const { data: trips } = useTrips(auth0Id || '')
  //console.log('list of trips in grid:', trips)

  const handleClick = (id: number, trip_id: number) => {
    if (trip_id) {
      //TODO: delete id from itineraryID
      del.mutate(id)
      //console.log('delete this trip id from this itineray', id)
    } else {
      setShowMenu(!showMenu)
      console.log('showMenu', showMenu)
    } // Show the menu when the button is clicked
  }

  const handleSelect = (event:React.ChangeEvent<HTMLSelectElement>, attraction) => {
    const selectedValue = event.target.value
    // setSelectedID(selectedValue)
    console.log('select value', selectedValue)
    setShowMenu(false) // Hide the menu after selection

    //TODO: hook to add to itinerary
    add.mutate({ trip_id: Number(selectedValue), attraction })
    
  }

  return (
    <div className="location-grid">
      {data?.map((attraction) => (
        <div key={attraction.id} className="location-card">
          <img
            src={attraction.imageUrl}
            alt={attraction.name}
            className="location-image"
          />
          <div className="location-overlay">
            <div className="location-info">
              <h3>{attraction.name}</h3>
              <p>{attraction.userRating}</p>
              <button
                onClick={() => handleClick(attraction.id, attraction.trip_id)}
              >
                {attraction?.trip_id ? '❌' : '✅'}
              </button>
              {showMenu && (
                <div className="popup-menu">
                  <p>add to trip:</p>
                  <select
                  value=""
                    id="itinerarySelect"
                    onChange={(e) => handleSelect(e, attraction)}
                  >
                    <option value="" disabled>
                      Select a trip
                    </option>
                    {trips.listOfTrips.map((trip) => (
                      <option key={trip.trip_id} value={trip.trip_id}>
                        {trip.trip_name}
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
