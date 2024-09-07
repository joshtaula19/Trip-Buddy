import { useState, useEffect } from 'react'
import request from 'superagent'

const LocationGrid = () => {
  const [data, setData] = useState<any[]>([])
  const [showMenu, setShowMenu] = useState(false)
  const [selectedID, setSelectedID] = useState<number | null>(null)

  // List of itineraries (hardcoded for now, can be fetched from API if needed)
  const listOfItineraries = { Bali: 2, Sydney: 1, Brisbane: 3 }

  useEffect(() => {
    // Fetch data from OpenTripMap API
    const fetchData = async () => {
      try {
        const res = await request.get('/api/v1/attractions')
        // Ensure response data matches expected format
        const formattedData = res.body.map((item: any) => ({
          id: item.xid,
          name: item.name,
          imageUrl: item.image || 'default-image-url.jpg', // Provide a default image URL if necessary
          userRating: item.rate || 'N/A', // Provide a default value if necessary
        }))
        setData(formattedData)
      } catch (error) {
        console.error('Error fetching attractions data:', error)
      }
    }

    fetchData()
  }, [])

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
      {data?.map((place) => (
        <div key={place.id} className="location-card">
          <img
            src={place.imageUrl} // Ensure the field name matches your API response
            alt={place.name}
            className="location-image"
          />
          <div className="location-overlay">
            <div className="location-info">
              <h3>{place.name}</h3>
              <p>{place.userRating}</p>{' '}
              {/* Ensure this matches your API response */}
              <button onClick={() => handleClick(place.id, place.itineraryID)}>
                {place?.itineraryID ? '❌' : '✅'}
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
      ))}
    </div>
  )
}

export default LocationGrid
