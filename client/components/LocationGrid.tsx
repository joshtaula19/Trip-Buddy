import { useState, useEffect } from 'react'

interface LocationGridProps {
  data: {
    id: number
    name: string
    imageUrl: string
    price: string
    userRating: number
  }[]
}

const LocationGrid: React.FC<LocationGridProps> = ({ data }) => {
  console.log('LocationGrid data:', data)
  const [showMenu, setShowMenu] = useState(false)
  const [selectedID, setSelectedID] = useState<number | null>(null)

  const listOfItineraries: Record<string, number> = {
    Bali: 2,
    Sydney: 1,
    Brisbane: 3,
  }

  const handleClick = (id: number, itineraryID?: number) => {
    if (id && itineraryID) {
      console.log('delete this trip id from this itinerary', id, itineraryID)
    } else {
      setShowMenu(!showMenu)
    }
  }

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
    id: number,
  ) => {
    const selectedValue = event.target.value
    setSelectedID(Number(selectedValue))
    setShowMenu(false)
    console.log('add this placeID to this itinerary', id, selectedValue)
  }

  return (
    <div className="location-grid">
      {data.length === 0 ? (
        <p>No activities available</p>
      ) : (
        data.map((activity) => (
          <div key={activity.id} className="location-card">
            <img
              src={activity.imageUrl}
              alt={activity.name}
              className="location-image"
            />
            <div className="location-overlay">
              <div className="location-info">
                <h3>{activity.name}</h3>
                <p>Price: {activity.price}</p>
                <p>Rating: {activity.userRating}</p>
                <button onClick={() => handleClick(activity.id)}>
                  {showMenu ? '❌' : '✅'}
                </button>
                {showMenu && (
                  <div className="popup-menu">
                    <p>Add to trip:</p>
                    <select
                      id="itinerarySelect"
                      onChange={(e) => handleSelect(e, activity.id)}
                    >
                      {Object.keys(listOfItineraries).map((key) => (
                        <option key={key} value={listOfItineraries[key]}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default LocationGrid
