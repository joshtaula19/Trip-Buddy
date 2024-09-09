import { useState } from 'react'

interface LocationGridProps {
  data: {
    id: number
    name: string
    imageUrl: string
    price: {
      amount: number
      currencyCode: string
    } | null
    userRating: number
    itineraryID?: number
  }[]
}

const LocationGrid: React.FC<LocationGridProps> = ({ data }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [selectedID, setSelectedID] = useState<number | null>(null)

  const listOfItineraries = { Bali: 2, Sydney: 1, Brisbane: 3 }

  const handleClick = (id: number, itineraryID?: number) => {
    if (id && itineraryID) {
      // TODO: delete id from itineraryID
      console.log('delete this trip id from this itinerary', id, itineraryID)
    } else {
      setShowMenu(!showMenu)
    } // Show the menu when the button is clicked
  }

  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
    id: number,
  ) => {
    const selectedValue = event.target.value
    setSelectedID(Number(selectedValue))
    setShowMenu(false) // Hide the menu after selection

    // TODO: hook to add to itinerary
    console.log('add this placeID to this itinerary', id, selectedValue)
  }

  return (
    <div className="location-grid">
      {data.length === 0 ? (
        <p>No activities available</p>
      ) : (
        data.map((place) => (
          <div key={place.id} className="location-card">
            <img
              src={place.imageUrl}
              alt={place.name}
              className="location-image"
            />
            <div className="location-overlay">
              <div className="location-info">
                <h3>{place.name}</h3>
                {!showMenu && (
                  <>
                    <p>
                      Price:{' '}
                      {place.price &&
                      place.price.amount &&
                      place.price.currencyCode
                        ? `${place.price.amount} ${place.price.currencyCode}`
                        : 'Price not available'}
                    </p>
                    <p>Rating: {place.userRating}</p>
                  </>
                )}

                <button
                  onClick={() => handleClick(place.id, place.itineraryID)}
                >
                  {place.itineraryID ? '❌' : '✅'}
                </button>
                {showMenu && (
                  <div className="popup-menu">
                    <p>Add to trip:</p>
                    <select
                      id="itinerarySelect"
                      onChange={(e) => handleSelect(e, place.id)}
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
