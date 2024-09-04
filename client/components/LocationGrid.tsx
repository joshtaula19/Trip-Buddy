import { useState } from 'react'

const LocationGrid = ({ data }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [selectedID, setSelectedID] = useState(null)

  // TODO handle this with a hook to load itineraries
  const listOfItineraries = { Bali: 2, Sydney: 1, Brisbane: 3 }

  const handleClick = (id, itineraryID) => {
    if (id && itineraryID) {
      //TODO: delete id from itineraryID
      console.log('delete this trip id from this itineray', id, itineraryID)
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
              <button onClick={() => handleClick(place.id, place.itineraryID)}>
                {place?.itineraryID ? '❌' : '✅'}
              </button>
              {showMenu && (
                <div className="popup-menu">
                  <p>add to trip:</p>
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
      ))}
    </div>
  )
}

export default LocationGrid